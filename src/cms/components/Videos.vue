<template>
  <section class="videos-module module text-center">
    <h1 class="module-title">videos</h1>
    <div class="create-wrapper">
      <input type="text" v-model.trim="newVideoName" />
      <button @click="createNewVideo">create</button>
      <select v-model="videoType">
        <option value="video">video</option>
        <option value="moment">moment</option>
      </select>
    </div>
    <div class="video-list rs-scrollbar">
      <div class="video" v-for="video in videos" :key="video._id">
        <router-link :to="'/videos/' + video._id" class="video-title"> {{video.name}}</router-link>
        <p class="text-right">{{video.source}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'videos',
  data () {
    return {
      videos: [],
      newVideoName: '',
      videoType: 'video',
    }
  },
  created () {
    document.title = this.$route.name
    this.getList()
  },
  computed: {
    ...mapState({
      _id: state => state.userProfile._id,
      fullname: state => state.userProfile.fullname,
      gender: state => state.userProfile.gender,
    }),
    ...mapGetters([
      'isLogin',
    ]),
  },
  methods: {
    createNewVideo () {
      let _this = this
      const newVideoName = _this.newVideoName
      _this.$api.createNewVideo({ 'name': newVideoName }).then(
        res => {
          debugger
          _this.$router.push({ name: 'video', params: { 'id': res.data.video._id } })
        },
        err => {
          if (err.data.missingName) {
            alert('名称不可为空！')
            console.log(err)
          }
        }
      )
    },
    getList () {
      let _this = this
      _this.$store.commit('ACTIVE_LOADING')
      _this.$api.getVideoList().then(
        res => {
          _this.$store.commit('INACTIVE_LOADING')
          _this.videos = res.data.videos
        },
        err => {
          _this.$store.commit('INACTIVE_LOADING')
          console.log(err)
        }
      )
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.video-list {
  margin: 20px 0;
  max-height: calc(100vh - 6rem - 1rem); // 1rem 留空不贴底部
  overflow: auto;
}
.video {
  min-height: 50px;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.video-title {
  font-size: 2rem;
  width: 100%;
  display: inline-block;
}
</style>
