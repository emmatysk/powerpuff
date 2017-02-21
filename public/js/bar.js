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
    el: '#vue',
    mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
    created: function() {
        socket.on('orderAdded', function() {
            window.location = '/';
        });
    },
    data: {
        group: 'foods',
        categories: {
            food: [
                { name: 'burger', title: 'Hamburgare' },
                { name: 'pasta',   title: 'Pasta' },
                { name: 'sallad',  title: 'Sallad' },
            ],
            drinks: [
                { name: 'beer', title: 'Öl' },
                { name: 'wine',   title: 'Vin' },
                { name: 'coffee',  title: 'Kaffe' },
            ]
        },
        orderlist: [],
        hej: []
    },
    methods: {
        mat: function() {
            this.group = 'foods'
        },
        dryck: function() {
            this.group = 'drinks'
        },
        add: function(item) {
            var newItem = Vue.util.extend({}, item)
            this.orderlist.push(JSON.parse( JSON.stringify(item)));
        },
        remove: function(item) {
            var index = this.orderlist.indexOf(item)
            this.orderlist.splice(index, 1)
        },
        betala: function() {
            this.orderlist = []
        },
        change: function(e) {
            this.hej = e.ingredienser
        },
        removeingrident: function(item) {
            var index = this.hej.indexOf(item)
            this.hej.splice(index, 1)
        },
        placeOrder: function() {
            var tableNumber = parseInt(window.location.pathname.split('/')[2]);

            var items = [];
            for (var i = 0; i < this.orderlist.length; i++) {
                items.push(this.orderlist[i].title);
            }

            var order = {
                tableNumber: tableNumber,
                items: items
            };

            socket.emit('order', {orderId: getOrderNumber(), order: order});
        }
    },
    computed: {
        totalprice: function() {
            var tot = 0;
            for(var i = 0; i < this.orderlist.length; i++) {
                tot += this.orderlist[i].pris;
            }
            return tot;
        },
        items: function() {
            return this.menu[this.group];
        },
        showFood: function() {
            return this.group == 'foods';
        },
        showDrinks: function() {
            return this.group == 'drinks';
        }
    }
})
