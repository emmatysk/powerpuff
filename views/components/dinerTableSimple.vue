<template lang="html">
  <li>
    {{ table.id }}. {{ table.available }}/{{ table.capacity }} ({{ table.status }})
  </li>
</template>

<script>
export default {
  props: [ 'table' ]
}
</script>

<style lang="css">
</style>
