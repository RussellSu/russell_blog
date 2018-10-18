<template>
  <section class="movies-detail-module module">
    <h1>{{movie.name}}</h1>
    <div class="clearfix">
      <div class="float-left">创建时间:{{movie.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      <div class="float-right">更新时间:{{movie.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
    </div>
    <div class="video-wrapper">
      <video class="video" v-if="movie.source" controls>
        <source :src=movie.source type="video/mp4">
      </video>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
// import tool from '../utils/tool.js'
export default {
  name: 'movie',
  components: {
  },
  data () {
    console.log('data')
    return {
      movie: {
        _id: '',
        name: '',
        source: '',
        description: '',
        createTime: '',
        updateTime: '',
        types: []
      },
    }
  },
  computed: {
    ...mapState({

    }),
    ...mapGetters([
      'isLogin'
    ])
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
      let _this = this
      this.$store.commit('ACTIVE_LOADING')
      this.$api.getMovieDetail(this.$route.params.id).then(res => {
        _this.$store.commit('INACTIVE_LOADING')
        if (res.data.movie) {
          _this.movie = res.data.movie
        }
      }, err => {
        _this.$store.commit('INACTIVE_LOADING')
        console.log(err)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.video-wrapper{
  text-align: center;
}
.video{
  width: 100%;
}
</style>
