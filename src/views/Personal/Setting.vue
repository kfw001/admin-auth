<template>
  <section class="setting-wrapper">
    <!--编辑界面-->
    <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="editForm.realname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="tel">
        <el-input v-model="editForm.tel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model.number="editForm.password"
                  auto-complete="off"
                  placeholder="为空则不修改密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model.number="editForm.repassword"
                  auto-complete="off"
                  placeholder="为空则不修改密码"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="thumb">
        <i-uploader v-model="editForm.thumb"></i-uploader>
      </el-form-item>
      <el-form-item class="btn-footer">
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
        <el-button @click.native="handleRedirect('个人资料')">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import Uploader from '@/components/Uploader/Uploader'
  const MODEL_NAME = 'Personal'

  export default {
    data () {
      // 手机号码校验规则
      const checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        if (!/^1[0-9]{10}$/.test(value)) {
          callback(new Error('请输入正确手机号码'))
        } else {
          callback()
        }
      }
      // 密码自定义校验规则
      const validatePass = (rule, value, callback) => {
        if (this.editForm.password !== '') {
          this.$refs.editForm.validateField('repassword')
        }
        callback()
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '' && this.editForm.password !== '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.editForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        editLoading: false,
        editFormRules: {
          realname: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'}
          ],
          tel: [
            {validator: checkTel, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          repassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          thumb: [
            {required: true, message: '请上传头像', trigger: 'blur'}
          ]
        },
        // 编辑界面数据
        editForm: {
          realname: '',
          tel: '',
          password: '',
          repassword: '',
          thumb: ''
        }
      }
    },
    methods: {
      // 菜单跳转
      handleRedirect (data) {
        this.$router.push({name: data})
      },
      // 获取用户个人资料
      async getUserSettings () {
        const res = await this.$http.post(`${MODEL_NAME}/settings`)
        if (res === null) return
        const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
        this.editForm.realname = res.param.realname
        this.editForm.tel = res.param.tel
        this.editForm.thumb = reg.test(res.param.thumb) ? res.param.thumb : require('@/assets/images/loggeduser.png')
      },
      // 编辑
      editSubmit () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(async () => {
              this.editLoading = true
              let params = Object.assign({}, this.editForm)
              const res = await this.$http.post(`${MODEL_NAME}/save`, params)
              this.editLoading = false
              if (res === null) return
              this.$message({
                message: res.info,
                type: 'success'
              })
              this.getUserSettings()
            }).catch(() => {

            })
          }
        })
      }
    },
    mounted () {
      this.getUserSettings()
    },
    components: {
      'i-uploader': Uploader
    }
  }
</script>

<style lang="scss" scoped>
  .setting-wrapper {
    width: 70%;
    margin: 30px;
  }

  .btn-footer {
    margin-left: 100px;
  }
</style>
