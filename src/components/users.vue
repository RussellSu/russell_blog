<template>
  <div class="users-module module">
    <h1>users</h1>
    <h2>{{description}}</h2>
    <div class="modoule-body">
    <div class="">
    <input v-model='fullname' type="text" class="" placeholder="姓名">
    </div>
      <button v-on:click="createUser" type="button">create user</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'users',
    data () {
      return {
        description: 'This is users module.',
        main: 'to be continued.',
        fullname: ''
      }
    },
    methods: {
      getList () {
        this.$http.get('api/users').then(res => console.log(res.data)).catch(err => console.log(err.response))
      },
      createUser () {
        let _this = this
        const fullname = _this.fullname
        this.$http.post('api/users', {fullname: fullname}).then(res => console.log(res.data)).catch(err => console.log(err.response))
      }
    }
  }
</script>
<style scoped>
  h1 {

  }
</style>
