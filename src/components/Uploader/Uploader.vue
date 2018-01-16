<template>
  <div class="i-uploader">
    <el-input v-model="cover" placeholder="请输入内容"></el-input>
    <el-upload
      class="avatar-uploader"
      action="/"
      :http-request="customUpload"
      :show-file-list="false"
      :before-upload="beforeImageUpload">
      <img v-if="cover" :src="cover" class="avatar">
      <i v-if="!isPhoto" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>

</template>

<script>
  /**
   * 二次封装 Element UI Uploader组件
   *
   * 1. 引入 components, 设置组件别名 'i-uploader'
   * 2. 传入参数 v-model:<form.data> 用于上传图片的表单字段
   * Demo
   * <i-uploader v-model="editForm.cover"></i-uploader>
   *
   * import Uploader from '@/components/Uploader';
   *
   * components: {
 *  'i-uploader': Uploader
 * }
   *
   */

  export default {
    name: 'i-uploader',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        cover: this.value
      }
    },
    watch: {
      value (val) {
        this.cover = val
      },
      cover (val) {
        this.$emit('input', val)
      }
    },
    computed: {
      isPhoto () {
        let reg = /^http|(jpg|jpeg|png)+$/
        return this.cover.match(reg) && this.cover.match(reg).length >= 2
      }
    },
    methods: {
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
      // 处理编辑页面上传
      customUpload (file) {
        this._uploadImage(file)
      },
      /**
       * 统一上传接口
       * @param file 接收文件对象
       * @private
       */
      _uploadImage (file) {
        // 将文件转为 base64 上传至服务器
        let reader = new FileReader()
        reader.readAsDataURL(file.file)
        reader.onload = async () => {
          // 拿到 base64 代码
          let params = {
            pic: reader.result
          }
          const res = await this.$http.post('imageUpload', params)
          if (res === null) return
          this.cover = res.param.path
        }
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
