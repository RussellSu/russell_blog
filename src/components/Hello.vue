<template>
  <section class="hello-module module">
    <img src="./../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>users</h2>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>emai</th>
          <th>prid</th>
          <th>更新时间</th>
        </tr>
      </thead>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Russell\'s blog'
    }
  },
  created () {
    document.title = this.$route.name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
