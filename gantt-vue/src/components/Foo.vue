<template>
  <div>
    <h2>{{howdy}}</h2>
    <div>{{doody}}</div>
    <div>{{lollipop}}</div>
  </div>
  
</template>

<script>
export default {
  name: 'Foo',
  props: {
    howdy: {
      type: String
    },
    doody: {
      type: String
    },
  },
  computed: {
      lollipop() {
      return this.$store.state.count
    }
  }
}
</script>

<style scoped>

</style>