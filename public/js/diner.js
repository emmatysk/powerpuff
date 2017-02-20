/* global sharedVueStuff, Vue, socket */
'use strict';

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