// npm install express

var path = require('path')
var express = require('express')
var expressVue = require('express-vue')
var app = express();

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

var users = [];
users.push({ name: 'tobi', age: 12 });
users.push({ name: 'loki', age: 14  });
users.push({ name: 'jane', age: 16  });

app.get('/', function(req, res){
  res.render('index', {
    data: {
        title: 'Express Vue',
        message: 'Hello!',
        users: users
    },
    vue: {
        components: ['users', 'message']
    }
  });
});

app.get('/book', function(req, res){
  res.render('book', {
    data: {
        title: 'Bordsbokning',
        message: 'Hello!'
    },
    vue: {
        components: ['message']
    }
  });
});

app.get('/order', function(req, res){
  res.render('order', {
    data: {
      title: 'Ordersida'
    }

  });
});

app.get('/overview', function(req, res){
  res.render('overview', {
    data: {
      title: 'Overview'
    }

  });
});

app.listen(3000);
console.log('Express server listening on port 3000');
