<template>
  <div class="articles-module module">
    <h1>articles</h1>
    <h2>{{description}}</h2>
    <div>{{main}}</div>
  </div>
</template>
<script>
  export default {
    name: 'articles',
    data () {
      return {
        description: 'This is articles module.',
        main: 'to be continued.'
      }
    }
  }
</script>
<style scoped>
  h1 {

  }
</style>
