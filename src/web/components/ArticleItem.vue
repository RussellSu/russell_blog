<template>
  <section class="articles-detail-module module">
    <h1>{{article.title}}</h1>
    <div class="clearfix">
      <div class="float-left">创建时间:{{article.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      <div class="float-right">更新时间:{{article.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
    </div>
    <div class="mark-body" v-html="compileMD"></div>

  </section>
</template>
<script>
import Marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'articleItem',
  components: { Marked, highlightjs },
  data() {
    console.log('data')
    return {
      article: {
        title: '',
        text: '',
        createTime: '',
        updateTime: ''
      }
    }
  },
  computed: {
    compileMD: function() {
      return Marked(this.article.text, { sanitize: true })
    }
  },
  created() {
    console.log('created')
    this.getData()
    document.title = this.article.title
  },
  mounted() {
    console.log('mounted')
    this.markdown()
  },
  methods: {
    getData() {
      this.$http
        .get('/api/articles/' + this.$route.params.id)
        .then(res => {
          this.article = res.data.article
        })
        .catch(err => console.log(err))
    },
    markdown() {
      Marked.setOptions({
        renderer: new Marked.Renderer(),
        hightlight: function(code) {
          return highlightjs.highlightAuto(code).value
        },
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mark-body {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
