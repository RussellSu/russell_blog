<template>
  <section class="articles-detail-module module">
    <h1>{{article.title}}</h1>
    <h4></h4>
    <h4>更新时间{{article.updateTime}}</h4>
    <div v-html="compileMD"></div>

  </section>
</template>
<script>
import Marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'articleItem',
  components: { Marked, highlightjs },
  data () {
    return {
      description: 'This is articles item.',
      main: 'to be continued.',
      article: {}
    }
  },
  computed: {
    compileMD: function () {
      return Marked(this.article.text, { sanitize: true })
    }
  },
  created () {
    document.title = this.$route.name
    this.getData()
  },
  mounted () {
    this.markdown()
  },
  methods: {
    getData () {
      this.$http.get('/api/articles/' + this.$route.params.id)
      .then(res => {
        this.article = res.data.article
      })
      .catch(err => console.log(err))
    },
    markdown () {
      Marked.setOptions({
        renderer: new Marked.Renderer(),
        hightlight: function (code) {
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
<style lang="sass" scoped>

</style>
