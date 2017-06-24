<template>
  <div class="users-module">
    <h1>users</h1>
    <h2>{{description}}</h2>
    <div>{{main}}</div>
  </div>
</template>
<script>
  export default {
    name: 'users',
    data () {
      return {
        description: 'This is users module.',
        main: 'to be continued.'
      }
    }
  }
</script>
<style scoped>
  h1 {

  }
</style>
