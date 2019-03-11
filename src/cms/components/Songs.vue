<template>
  <section class="songs-module module text-center">
    <h1 class="module-title">songs</h1>
    <div class="create-wrapper">
      <input type="text" v-model.trim="newSongName" />
      <button @click="createNewSong">create</button>
    </div>
    <div class="song-list rs-scrollbar">
      <div class="song" v-for="song in songs" :key="song._id">
        <router-link :to="'/songs/' + song._id" class="song-title"> {{song.name}}</router-link>
        <p class="text-right">{{song.source}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'songs',
  data () {
    return {
      songs: [],
      newSongName: '',
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
    createNewSong () {
      let _this = this
      const newSongName = _this.newSongName
      _this.$api.createNewSong({ 'name': newSongName }).then(
        res => {
          _this.getList()
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
      _this.$api.getSongList().then(
        res => {
          _this.$store.commit('INACTIVE_LOADING')
          _this.songs = res.data.songs
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
.song-list {
  margin: 20px 0;
  max-height: calc(100vh - 6rem - 1rem); // 1rem 留空不贴底部
  overflow: auto;
}
.song {
  min-height: 50px;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.song-title {
  font-size: 2rem;
  width: 100%;
  display: inline-block;
}
</style>
