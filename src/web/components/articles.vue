<template>
<section class="articles-module module">
    <h1 class="module-title">articles</h1>
    <div class="article-list">
      <div class="article" v-for="article of articles">
        <router-link :to="'/articles/' + article._id" class="article-title"> {{article.title}}</router-link>
        <div class="float-left"><b>创建时间：</b>{{article.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
        <div class="float-right"><b>最后更新：</b>{{article.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      </div>
    </div>
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
<style lang="scss" scoped>
.article-list {
  max-height: calc(100vh - 6rem - 1rem);// 1rem 留空不贴底部
  overflow: auto;
}
.article {
  min-height: 50px;
  margin-bottom: 1rem;
  padding: 0 1rem 1rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.article-title {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #FFF;
  &:hover {
    background-color:  rgba(255, 255, 255, 0.2);
  }
}
.edit-new {
  position: absolute;
  bottom: 100px;
  right: 40px;
  width: 50px;
  height: 50px;
}
</style>
