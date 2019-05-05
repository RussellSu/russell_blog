<template>
  <section class="lab-module module">
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AvatarEditor from '@/web/components/avatarEditor'
export default {
  name: 'lab',
  components: {
    AvatarEditor,
  },
  data () {
    return {
      baseUrl: process.env.BASE_URL,
      browserInfo: {},
      activeAvatarEditor: false,
    }
  },
  created () {
    document.title = this.$route.name
  },
  mounted () {
  },
  computed: {
    ...mapState({
      userId: state => state.userProfile._id,
    }),
    ...mapGetters([
      'isLogin',
      'isAdmin',
      'genderText',
    ]),
  },
  methods: {
    goCMS () {
      window.location.href = '/cms'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.avatar {
  width: 100%;
  border: 1px dotted #fff;
}
.avatar-uploader-wrapper {
  &:hover .avatar-uploader-btn {
    display: block;
  }
}
.avatar-uploader-btn {
  display: none;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size:1.5rem;
  line-height: 3rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-align: center;
}
.browser-info {
  border: 1px solid #5b5b5b;
  padding: 10px;
  margin: 10px;
  ol {
    list-style-position: outside;
  }
  .info-key {
    display: inline-block;
    // min-width: 200px;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .info-value {
    color: #FF0;
  }
}
</style>
