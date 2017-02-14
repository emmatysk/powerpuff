<template lang="html">
  <div>
    <h2>{{title}}</h2>

    <div id="overview">
      <ul>
        <li>
          Lediga bord: <strong>{{ availableTables }}</strong>
        </li>
        <li>
          Lediga platser: <strong>{{ availableSeats }}</strong>
        </li>
      </ul>
    </div>

    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Bord #</th>
          <th>Ledigt</th>
          <th>Platser</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <diner-table-simple :table="table" v-for="table in tables"></diner-table-simple>
      </tbody>
    </table>
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
