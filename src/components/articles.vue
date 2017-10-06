<template>
  <section class="articles-module module">
    <h1>articles</h1>
    <h2>{{description}}</h2>
    <div>{{main}}</div>
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <button class="edit-new button btn-circle" @click="editNew">+</button> -->
    <router-link to="/editArticle" tag="button" exact class="edit-new button btn-circle">+</router-link>

  </section>
</template>
<script>
export default {
  name: 'articles',
  data () {
    return {
      description: 'This is articles module.',
      main: 'to be continued.'
    }
  },
  created () {
    document.title = this.$route.name
  },
  methods: {
    editNew () {
      alert('editNew!')
    }
  }
}
</script>
<style scoped>
.edit-new {
  position: absolute;
  bottom: 100px;
  right: 40px;
  width: 50px;
  height: 50px;
}
</style>
