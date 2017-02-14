<template lang="html">
  <li>
    {{ item.title }} ({{ item.type }})
  </li>
</template>

<script>
export default {
  props: [ 'item' ]
}
</script>

<style lang="css">
</style>
