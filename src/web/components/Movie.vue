<template>
  <section class="movies-detail-module module">
    <h1>{{movie.name}}</h1>
    <div class="clearfix">
      <div class="float-left">创建时间:{{movie.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      <div class="float-right">更新时间:{{movie.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
    </div>
    <div class="video-wrapper">
      <video v-if="movie.source" controls>
        <source :src=movie.source type="video/mp4">
      </video>
    </div>

    <uploader
      :options="options"
      :autoStart="false"
      :fileStatusText="fileStatusText"
      @file-success="fileSuccess"
      class="uploader-example"
      ref="uploader">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop class="drop-wrapper text-center">
        <p>拖动文件到此处</p>
        <p>或者</p>
        <uploader-btn class="select-file-btn btn btn-sm">选择文件</uploader-btn>
        <!-- <uploader-btn :attrs="attrs">select images</uploader-btn> -->
        <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import tool from '../utils/tool.js'
export default {
  name: 'movie',
  components: {
  },
  data () {
    console.log('data')
    return {
      md5: '',
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: '/api/uploads/movie',
        singleFile: true,
        fileParameterName: 'file', // default: 'file'
        testChunks: true,
        successStatuses: [200, 201],
        permanentErrors: [500, 501],
        categoryMap: {
          // image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
          video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
          // audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
          // document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
        },
        processResponse (res, cb) { // post 的回调
          console.log('processResponse', res)
          cb(null, res)
        },
        preprocess: this.preprocess,
      },
      fileStatusText: {
        success: '成功',
        error: '错误',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待中'
      },
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
    fileSuccess (rootFile, file, message, chunk) {
      let _this = this
      // message: post res
      console.log('fileSuccess', rootFile, file, message, chunk)
      this.$api.mergeChunk({
        'identifier': rootFile.uniqueIdentifier,
        'chunks': rootFile.chunks.map(item => ({ chunkNum: (item.offset + 1).toString() })),
        'filename': rootFile.name,
        'mimeType': rootFile.fileType,
      }).then(res => {
        _this.$api.updateMovieAsset(_this.movie._id, { 'source': res.data.filePath }).then(res => {
          _this.movie.source = res.data.source
          alert('更新资源成功')
        })
      }, err => {
        alert(err)
      })
    },
    preprocess (chunk) {
      let _this = this
      console.log('preprocess chunk', chunk)
      // 上传或test之前执行,生成md5(如果file存在md5 就不生成了)
      if (!_this.md5) {
        tool.getFileMD5(chunk.file.file, md5Value => {
          _this.md5 = md5Value
          chunk.file.uniqueIdentifier = md5Value
          chunk.preprocessFinished()
        })
      }
      else {
        chunk.preprocessFinished()
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.video-wrapper{
  text-align: center;
}
.drop-wrapper {
  background-color: #DDDAD6;
  width: 400px;
  margin: 20px auto;
}
.select-file-btn {

}
</style>
