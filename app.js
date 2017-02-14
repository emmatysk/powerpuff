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
  return {uiLabels: ui, menu: menu};
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

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from vue/ directory
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));

// Serve diner.html as root page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/diner.html'));
});

app.get('/order', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/order.html'));
});

app.get('/overview', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/overview.html'));
});

io.on('connection', function(socket) {
  // Send list of orders and text labels when a client connects
  io.emit('initialize', { orders: orders.getAll(), 
                          labelsAndMenu: getLabelsAndMenu() });

  // When someone orders something
  socket.on('order', function(dish) {
    orders.addOrder(dish);
    io.emit('currentQueue', orders.getAll());
  });

  socket.on('orderDone', function(orderId) {
    orders.markDone(orderId);
    io.emit('currentQueue', orders.getAll());
  });
});

http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});