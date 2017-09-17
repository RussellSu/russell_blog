<template>
  <div class="users-module module">
    <h1>users</h1>
    <h2>{{description}}</h2>
    <div class="module-body">
      <div class="">
        <input v-model='fullname' type="text" class="" placeholder="姓名">
        <input v-model='email' type="text" class="" placeholder="email">
        <input v-model='phone' type="text" class="" placeholder="电话">
      </div>
      <button v-on:click="createUser" type="button">create user</button>
      <table>
        <tr>
          <td>姓名</td>
          <td>email</td>
          <td>性别</td>
          <td>电话</td>
          <td>创建时间</td>
        </tr>
        <tbody>
          <tr v-for="user of userList">
            <td>{{user.fullname}}</td>
            <td>{{user.email}}</td>
            <td>{{user.gender}}</td>
            <td>{{useSr.phone}}</td>
            <td>{{user.createTime}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'users',
  created () {
    this.getList()
  },
  data () {
    return {
      description: 'This is users module.',
      main: 'to be continued.',
      fullname: '',
      userList: []
    }
  },
  methods: {
    getList () {
      this.$http.get('/api/users')
        .then(res => {
          this.userList = res.data.users
          console.log(res)
        })
        .catch(err => console.log(err.response))
    },
    createUser () {
      let _this = this
      const fullname = _this.fullname
      const email = _this.email
      const phone = _this.phone
      this.$http.post('/api/users', { 'fullname': fullname, 'email': email, 'phone': phone }).then(res => console.log(res.data)).catch(err => console.log(err.response))
    }
  }
}
</script>
<style scoped>
h1 {
  font-size: 4rem
}
</style>
