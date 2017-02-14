<template lang="html">
  <li class="diner-table" v-bind:class="table.status">
    <div class="id">Bord #{{ table.id }}</div>
    <div class="seats">
      Ledigt:
      <span class="available">{{ table.available }}</span>
      /
      <span class="capacity">{{ table.capacity }}</span>
    </div>

    <div class="status">
      Status:
      <strong v-bind:class="'text-' + table.status" v-if="table.status == 'success'">Upptaget</strong>
      <strong v-bind:class="'text-' + table.status" v-else-if="table.status == 'warning'">Väntar på mat</strong>
      <strong v-bind:class="'text-' + table.status" v-else-if="table.status == 'danger'">PROBLEM!!!!</strong>
      <strong v-bind:class="'text-' + table.status" v-else>Ledigt</strong>
    </div>
  </li>
</template>

<script>
export default {
  props: [ 'table' ]
}
</script>

<style lang="css">
</style>
