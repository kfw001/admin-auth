<template>
  <div class="login-panel">
    <el-row>
      <el-col :span="14">
        <div class="company-info">
          <div class="logo">
            <img src="../../assets/images/logo.png" style="width:120px;height:20px">
          </div>
          <h5 class="title">中节能物业管理系统后台登录</h5>
          <ul class="intro">
            <li><i class="fa fa-arrow-circle-o-right mr5"></i>
              杭州快房传媒有限公司座落于钱江新城CBD核心商圈，是都市快报控股子公司，年营业额过亿，是都市快报全媒体阵营的重要一员。
            </li>
            <li><i class="fa fa-arrow-circle-o-right mr5"></i>
              公司设有媒体中心、运营中心、家居中心、网络中心、客服中心及宁波分中心，主要经营都市快报的房产广告及快房网的运营。都市快报的房产广告，位列浙江省房产投放量第一，最受房产商青睐。
            </li>
            <li><i class="fa fa-arrow-circle-o-right mr5"></i> 公司拥有一支年轻，活力四射，具有激情的团队。团队内有员工100多名，平均年龄29.1岁。
            </li>
            <li><i class="fa fa-arrow-circle-o-right mr5"></i>
              都市快报由杭州日报报业集团主办，于1999年1月1日创刊，是中国第一份四开异型加长报；全国发行，重点覆盖浙江省各地市县，是浙江省发行量最大的报纸。
            </li>
            <li><i class="fa fa-arrow-circle-o-right mr5"></i> 公司网址： http://www.kfw001.com/</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="10">
        <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container" @keyup.enter.native="handleSubmit">
          <h3 class="title">登录</h3>
          <el-form-item prop="email">
            <el-input type="text" v-model="loginForm.email" auto-complete="off"
                      placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="15">
              <el-input type="text"
                        v-model="loginForm.code"
                        auto-complete="off"
                        placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="7" :offset="1" class="code-wrapper">
              <!--&lt;!&ndash; 验证码显示&ndash;&gt;-->
              <!--<canvas ref="code" width='90' height='36' @click="getCode">-->
              <!--您的浏览器不支持 Canvas 特性，请更新至最新版本。-->
              <!--</canvas>-->
              <img :src="codeSrc"
                   alt=""
                   width="90"
                   height="36"
                   @click="getCode">
            </el-col>
          </el-form-item>
          <el-form-item style="width:100%;">
            <span class="forgot-pwd">忘记密码？</span>
          </el-form-item>

          <el-form-item style="width:100%;">
            <el-button type="primary"
                       style="width:100%;"
                       @click.native.prevent="handleSubmit"
                       :loading="logining">登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="login-footer">
      <div class="copyright">
        © 2017 版权所有：杭州快房传媒有限公司 浙ICP备09096541号
      </div>
      <div class="author">
        Created By: 快房传媒
      </div>
    </div>
  </div>
</template>

<script>
  import configs from '@/configs/api'
  // 获取请求地址域名以及接口列表
  const {baseUrl, api} = configs
  export default {
    data () {
      return {
        logining: false,
        loginForm: {
          email: 'admin@kfw001.com',
          password: 'ljw2016',
          code: ''
        },
        codeSrc: '', // 获取到的验证码URL
        loginRule: {
          email: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (ev) {
        this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            this.logining = true
            const params = Object.assign({}, this.loginForm)
            const res = await this.$http.post('login', params)
            this.logining = false
            if (res !== null) {
              // 登录成功跳转
              this.$store.dispatch('login')
              this.$message.success(res.info)
              this.$router.push({path: '/main'})
              this.$store.dispatch('getUserAuth') // 获取当前用户权限
            } else { // 错误后，重新获取验证码
              this.loginForm.code = ''

              this.getCode()
            }
          } else {
            this.$message.error('请正确填写表单后提交！')
            return false
          }
        })
      },
      // 获取验证码
      getCode () {
        this.codeSrc = `${baseUrl}${api['code']}?${new Date().getTime()}`
      }
    },
    mounted () {
      // 获取验证码
      this.getCode()
    }
  }
</script>

<style lang="scss">
  @import "Login";
</style>
