<template>
  <section class="articles-detail-module module">
    <h1>{{article.title}}</h1>
    <div class="clearfix">
      <div class="float-left">创建时间:{{article.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      <div class="float-right">更新时间:{{article.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
    </div>
    <div class="mark-body" v-html="compileMD"></div>
    <div class="comments-wrapper clearfix">
      <p class="comment-header">评论</p>
      <dl v-if="article.comments.length">
        <dd class="comment clearfix" v-for="comment of article.comments" :key="comment._id">
          <div class="comment-left pull-left text-center">
            <div class="user-thumbnail" :style="{'background-image':`url(${comment.user.thumbnail})`}"></div>
            <i class="like-btn" @click="likeComment">like</i>
          </div>
          <div class="comment-right pull-right">
            <div class="comment-user">
              <span v-text="comment.user.fullname"></span>
               - 
              <span>{{comment.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</span>
            </div>
            <div class="comment-body">
              <span>{{comment.text}}</span>
            </div>
            <div class="comment-replies" v-if="comment.replies.length">
              <p class="reply" v-for="reply of comment.replies" :key="reply.text">
                <span>{{reply.user.fullname}}{{reply.user.email}}{{reply.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</span>
                <div>{{reply.text}}</div>
              </p>
            </div>
          </div>
        </dd>
      </dl>
      <strong class="text-center" v-else>无</strong>
    </div>
    <div class="comment-editor" v-show="showCommentEditor">
      发布评论
      <textarea name="" id="" cols="30" rows="10" v-model.trim="newComment"></textarea>
      <button class="submit-btn pull-right" @click="submitComment">发布评论</button>
    </div>
    <button class="write-commont-btn btn" @click="writeComment" v-show="!showCommentEditor">评论</button>
  </section>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import Marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'articleItem',
  components: {
    Marked,
    highlightjs,
  },
  data() {
    console.log('data')
    return {
      article: {
        _id: '',
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
    },
    ...mapState({

    }),
    ...mapGetters([
      'isLogin'
    ])
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
      let _this = this
      this.$store.commit('ACTIVE_LOADING')
      this.$api.getArticleDetail(this.$route.params.id).then(res => {
        _this.$store.commit('INACTIVE_LOADING')
        if (res.data.article) {
          _this.article = res.data.article
        }
      }, err => {
        _this.$store.commit('INACTIVE_LOADING')
        console.log(err)
      })
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
      let _this = this
      if (!this.newComment.length) {
        alert('你不打算说点啥吗')
        return
      }
      this.$api.submitComment({
        article: this.article._id,
        text: this.newComment
      }).then(res => {
        _this.newComment = ''
        _this.showCommentEditor = false
        _this.getData()
      }, err => {
        if (err.response && err.response.data && err.response.data.notLogin) {
          alert('请先登陆')
        }
        console.log(err.response)
      })
    },
    likeComment() {
      alert('to be continued')
    }
  }
}
</script>
<style lang="scss" scoped>
.mark-body {
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
}
.comments-wrapper {
  margin: 10px 0;
}
.comment-header {
  border-bottom: 1px dotted #898989;
  padding-bottom: 1rem;
  font-size: 1.6rem;
}
.comment {
  margin: 0 0 .5rem 0;
  border-bottom: 1px dotted #898989;
}
.comment-editor {
  textarea {
    width: 100%;
    color: #FFF;
  }
  // .submit-btn {

  // }
}
.comment-left {
  width: 4rem;
  .like-btn {
    display: block;
    margin-top: 1.2rem;
  }
}
.comment-right {
  width: calc(100% - 4rem);
  padding: .5rem;
  box-sizing: border-box;
  .comment-user {
    height: 3rem;
    font-size: 1.6rem;
  }
  .comment-body {
    padding: 1rem;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
  }
}
.user-thumbnail {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #c5c5c5;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
@media screen and (max-width: 960px) {
  .write-commont-btn {
    bottom: 70px !important;
  }
}
.write-commont-btn {
  position: fixed;
  right: 20px;
  bottom: 30px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 0;
  font-size: 12px;
}
</style>
