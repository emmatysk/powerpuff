<template lang="html">
  <div>
    <h2>{{title}}</h2>

    <div id="overview">
      Lediga bord: <strong>{{ availableTables }}</strong>
      <br>
      Lediga platser: <strong>{{ availableSeats }}</strong>
    </div>

    <h3>Bordslista</h3>
    <ul>
      <diner-table-simple :table="table" v-for="table in tables"></diner-table-simple>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  computed: {
    availableTables: function () {
        var count = 0;

        this.tables.forEach(function(table) {
            if (table.status == 'available') {
                count += 1;
            }
        });

        return count;
    },
    availableSeats: function () {
        var count = 0;

        this.tables.forEach(function(table) {
            if (table.status == 'available') {
                count += table.capacity;
            }
        });

        return count;
    }
  }
}
</script>

<style lang="css">
</style>
