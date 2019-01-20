<template>
  <section class="videos-detail-module module">
    <h1>{{video.name}}</h1>
    <div class="clearfix">
      <div class="float-left">创建时间:{{video.createTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
      <div class="float-right">更新时间:{{video.updateTime | time_format('YYYY/MM/DD HH:mm:ss')}}</div>
    </div>
    <div class="video-wrapper">
      <video v-if="video.source" id="video" controls>
        <source :src=video.source type="video/mp4">
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
        <uploader-btn class="select-file-btn btn btn-sm" :attrs="attrs">选择文件</uploader-btn>
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
  name: 'videoDetail',
  components: {
  },
  data () {
    console.log('data')
    return {
      md5: '',
      preprocessCheckingFlg: false,
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: '/api/uploads/video',
        singleFile: true,
        simultaneousUploads: 1, // 并发上传数，默认 3
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
      attrs: {
        accept: 'video/*'
      },
      fileStatusText: {
        success: '成功',
        error: '错误',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待中'
      },
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
    fileSuccess (rootFile, file, message, chunk) {
      console.log('fileSuccess', rootFile, file, message, chunk)
      let _this = this
      // message: post res
      this.$api.mergeChunk({
        'identifier': rootFile.uniqueIdentifier,
        'chunks': rootFile.chunks.map(item => ({ chunkNum: (item.offset + 1).toString() })),
        'filename': rootFile.name,
        'fileSize': rootFile.size,
        'mimeType': rootFile.fileType,
        'assetType': 'video',
      }).then(res => {
        _this.$api.updateVideoAsset(_this.video._id, { 'source': res.data.filePath }).then(res => {
          _this.video.source = res.data.source
          alert('更新资源成功')
        })
      }, err => {
        console.log(err)
      })
    },
    preprocess (chunk) {
      // 几个并发， 几个preprocess同时跑
      console.log('preprocess chunk', chunk)
      let _this = this
      _this.preprocessCheckingFlg = true
      // 上传或test之前执行,生成md5(如果file存在md5 就不生成了)
      if (!_this.md5) {
        console.log('no md5')
        tool.getFileMD5(chunk.file.file, md5Value => {
          console.log('md5', md5Value)
          _this.$api.checkMD5Existed(md5Value).then(res => {
            if (res.data.result) {
              alert('已经有啦')
              // chunk.preprocessFinished()
              _this.$api.updateVideoAsset(_this.video._id, { 'source': res.data.result.filePath }).then(res => {
                _this.video.source = res.data.source
                alert('更新资源成功')
              })
            }
            else {
              _this.md5 = md5Value
              chunk.file.uniqueIdentifier = md5Value
              chunk.preprocessFinished()
            }
          }, err => {
            console.log(err)
          })
        })
      }
      else {
        console.log('md5 exists in page')
        chunk.preprocessFinished()
      }
    },
  }
}
</script>
<style lang="scss" scoped>
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
.drop-wrapper {
  background-color: #DDDAD6;
  width: 400px;
  margin: 20px auto;
}
.select-file-btn {

}
</style>
