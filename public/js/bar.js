function isBarPage() {
    return window.location.pathname.split('/')[2] == 'bar';
}

new Vue({
    el: '#vue',
    mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
    created: function() {
        socket.on('orderAdded', function() {
            window.location = '/';
        });

        if (isBarPage()) {
            this.group = 'drinks';
        }
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
        selectCategory: function(category) {
            this.group = category;
        },
        add: function(item) {
            var newItem = Vue.util.extend({}, item)
            this.orderlist.push(JSON.parse( JSON.stringify(item)));
        },
        remove: function(item) {
            var index = this.orderlist.indexOf(item)
            this.orderlist.splice(index, 1)
        },
        change: function(e) {
            this.hej = e.ingredienser
        },
        removeingrident: function(item) {
            var index = this.hej.indexOf(item)
            this.hej.splice(index, 1)
        },
        clear: function() {
            this.orderlist = [];
        },
        pay: function() {
            var tableNumber = parseInt(window.location.pathname.split('/')[2]);

            var items = [];
            for (var i = 0; i < this.orderlist.length; i++) {
                items.push(this.orderlist[i].title);
            }

            var order = {
                tableNumber: tableNumber,
                items: items
            };

            socket.emit('order', {order: order});
        }

    },
    computed: {
        totalprice: function() {
            var tot = 0;
            for(var i = 0; i < this.orderlist.length; i++) {
                tot += this.orderlist[i].price;
            }
            return tot;
        },
        showFood: function() {
            return this.group == 'foods';
        },
        showDrinks: function() {
            return this.group == 'drinks';
        },
        isBarOrder: function() {
            return isBarPage();
        }
    }
})
