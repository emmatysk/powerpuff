/* global sharedVueStuff, Vue, socket */
'use strict';

new Vue({
    el: '#ordering',
    mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
    data: {
        selectedTable: ''
    },
    created: function() {
        socket.on('tableCritical', function(tableNumber) {
            var table = this.tables[parseInt(tableNumber)-1];

            if (table.status == 'waiting') {
                table.status = 'critical';
            }
        }.bind(this));
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
        getTableStatus: function (number) {
            var table = this.tables[number - 1];
            var d = new Date();
            var diff = (d.getTime() - table.timer) / 1000;
            if (table.status == 'waiting' && diff > 10) {
                return 'critical'
            }
            else {
                return table.status;
            }

        }
    }
});