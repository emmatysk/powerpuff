import re
import sys

from lxml import etree

RE_TABLE = re.compile(r'bord(\d+)')


def clean(filename):
    with open(filename, 'r') as f:
        root = etree.XML(f.read())

    ns = dict(ns=root.nsmap[None])

    style = root.xpath('.//ns:style', namespaces=ns)[0]
    css = style.text
    root.remove(style)

    for g in root.xpath('.//ns:g', namespaces=ns):
        if 'id' not in g.attrib:
            continue

        m = RE_TABLE.match(g.attrib['id'])
        if m:
            id = m.group(1)
            g.attrib['id'] = 'table-%s' % id
            g.attrib['vue-click'] = "selectTable('%s')" % id
            #g.attrib['vue-status'] = "[tables[%s].status]" % str(int(id) - 1)

            p = g.xpath('.//ns:path', namespaces=ns)
            if p:
                path = p[0]
                if 'onload' in path.attrib:
                    del path.attrib['onload']
                if 'onclick' in path.attrib:
                    del path.attrib['onclick']

                path.attrib['class'] = 'table'
                path.attrib['vue-class'] = "{selected: selectedTable == '%s'}" % id

            text = g.xpath('.//ns:text', namespaces=ns)
            if text:
                text[0].text = id

    xmlstr = etree.tostring(root, pretty_print=True).replace('\t', '  ').replace('vue-click', '@click').replace('vue-class', ':class')

    with open('asdf.html', 'w+') as f:
        f.write(xmlstr)
    with open('asdf.css', 'w+') as f:
        f.write(css.replace('\t', '').strip().replace('.st10', '.table').replace('.st13', '.selected'))


if __name__ == '__main__':
    filename = sys.argv[1]

    clean(filename)

