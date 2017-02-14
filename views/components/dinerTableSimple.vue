<template lang="html">
  <tr v-bind:class="table.status">
    <td>{{ table.id }}</td>
    <td>{{ table.available }}</td>
    <td>{{ table.capacity }}</td>
    <td v-if="table.status == 'success'">Upptaget</td>
    <td v-else-if="table.status == 'warning'">Väntar på mat</td>
    <td v-else-if="table.status == 'danger'">PROBLEM!!!!</td>
    <td v-else>Ledigt</td>
  </tr>
</template>

<script>
export default {
  props: [ 'table' ]
}
</script>

<style lang="css">
</style>
