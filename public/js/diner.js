/* global sharedVueStuff, Vue, socket */
'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getOrderNumber() {
  // It's probably not a good idea to generate a random order number, client-side. 
  // A better idea would be to let the server decide.
  return "#" + getRandomInt(1, 1000000);
}

new Vue({
  el: '#ordering',
  mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
  data: {
    selectedTable: ''
  },
  methods: {
    selectTable:function(number) {
      if (number==this.selectedTable){
          this.selectedTable = '';
      }
      else {
          this.selectedTable = number;
      }
    },
    cancelTable: function() {
      socket.emit('cancelTable', this.selectedTable);
    }
  }
});