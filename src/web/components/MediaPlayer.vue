<template>
<div class="media-player-wrapper" :class="{collapsed: collapsePlayList}">
  <ol class="song-list">
    <li v-for="(song, index) in songList" :key="song._id">
      【{{song.name}}】
      <audio
      v-if="song.source"
      controls="controls"
      :autoplay="index===0"
      :preload="'auto'"
       :id="song._id"
      >
        <source :src=song.source type="audio/mpeg">
      </audio>
    </li>
  </ol>
  <i class="player-toggle-btn fa fa-music" @click="tooglePlayList"></i>
</div>
</template>

<script>
//  import sidebar from '@/web/navList'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'mediaPlay',
  data () {
    return {
      songList: [],
      collapsePlayList: true
    }
  },
  created () {
    console.log('sidebar created')
  },
  mounted () {
    this.getSongList()
  },
  computed: {
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
  methods: {
    tooglePlayList () {
      this.collapsePlayList = !this.collapsePlayList
    },
    getSongList () {
      let _this = this
      _this.$store.commit('ACTIVE_LOADING')
      _this.$api.getSongList().then(
        res => {
          _this.$store.commit('INACTIVE_LOADING')
          _this.songList = res.data.songs
        },
        err => {
          _this.$store.commit('INACTIVE_LOADING')
          console.log(err)
        }
      )
    },
  }
}
</script>
<style lang="scss" scoped >
.media-player-wrapper {
  // display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 50vh;
  background-color: #000;
  text-align: center;
  // transform: translateX(0);
  transition: transform 0.5s linear;
  &.collapsed {
    transform: translateY(-50vh);
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background-color: #F00;
    border-radius: 50%;
  }
}
.song-list {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  margin: 0;
  height: 100%;
  padding-left: 10px;
  list-style-position: inside;
  text-align: left;
  background-color: #fff;
}
.player-toggle-btn {
  position: absolute;
  bottom: -40px;
  right: 0;
  z-index: 1;
  width: 40px;
  height: 40px;
  padding: 10px;
  font-size:20px;
  color: $color5;
  animation: rotate-infinite 3s linear infinite;
}

@keyframes rotate-infinite {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
