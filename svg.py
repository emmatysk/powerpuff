#!/usr/bin/env python
import argparse
import re

try:
    from lxml import etree
except ImportError:
    import sys
    sys.exit('LXML is needed to run this script. Install with command: pip install lxml')

RE_TABLE = re.compile(r'bord(\d+)')

RE_CSS_AREA = re.compile((r'(/\*\* DO NOT EDIT BELOW THIS COMMENT \*/)'
                          r'.*'), re.DOTALL)

RE_HTML_AREA = re.compile((r'(<!-- START: DO NOT EDIT SVG -->)'
                           r'.*'
                           '(<!-- END: DO NOT EDIT SVG -->)'), re.DOTALL)


def clean_css(root, ns):
    style = root.xpath('.//ns:style', namespaces=ns)[0]
    css = style.text
    root.remove(style)

    return root, css.strip() \
        .replace('\t', '')\
        .replace('.st10', '.table') \
        .replace('.st13', '.selected').strip()


def clean_svg(root, ns):
    for g in root.xpath('.//ns:g', namespaces=ns):
        try:
            if g.attrib['id'] == 'Lager_1':
                g.attrib['vue-click'] = "selectedTable = ''"
                continue
            m = RE_TABLE.match(g.attrib['id'])
        except KeyError:
            continue

        if m:
            id = int(m.group(1))
            g.attrib['id'] = 'table-%d' % id
            g.attrib['vue-click'] = "selectTable('%d')" % id
            g.attrib['vue-class'] = "getTableStatus(%d)" % id

            p = g.xpath('.//ns:path', namespaces=ns)
            if p:
                path = p[0]
                if 'onload' in path.attrib:
                    del path.attrib['onload']
                if 'onclick' in path.attrib:
                    del path.attrib['onclick']

                path.attrib['class'] = 'table'
                path.attrib['vue-class'] = "{selected: selectedTable == '%d'}" % id

            text = g.xpath('.//ns:text', namespaces=ns)
            if text:
                text[0].text = str(id)

    return etree.tostring(root) \
        .replace('\t', '  ') \
        .replace('vue-click', '@click') \
        .replace('vue-class', ':class').strip()


def clean(filename):
    with open(filename, 'r') as f:
        root = etree.XML(f.read())
        ns = dict(ns=root.nsmap[None])

    root, css = clean_css(root, ns)

    return clean_svg(root, ns), css


def update(filename_html, filename_css, svg, css):
    with open(filename_html, 'r+') as h:
        with open(filename_css, 'r+') as c:
            html_data = h.read()
            css_data = c.read()
            h.seek(0)
            c.seek(0)
            html_data = RE_HTML_AREA.sub(r'\1\n%s\n\2' % svg, html_data)
            css_data = RE_CSS_AREA.sub(r'\1\n%s' % css, css_data)
            h.write(html_data)
            c.write(css_data)
            h.truncate()
            c.truncate()

            print('Successfully updated SVG and CSS in: %s and %s' % (filename_html, filename_css))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('filename', metavar='filename.svg')
    parser.add_argument('--html',
            default='views/diner.html',
            help='path to diner.html (default: views/diner.html)')
    parser.add_argument('--css',
            default='public/css/svg.css',
            help='path to svg.css (default: public/css/svg.css')
    args = parser.parse_args()

    xml, css = clean(args.filename)

    update(args.html, args.css, xml, css)

