<template>
  <div class="i-muti-uploader">
    <!-- 图片批量上传 -->
    <el-upload
      class="upload-demo"
      ref="upload"
      action="/"
      :on-remove="handleRemove"
      :http-request="customMutiUpload"
      :file-list="images"
      list-type="picture"
      :auto-upload="false"
      :multiple="true">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
    </el-upload>
  </div>

</template>

<script>
  /**
   * 二次封装 Element UI 多图 Uploader 组件
   *
   * 1. 引入 components, 设置组件别名 'i-muti-uploader'
   * 2. 传入参数 value:<form.data> 用于上传图片的表单字段
   * Demo
   * <i-muti-uploader value="editForm.images"></i-muti-uploader>
   *
   * import MutiUploader from '@/components/MutiUploader';
   *
   * components: {
 *  'i-muti-uploader': MutiUploader
 * }
   *
   */
  export default {
    name: 'mutiUploader',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        images: []
      }
    },
    watch: {
      value (val) {
        let _images = val.indexOf(',') > -1 ? val.split(',') : val
        let _imageList = []
        if (!Array.isArray(_images)) {
          let _url = _images.split('/')
          _imageList.push({
            uid: new Date().getTime(),
            name: _url[_url.length - 1],
            url: _images
          })
        } else {
          _images.forEach((item, index) => {
            let _url = item.split('/')
            _imageList.push({
              uid: new Date().getTime(),
              name: _url[_url.length - 1],
              url: item
            })
          })
        }
        this.images = _imageList.slice()
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      getImageList () {
        // 处理相册字段上传格式为 <http://xx , http://xx >
        let _images = []
        if (!Array.isArray(this.images)) {
          return this.images
        } else {
          this.images.forEach((item, index) => {
            _images.push(item.url)
          })
          return _images + ''
        }
      },
      // 新增页面 批量上传图片
      customMutiUpload (file) {
        this._uploadMutiImage(file)
      },
      /**
       * 统一上传接口
       * @param file 接收文件对象
       * @private
       */
      _uploadMutiImage (file) {
        // 将文件转为 base64 上传至服务器
        let reader = new FileReader()
        reader.readAsDataURL(file.file)
        let _this = this
        reader.onload = async () => {
          // 拿到 base64 代码
          let params = {
            uploadimg: reader.result
          }
          const res = await this.$http.post('imageUpload', params)
          if (res === null) return
          _this.images.push({
            name: file.file.name,
            status: 'success',
            uid: new Date().getTime(),
            url: res.param.path
          })
        }
      },
      // 图片上传前限制条件
      beforeImageUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      // 相册上传删除
      handleRemove (file, fileList) {
        let _this = this
        // 移除预览列表的同时，删除相关联的文件列表数组
        this.images.forEach((item, index) => {
          if (item.uid === file.uid) {
            _this.images.splice(index, 1)
          }
        })
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    position: relative;
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 178px;
    min-height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    display: block;
    max-width: 200px;
  }
</style>
