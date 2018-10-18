<template>
  <section class="movies-module module text-center">
    <h1 class="module-title">movies</h1>
    <div class="movie-list rs-scrollbar">
      <div class="movie" v-for="movie in movies" :key="movie._id">
        <router-link :to="'/movies/' + movie._id" class="movie-title"> {{movie.name}}</router-link>
        <p class="text-right">{{movie.source}}</p>
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
    this.getMovies()
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters([
      'isLogin'
    ])
  },
  methods: {
    getMovies () {
      let _this = this
      _this.$store.commit('ACTIVE_LOADING')
      _this.$api.getMovieList().then(
        res => {
          _this.$store.commit('INACTIVE_LOADING')
          _this.movies = res.data.movies
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
  margin: 20px 0;
  max-height: calc(100vh - 6rem - 1rem); // 1rem 留空不贴底部
  overflow: auto;
}
.movie {
  min-height: 50px;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.movie-title {
  font-size: 2rem;
  width: 100%;
  display: inline-block;
}
</style>
