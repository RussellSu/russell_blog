<template>
  <section class="articles-module module">
    <h1>articles</h1>
    <h2>{{description}}</h2>
    <div>{{main}}</div>
    <div>
      <table>
        <thead>
          <tr>
            <th>标题</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='article of articles'>
            <td>
              <router-link :to="'/articles/' + article._id">
              <!-- <router-link :to="{ name: 'articles', params: {id: article._id} }"> -->
              {{article.title}}
              </router-link>
              </td>
            <td>{{article.createTime}}</td>
            <td>{{article.updateTime}}</td>
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
      main: 'to be continued.',
      articles: []
    }
  },
  created () {
    document.title = this.$route.name
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/api/articles')
      .then(res => {
        this.articles = res.data.articles
      })
      .catch(err => console.log(err))
    },
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
