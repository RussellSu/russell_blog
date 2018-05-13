<template>
  <section class="me-module module text-center">
    <img class="avatar" src="/static/img/suxiao-hahaha.jpg" />
    <h1>{{ mainTitle }}</h1>
    <h2>{{ subTitle }}</h2>
    <h3>{{ info }}</h3>
    <h3>{{ description }}</h3>
  </section>
</template>

<script>
export default {
  name: 'me',
  data() {
    return {
      // avatarUrl: avatarUrl,
      mainTitle: '关于我',
      subTitle: 'In the land of Javascript, no one is king.',
      info: 'email: suxiao666@outlook.com',
      description: '我是苏晓，是一名程序员。这是我的博客，是记录我工作学习生活的地方。',
    }
  },
  created() {
    document.title = this.$route.name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.module {
  text-align: center;
}
.avatar {
  display: inline-block;
  width: 200px;
  height: auto;
}
</style>
