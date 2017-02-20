/* jslint node: true */
'use strict';

// Require express, socket.io, and vue
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Pick arbitrary port
var port = 3000;
app.set('port', (process.env.PORT || port));

// Language should be user specific but default is set here
var lang = "sv";

// get the JSON objects for the dictated language. Wonder if functions take arguments? ;-)
var getLabelsAndMenu = function() {
  var ui = require("./data/"+ lang +"/ui.json");
  var menu = require("./data/"+ lang +"/menu.json");
  var tables = require("./data/tables.json");
  return {uiLabels: ui, menu: menu, tables: tables};
};

// Store orders in a an anonymous class for now. 
var orders = function() {
  var orders = {};

  var addOrder = function(dish) {
    orders[dish.orderId] ={};
    orders[dish.orderId].orderItems = dish.orderItems;
    orders[dish.orderId].done = false;
  };

  var getAll = function() {
    return orders;
  };

  var markDone = function(orderId) {
    orders[orderId].done = true;
  };

  //expose functions
  return {
    addOrder : addOrder,
    getAll : getAll,
    markDone : markDone
  };
}(); // instantiate the class immediately

var tables = function() {
    var tables = getLabelsAndMenu().tables;

    var getAll = function() {
        return tables;
    };

    var setStatus = function(id, status) {
        tables[id-1].status = status;
    };

    var startTimer = function(id) {
    };

    var stopTimer = function(id) {
    };

    //expose functions
    return {
        getAll : getAll,
        setStatus: setStatus,
        startTimer: startTimer,
        stopTimer: stopTimer
    };
}(); // instantiate the class immediately

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from vue/ directory
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));
app.use('/dist', express.static(path.join(__dirname, '/node_modules/')));

// Serve diner.html as root page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/diner.html'));
});

app.get('/kitchen', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/kitchen.html'));
});

app.get('/order/:tablenumber', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/bar.html'));
});

app.get('/overview', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/overview.html'));
});

io.on('connection', function(socket) {
  // Send list of orders and text labels when a client connects
  io.emit('initialize', {
      orders: orders.getAll(),
      tables: tables.getAll(),
      labelsAndMenu: getLabelsAndMenu()
  });

  // When someone orders something
  socket.on('order', function(dish) {
    orders.addOrder(dish);
    io.emit('currentQueue', orders.getAll());
  });

  socket.on('orderDone', function(orderId) {
    orders.markDone(orderId);
    io.emit('currentQueue', orders.getAll());
  });

  socket.on('cancelTable', function(tableId) {
      tables.setStatus(tableId, 'available');
      io.emit('currentTables', tables.getAll());
  });
});

http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
