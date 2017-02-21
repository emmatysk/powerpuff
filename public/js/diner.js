/* global sharedVueStuff, Vue, socket */
'use strict';

new Vue({
    el: '#ordering',
    mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen

    data: {
        selectedTable: ''
    },

    created: function() {
        socket.on('tableCritical', function(tableNumber){
            this.updateTime(tableNumber);
            console.log('abs');
        })
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
        updateTime: function(tablenumber){
            console.log('s');
            this.tables[0].status="critical";
        },
        cancelTable: function () {
            socket.emit('cancelTable', this.selectedTable);
        },
        getTableStatus: function (number) {
            console.log('hej');
            var table = this.tables[number - 1];
            var d = new Date();
            var diff = (d.getTime() - table.timer) / 1000;
            if (table.status == 'waiting' && diff > 15) {
                return 'critical'
            }
            else {
                return table.status;
            }

        }
    }
});