<template>
  <section id="avatarEditor" v-if="active">
    <button class="close-btn btn" @click="closeEditor">×</button>
    <!-- 拖动文件时，显示拖动上传范围 -->
    <div class="drop-active" v-show="$refs.uploader && $refs.uploader.dropActive">
      <h3>Drop files here to upload!</h3>
    </div>
    <!-- 非编辑模式 -->
    <div class="avatar-upload" v-show="!edit">
      <div class="text-center">
        <label :for="fileInputName">
          <img :src="files.length ? files[0].url : originPic" class="rounded-circle" />
          <h4 class="">or<br/>Drop files anywhere to upload</h4>
        </label>
      </div>
      <div class="text-center">
        <file-upload
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          :name="fileInputName"
          post-action="/api/uploads/avatar"
          class="btn btn-primary"
          :size="maxSize"
          :drop="!edit"
          :value="files"
          @input="updateValue"
          @input-filter="inputFilter"
          @input-file="inputFile"
          :ref="refName">
            <div class="upload-btn btn">Upload avatar</div>
        </file-upload>
      </div>
      <div class="text-center" v-if="files.length">
        <button @click="confirmUpdate">confirm update your avatar</button>
      </div>
    </div>
    <!-- 编辑模式 -->
    <div class="avatar-edit" v-show="files.length && edit">
      <div class="avatar-edit-image" v-if="files.length">
        <img ref="editImage" :src="files[0].url" />
        <div class="crop-preview"></div>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-secondary" @click.prevent="editCancel">Cancel</button>
        <button type="submit" class="btn btn-primary" @click.prevent="editSave">confirm</button>
      </div>
    </div>
    <div class="extra-info">
      Source code:
      <a href="https://github.com/lian-yue/vue-upload-component/blob/master/docs/views/examples/Avatar.vue">/docs/views/examples/Avatar.vue</a>
    </div>
  </section>
</template>

<script>
import 'cropperjs/src/css/cropper.scss'
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component'
// import { mapState, mapGetters } from 'vuex'
// component props:
// {
// input-id：this.name,// input 标签的 id 属性
// name: 'file', // input标签的 name 属性,(同时若 点击<label :for='name'></label>也会出发选择文件弹窗)
// extensions: , // 允许上传的文件后缀 1. 'jpg,gif,png,webp' 2. ['jpg', 'gif', 'png', 'webp'] 3. /\.(gif|jpe?g|png|webp)$/i
// accept: , // 表单的accept属性, MIME type (> IE9) 1. 'image/png,image/gif,image/jpeg,image/webp' 2. 'image/*'
// multiple: false, // 文件表单的 multiple 属性, 是否允许选择多个文件
// directory: false, // 文件表单的 directory 属性, 是否是上传文件夹
// maximum: props.multiple ? 0 : 1 , // 列表最大文件数
// size: 0, // 允许上传的最大字节(> IE9), 0 不限制
// thread: 1, // 同时并发上传的文件数量 线程数(> IE9)
// post-action: , // POST 请求的上传URL
// put-action: , // PUT 请求的上传URL(> IE9), put-action 不为空请优先 PUT 请求
// custom-action: , // 自定义上传方法, custom-action 优先级高于 put-action, post-action
// headers: {},  // 自定义上传请求 header 数据
// data: {}, // POST 请求: 附加请求的 body, PUT 请求: 附加请求的 query
// timeout: 0, // 上传超时时间毫秒, (> IE9)
// drop: false // 拖拽上传, 如果设置成 true 则读取父组件作为容器
// drop-directory:true, // 是否开启拖拽目录
// add-index: , // add() 方法 index 参数的默认值
// value, v-model: [], // 浏览 File 详细信息
// }
export default {
  name: 'avatarEditor',
  components: {
    FileUpload,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    originPic: {
      type: String,
      default: '/img/avatar-placeholder.png',
    },
    maxSize: {
      type: Number,
      default: 6 * 1024 * 1024, // 6 * 1024K
    },
  },
  data () {
    return {
      fileInputName: 'avatar',
      refName: 'uploader',
      files: [],
      edit: false,
      cropper: false,
    }
  },
  watch: {
    edit (value) {
      console.log('avatarEditor edit', value)
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1, //  裁剪框的宽高比 width / height
            viewMode: 1,
            autoCropArea: 1, // default: 0.8    定义自动裁剪框与图片比例
            preview: '.crop-preview', // 添加额外的元素(容器)以供预览， 匹配<div class="crop-preview"></div>的裁剪后图片预览
            ready: function () {
              console.log("ready")
            },
            cropstart: function (e) {
              console.log("cropstart")
            },
            cropmove: function (e) {
              console.log("cropmove")
            },
            cropend: function (e) {
              console.log("cropend")
            },
            crop: function (e) {
              console.log("crop")
            },
            zoom: function (e) {
              console.log("zoom")
            },
          })
          this.cropper = cropper
          console.log('this.cropper', cropper)
        })
      }
      else {
        if (this.cropper) {
          this.cropper.destroy()
          this.cropper = false
        }
      }
    },
  },
  methods: {
    updateValue (value) {
      this.files = value
    },
    editSave () {
      console.log('avatarEditor editSave')
      this.edit = false
      let oldFile = this.files[0]
      // console.log(this.cropper.getCroppedCanvas().toDataURL(oldFile.type))
      // base64转成blob
      let binStr = window.atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1]) // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })
      console.log('file:', file)
      this.$refs.uploader.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        // active: true, // 控制上传
      })
    },
    editCancel () {
      this.$refs.uploader.clear()
    },
    alert (message) {
      alert(message)
    },
    // Add, update, remove pre-filter
    inputFilter (newFile, oldFile, prevent) {
      console.log('avatarEditor inputFilter')
      if (newFile && !oldFile) {
        // 添加文件时，校验文件格式，过滤非图片
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')
          // 不会添加到 files 去
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // 更新或添加
        // 创建 `blob` 字段 用于缩略图预览
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
          console.log('newFile.url', newFile.url)
        }
      }
    },
    // after Add, update, remove
    inputFile (newFile, oldFile, prevent) {
      console.log('avatarEditor inputFile')
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    confirmUpdate () {
      console.log('confirmUpdate file', this.files)
      // let file = this.files[0]
      this.$refs.uploader.active = true
      // let a = this.$refs.uploader.update(file.id, {
      // //   // file,
      // //   // type: file.type,
      // //   // size: file.size,
      //   active: true,
      // })
      this.$emit('ok')
    },
    closeEditor () {
      console.log('closeEditor')
      this.$emit('cancel')
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
  background-color: #000;
  z-index: 1;
}
#avatarEditor .avatar-upload .rounded-circle {
  width: 200px;
  height: 200px;
}
#avatarEditor .text-center .btn {
  margin: 0 0.5rem;
}
#avatarEditor .avatar-edit-image {
  max-width: 100%;
}
#avatarEditor .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
#avatarEditor .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
.crop-preview {
  height: 100px;
  width: 100px;
  overflow: hidden;
  margin: 10px auto;
  border: 1px dashed #fff;
  box-sizing: content-box;
  background-color: #000;
}
.close-btn {
  float: right;
  width: 4rem;
  padding: 0;
  font-size: 4rem;
  border: 0;
}

</style>
