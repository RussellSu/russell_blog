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
    <div class="edit-body row clearfix">
      <div class="pull-left m-6">
        <h3 class="ar-title">正文</h3>
        <textarea v-model='article.text' name="" class="ar-text" cols="30" rows="10" placeholder="正文" style="width:100%"></textarea>
      </div>
      <div class="pull-right m-6">
        <h3>预览</h3>
        <div v-html="compileMD" class="code-preview" style="width:100%"></div>
      </div>
    </div>

    <button @click='createNewArticle' class='create-btn'>创建</button>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
        author: window.Russell.user ? window.Russell.user.fullname : '',
        text: ''
      }
    }
  },
  computed: {
    compileMD: function () {
      return Marked(this.article.text, { sanitize: true })
    },
    ...mapState({
      fullname: state => state.userProfile.fullname,
      nickname: state => state.userProfile.nickname,
      gender: state => state.userProfile.gender,
      thumbnail: state => state.userProfile.thumbnail,
    }),
    ...mapGetters([
      'isLogin'
    ])
  },
  created () {
    document.title = '编辑'
  },
  mounted () {
    this.markdown()
  },
  methods: {
    createNewArticle () {
      var _this = this
      this.$api.createNewArticle({ data: this.article }).then(
        res => {
          console.log(res.data)
          _this.$router.replace('articles')
        },
        err => {
          if (err.response.data.missingTitle) {
            alert('请填写题目')
          }
          else if (err.response.data.missingText) {
            alert('请填写正文')
          }
          else {
            alert(JSON.stringify(err.response.data))
          }
          console.log(err.response)
        }
      )
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
  padding: 0.5rem;
  min-height: 3rem;
  box-sizing: border-box;
  background-color: #000;
}
</style>
