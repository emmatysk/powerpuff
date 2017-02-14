var path = require('path');
var express = require('express');
var expressVue = require('express-vue');
var app = express();

var getItems = function() {
  return require(path.join(__dirname, "json/items.json"));
};

var getTables = function() {
  return require(path.join(__dirname, "json/tables.json"));
};

app.engine('vue', expressVue);

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/build', express.static(path.join(__dirname, '/node_modules/')));

app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
  componentsDir: path.join(__dirname, '/views/components'),
  defaultLayout: 'layout'
});

const name = 'Burger Pub';

app.get('/', function(req, res) {
  res.render('index', {
    data: {
      title: 'Startsida'
    },
    vue: {
      meta: {
        title: 'Startsida - ' + name
      }
    }
  });
});

app.get('/reservation', function(req, res) {
  res.render('reservation', {
    data: {
      title: 'Bordsbokning',
      tables: getTables()
    },
    vue: {
      meta: {
        title: 'Bordsbokning - ' + name
      }
    }
  });
});

app.get('/order', function(req, res) {
  res.render('order', {
    data: {
      title: 'Ordersida',
      items: getItems()
    },
    vue: {
      meta: {
        title: 'Ordersida - ' + name
      },
      components: ['item']
    }
  });
});

app.get('/overview', function(req, res) {
  res.render('overview', {
    data: {
      title: 'Overview',
      tables: getTables()
    },
    vue: {
      meta: {
        title: 'Overview - ' + name
      },
      components: ['dinerTableSimple']
    }
  });
});

app.listen(3000);

console.log('Express server listening on port 3000');
