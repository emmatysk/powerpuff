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
    data: {
        foodlist: [
            {
                "title": "Alex Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["GlutenfrittBröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Jakob Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Senap", "ketchup", "lök", "Sallad", "Ost", "Hallomi"],
                "changed": []
            },
            {
                "title": "Nicklas Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Emma Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Erik Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Hamburgartallrik",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Kebabtallrik",
                "kCal": "650",
                "gluten": "Nej",
                "lactose": "Ja",
                "grupp": "Mat",
                "pris": 60,
                "ingredienser": ["Kebab", "Pommes", "Sallad", "Vitlökssås"]
            },
            {
                "title": "Pulled Pork",
                "kCal": "550",
                "gluten": "Ja",
                "lactose": "Ja",
                "grupp": "Mat",
                "pris": 75,
                "ingredienser": ["Fläsk", "Potatis", "BBQ-sås", "Sallad"]
            },
            {
                "title": "Fisk",
                "kCal": "1000",
                "gluten": "Ja",
                "lactose": "Ja",
                "grupp": "onstigt",
                "pris": 50,
                "ingredienser": ["Fisk", "Potatis", "Fisk-sås", "Sallad"]
            },
            {
                "title": "Veggie",
                "kCal": "1",
                "gluten": "Ja",
                "lactose": "Ja",
                "grupp": "Något konstigt",
                "pris": 150,
                "ingredienser": ["Sallad"]
            }],

        drinklist: [
            {
                "title": "Coca Cola",
                "grupp": "Läskeblask",
                "pris": 150,
                "ingredienser": ["SOCKER"]
            },
            {
                "title": "Coca Cola Zero",
                "grupp": "Läskeblask",
                "pris": 150,
                "ingredienser": ["SOCKERFRI"]
            },
            {
                "title": "Fanta Zero",
                "grupp": "Läskeblask",
                "pris": 110,
                "ingredienser": ["Sockerfri"]
            },
            {
                "title": "Fanta",
                "grupp": "Läskeblask",
                "pris": 110,
                "ingredienser": ["Socker"]
            },
            {
                "title": "Sprite",
                "grupp": "Läskeblask",
                "pris": 120,
                "ingredienser": ["Socker"]
            }],

        currentlist: [
            {
                "title": "Alex Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["GlutenfrittBröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Jakob Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Senap", "ketchup", "lök", "Sallad", "Ost", "Hallomi"],
                "changed": []
            },
            {
                "title": "Nicklas Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Emma Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Erik Special",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Hamburgartallrik",
                "kCal": "800",
                "gluten": "Ja",
                "lactose": "Nej",
                "grupp": "Mat",
                "pris": 65,
                "ingredienser": ["Bröd", "Gurka", "Bacon", "ketchup", "lök", "Sallad", "Ost", "Kyckling", "KÖTT", "Mer kött"],
                "changed": []
            },
            {
                "title": "Kebabtallrik",
                "kCal": "650",
                "gluten": "Nej",
                "lactose": "Ja",
                "grupp": "Mat",
                "pris": 60,
                "ingredienser": ["Kebab", "Pommes", "Sallad", "Vitlökssås"]
            },
            {
                "title": "Pulled Pork",
                "kCal": "550",
                "gluten": "Ja",
                "lactose": "Ja",
                "grupp": "Mat",
                "pris": 75,
                "ingredienser": ["Fläsk", "Potatis", "BBQ-sås", "Sallad"]
            },
            {
                "title": "Fisk",
                "kCal": "1000",
                "gluten": "Ja",
                "lactose": "Ja",
                "grupp": "onstigt",
                "pris": 50,
                "ingredienser": ["Fisk", "Potatis", "Fisk-sås", "Sallad"]
            },
            {
                "title": "Veggie",
                "kCal": "1",
                "gluten": "Ja",
                "lactose": "Ja",
                "grupp": "Något konstigt",
                "pris": 150,
                "ingredienser": ["Sallad"]
            }],

        orderlist: [],
        hej: [],
        visaMat: true,
        visaDryck: false
    },

    methods: {
        mat: function() {
            this.currentlist = this.foodlist
            this.visaDryck = false
            this.visaMat = true
        },
        dryck: function() {
            this.currentlist = this.drinklist
            this.visaDryck = true
            this.visaMat = false
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
        }
    }
})
