<template>
  <section class="articles-module module">
    <h1 class="module-title">articles</h1>
    <div class="article-list rs-scrollbar">
      <div class="article" v-for="article in articles" :key="article._id">
        <div class="article-top-bar">
          <p class="text-right">更新：{{article.updateTime | time_format('YYYY/MM/DD HH:mm')}}</p>
        </div>
        <router-link :to="'/articles/' + article._id" class="article-title"> {{article.title}}</router-link>
        <div class="clearfix article-info">
          <div class="float-left"></div>
        </div>
      </div>
    </div>
    <router-link to="/editArticle" tag="button" exact class="edit-new-btn button btn-circle">✎</router-link>
  </section>
</template>
<script>
export default {
  name: 'articles',
  data () {
    return {
      description: 'This is articles module.',
      main: 'to be continued.',
      articles: [],
    }
  },
  created () {
    document.title = this.$route.name
    this.getList()
  },
  methods: {
    getList () {
      let _this = this
      _this.$store.commit('ACTIVE_LOADING')
      _this.$api.getArticleList().then(
        res => {
          _this.$store.commit('INACTIVE_LOADING')
          _this.articles = res.data.articles
        },
        err => {
          _this.$store.commit('INACTIVE_LOADING')
          console.log(err)
        }
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.article-list {
  max-height: calc(100vh - 6rem - 1rem); // 1rem 留空不贴底部
  overflow: auto;
}
.article {
  min-height: 50px;
  margin-bottom: 1rem;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.article-top-bar {
  color: #7b7b7b;
  font-weight: bold;
}
.article-title {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  &:hover {
    // background-color: rgba(255, 255, 255, 0.2);
    text-decoration: underline;
  }
}
.edit-new-btn {
  position: absolute;
  bottom: 70px;
  right: 20px;
  width: 50px;
  height: 50px;
  font-size: 26px;
  line-height: 1;
}
</style>
