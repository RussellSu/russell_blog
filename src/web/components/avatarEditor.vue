<template>
  <section id="avatarEditor" v-if="active">
    <div class="editor-content">
      <button class="close-btn btn" @click="closeEditor">×</button>
      <div class="left-bar position-R pull-left">
        <div class="cropper-wrapper">
          <vueCropper
            ref="cropper"
            id="avatar-cropper"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :full="option.full"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :centerBox="option.centerBox"
            :fixedBox="option.fixedBox"
            :original="option.original"
            @realTime="realTime">
          </vueCropper>
        </div>
        <div>
          <label class="btn btn-sm" for="uploads">upload</label>
          <input type="file"
            id="uploads"
            class="hide"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="updateImg($event, 1)">
        </div>
      </div>
      <div class="right-bar position-R pull-right text-center">
        <div class="preview-cube" :style="{'width': previews.w + 'px', 'height': previews.h + 'px'}">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
        <div class="preview-circle" :style="{'width': previews.w + 'px', 'height': previews.h + 'px'}">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
        <button class="btn" @click="confirmUpdate">确认上传</button>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import VueCropper from 'vue-cropper'
export default {
  name: 'avatarEditor',
  components: {
    VueCropper,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      crap: false,
      previews: {},
      option: {
        img: '', // 裁剪图片的地址   url 地址 || base64 || blob
        outputSize: 1, // 裁剪生成图片的质量 default:1,   0.1~1
        outputType: 'png', // 裁剪生成图片的格式 jpeg || png || webp
        info: true,
        full: false, // 是否输出原图比例的截图 default:false
        autoCrop: true, // 是否默认生成截图框 default:false
        autoCropWidth: 200, // 默认生成截图框宽度 default: 容器的80% 0~max
        autoCropHeight: 200, //
        fixed: true, // 是否开启截图框宽高固定比例 default: true
        fixedNumber: [1, 1], // 截图框的宽高比例 [1 : 1]
        canMove: true, // 上传图片是否可以移动 default: true
        centerBox: true, // 截图框是否被限制在图片里面 default: false
        fixedBox: false, // 固定截图框大小 不允许改变 default: false
        original: false, // 上传图片按照原始比例渲染 default: false
        canMoveBox: true, // 截图框能否拖动 default: true
      },
    }
  },
  watch: {
    active (newValue, oldValue) {
      if (!newValue && oldValue) {
        console.log('acitve false')
        this.resetAll()
      }
    },
  },
  methods: {
    updateImg (e, num) {
      let _this = this
      // 上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var fileReader = new FileReader()
      fileReader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        }
        else {
          data = e.target.result
        }
        if (num === 1) {
          _this.option.img = data
        }
        else if (num === 2) {
          _this.example2.img = data
        }
      }
      // 转化为base64
      // fileReader.readAsDataURL(file)
      // 转化为blob
      fileReader.readAsArrayBuffer(file)
    },
    imgLoad (msg) {
      console.log(msg)
    },
    // 实时预览函数
    realTime (data) {
      console.log('realTime')
      this.previews = data
    },
    confirmUpdate () {
      let _this = this
      console.log('confirmUpdate file')
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
        this.downImg = window.URL.createObjectURL(data)
        if (window.navigator.msSaveBlob) {
          var blobObject = new Blob([data])
          window.navigator.msSaveBlob(blobObject, 'demo.png')
        }
        else {
          _this.$nextTick(() => {
            _this.$refs.downloadDom.click()
          })
        }
      })
      this.$emit('ok')
    },
    closeEditor () {
      console.log('closeEditor')
      this.$emit('cancel')
      // this.$refs.cropper.clearCrop()
    },
    resetAll () {
      this.option.img = ''
      this.preview = {}
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#avatarEditor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 4rem;
  height: 4rem;
  padding: 0;
  border: 0;
  font-size: 4rem;
  line-height: 4rem;
  color: #c3c3c3;
}
.editor-content {
  position: absolute;
  top: calc(50vh - 240px);
  left: calc(50vw - 320px);
  height: 480px;
  width: 640px;
  background-color: #FFF;
}
.left-bar {
  width: 50%;
  height: 100%;
}
.right-bar {
  width: 50%;
  height: 100%;
  padding: 2rem 0;
}
.cropper-wrapper {
  margin-top: 2rem;
  margin-left: 2rem;
  width: calc(100% - 2rem);
  height: 50%;
}
#avatar-cropper {

}
.preview-cube {
  margin: 0 auto;
  overflow: hidden;
}
.preview-circle {
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
}
</style>
