/* global sharedVueStuff, Vue, socket */
'use strict';

new Vue({
  el: '#orders',
  mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
  methods: {
    markDone: function(orderid) {
      this.orders[orderid].done = true;
      socket.emit("orderDone", orderid);
    }
  }
});