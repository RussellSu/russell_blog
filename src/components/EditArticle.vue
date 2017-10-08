<template>
  <section class="editArticle-module module">
    <h1>{{ mainTitle }}</h1>
    <div>
      <h3 class="ar-title">标题</h3>
      <input type="text" v-model="article.title">
    </div>
    <div>
      <h3 class="ar-title">作者</h3>
      <p v-text="article.author"></p>
    </div>
    <div style="" class="p-l">
      <h3 class="ar-title">正文</h3>
      <textarea v-model='article.text' name="" class="ar-text" cols="30" rows="10" placeholder="正文"></textarea>
    </div>
    <div class="p-r">
      <h3>预览</h3>
      <div v-html="compileMD" class="code-preview"></div>
    </div>
    <button @click='createNewArticle' class='create-btn'>创建</button>
  </section>
</template>

<script>
import Marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'editArticle',
  components: { Marked, highlightjs },
  data () {
    return {
      mainTitle: '编辑文章',
      article: {
        title: '',
        author: '',
        text: ''
      }
    }
  },
  computed: {
    compileMD: function () {
      return Marked(this.article.text, { sanitize: true })
    }
  },
  created () {
    document.title = '编辑'
  },
  mounted () {
    this.markdown()
  },
  methods: {
    createNewArticle () {
      this.$http.post('/api/articles', { data: JSON.stringify(this.article) })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
        })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ar-text {
  width: 80%;
}

.code-preview {
  background-color: #000;
}
</style>
