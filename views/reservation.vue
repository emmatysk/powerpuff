<template lang="html">
  <div>
    <h2>{{title}}</h2>

    <ul>
      <diner-table :table="table" v-for="table in tables"></diner-table>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  }
}
</script>

<style lang="css">
</style>
