/* global io */
/* exported sharedVueStuff */
'use strict';

var socket = io();

// Stuff that goes to both diner and kitchen
var sharedVueStuff = {
  data: {
    orders: {},
    menu: {},
    tables: {},
    uiLabels: {}
  },
  created: function() {
    socket.on('initialize', function(data) {
      this.orders = data.orders;
      this.uiLabels = data.labelsAndMenu.uiLabels;
      this.menu = data.labelsAndMenu.menu;
      this.tables = data.labelsAndMenu.tables;
    }.bind(this));

    socket.on('currentQueue', function(data) {
      this.orders = data;
    }.bind(this));
  },
  methods: {
    setStatus: function(table, status) {
      table.status = status
      socket.emit('setStatus', table.id, status);
    }
  }
};