<template>
  <section class="videos-detail-module module">
    <h1>{{video.name}}</h1>
    <div class="clearfix">
      <div class="float-left">创建时间:{{video.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      <div class="float-right">更新时间:{{video.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
    </div>
    <div class="video-wrapper">
      <video id="video" v-if="video.source" controls>
        <source :src=video.source type="video/mp4">
      </video>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
// import tool from '../utils/tool.js'
export default {
  name: 'video',
  components: {
  },
  data () {
    console.log('data')
    return {
      video: {
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
      this.$api.getVideoDetail(this.$route.params.id).then(res => {
        _this.$store.commit('INACTIVE_LOADING')
        if (res.data.video) {
          _this.video = res.data.video
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
.video-wrapper{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
}
#video {
  width: 100%;
  max-height: calc(100vh - 10rem);
  object-fit: fill;
}
</style>
