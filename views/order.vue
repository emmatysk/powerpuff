<template lang="html">
  <div>
    <h2>{{title}}</h2>
    <p>Items:</p>

    <ul>
      <item :item="item" v-for="item in items"></item>
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
