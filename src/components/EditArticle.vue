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
    <div>
      <h3 class="ar-title">正文</h3>
      <textarea v-model='article.text' name="" class="ar-text" cols="30" rows="10" placeholder="正文"></textarea>
    </div>
    <button @click='createNewArticle' class='create-btn'>创建</button>
  </section>
</template>

<script>
export default {
  name: 'editArticle',
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
  created () {
    document.title = '编辑'
  },
  methods: {
    createNewArticle () {
      this.$http.post('/api/articles', {data: JSON.stringify(this.article)})
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
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
</style>
