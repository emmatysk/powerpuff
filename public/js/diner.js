/* global sharedVueStuff, Vue, socket */
'use strict';

new Vue({
    el: '#ordering',
    mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
    data: {
        selectedTable: ''
    },
    methods: {
        selectTable: function (number) {
            if (number == this.selectedTable) {
                this.selectedTable = '';
            }
            else {
                this.selectedTable = number;
            }
        },
        cancelTable: function () {
            socket.emit('cancelTable', this.selectedTable);
        },
        readableStatus: function(status) {
            switch (status) {
              case 'available':
                  return 'ledig';
              case 'waiting':
                  return 'väntar på beställning';
              case 'critical':
                return 'väntat länge!!!';
              case 'ok':
                return 'beställning klar';
              default:
                  return 'okänd';
            }
        }
    },
    computed: {
        getTable: function() {
            return this.tables[parseInt(this.selectedTable)-1];
        },
        timeAgo: function() {
            moment.locale('sv');
            return moment(this.getTable.timer).fromNow();
        },
        availableTables: function() {
            var count = 0;

            for (var i = 0; i < this.tables.length; i++)
                if (this.tables[i].status == 'available')
                    count++;

            return count;
        },
        availableSeats: function() {
            var count = 0;

            for (var i = 0; i < this.tables.length; i++) {
                if (this.tables[i].status == 'available') {
                    count += this.tables[i].capacity;
                }
            }

            return count;
        }
    }
});
