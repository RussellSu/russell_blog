<template>
  <section class="articles-detail-module module">
    <h1>{{article.title}}</h1>
    <div class="clearfix">
      <div class="float-left">创建时间:{{article.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      <div class="float-right">更新时间:{{article.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
    </div>
    <div class="mark-body" v-html="compileMD"></div>
    <div class="comments-wrapper">
      <h3>评论</h3>
      <div v-if="comments.length">
        <div class="comment" v-for="comment in comments">
          <div class="comment-user">
            <span v-text="comment.user.fullname"></span>
            <span v-text="comment.user.email"></span>
          </div>
          <div class="comment-body">
            <span>{{comment.text}}</span>
          </div>
          <div class="comment-replies">
            <p class="reply" v-for="reply in comment.replies">
              <span>{{reply.user.fullname}}{{reply.user.email}}{{reply.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</span>
              <div>{{reply.text}}</div>
            </p>
          </div>
        </div>
      </div>
      <strong class="text-center" v-else>无</strong>
    </div>
    <div class="comment-editor" v-show="showCommentEditor">
      添加评论
      <textarea name="" id="" cols="30" rows="10" v-model="newComment"></textarea>
      <button class="submit-btn pull-right" @click="submitComment">提交</button>
    </div>
    <button class="write-commont-btn btn" @click="writeComment" v-show="!showCommentEditor">评论</button>
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
        updateTime: '',
        comments: []
      },
      comments: [],
      showCommentEditor: false,
      newComment: ''
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
    },
    writeComment() {
      this.showCommentEditor = true
    },
    submitComment() {
      alert('to be continued')
    }
  }
}
</script>
<style lang="scss" scoped>
.mark-body {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
}
.comments-wrapper {
  margin: 10px 0;
}
.comment-editor {
  textarea {
    width: 100%;
    color: #FFF;
  }
  // .submit-btn {

  // }
}

@media screen and (max-width: 960px) {
  .write-commont-btn {
    bottom: 70px;
  }
}
.write-commont-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 0;
  font-size: 12px;
}
</style>
