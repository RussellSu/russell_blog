<template>
  <section class="movies-module module text-center">
    <h1 class="module-title">movies</h1>
    <div class="create-wrapper">
      <input type="text" v-model.trim="newMovieName" />
      <button @click="createNewMovie">create</button>
    </div>
    <div class="movie-list rs-scrollbar">
      <div class="movie" v-for="movie in movies" :key="movie._id">
        <router-link :to="'/movies/' + movie._id" class="movie-title"> {{movie.name}}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'movies',
  data () {
    return {
      movies: [],
      newMovieName: '',
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
      'isLogin'
    ])
  },
  methods: {
    createNewMovie () {
      let _this = this
      const newMovieName = _this.newMovieName
      _this.$api.createNewMovie({ 'name': newMovieName }).then(
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
      this.$store.commit('ACTIVE_LOADING')
      this.$api.getMovieList().then(
        res => {
          _this.$store.commit('INACTIVE_LOADING')
          this.movies = res.data.movies
        },
        err => {
          _this.$store.commit('INACTIVE_LOADING')
          console.log(err)
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.movie-list {
  max-height: calc(100vh - 6rem - 1rem); // 1rem 留空不贴底部
  overflow: auto;
}
.movie {
  min-height: 50px;
  margin-bottom: 1rem;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
