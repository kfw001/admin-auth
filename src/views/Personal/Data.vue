<template>
  <section class="personal-wrapper">
    <el-row class="form-item" type="flex" align="middle">
      <el-col :span="8">头像：</el-col>
      <el-col :span="16">
        <img class="person-avatar" :src="personData.thumb" alt="">
      </el-col>
    </el-row>
    <el-row class="form-item" type="flex" align="middle">
      <el-col :span="8">邮箱地址：</el-col>
      <el-col :span="16">{{personData.email}}</el-col>
    </el-row>
    <el-row class="form-item" type="flex" align="middle">
      <el-col :span="8">真实姓名：</el-col>
      <el-col :span="16">{{personData.realname}}</el-col>
    </el-row>
    <el-row class="form-item" type="flex" align="middle">
      <el-col :span="8">手机号码：</el-col>
      <el-col :span="16">{{personData.tel}}</el-col>
    </el-row>
    <el-row class="form-item" type="flex" align="middle">
      <el-col :span="8">创建时间：</el-col>
      <el-col :span="16">{{ personData.create_time | formateCreateDate}}</el-col>
    </el-row>
  </section>
</template>

<script>
  import util from '@/utils/js'

  const MODEL_NAME = 'Personal'

  export default {
    data () {
      return {
        personData: {
          email: '',
          realname: '',
          tel: '',
          thumb: '',
          create_time: ''
        }
      }
    },
    methods: {
      // 获取用户信息
      async getPersonData () {
        const res = await this.$http.post(`${MODEL_NAME}/settings`)
        if (res === null) return
        const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
        this.personData.email = res.param.email
        this.personData.realname = res.param.realname
        this.personData.tel = res.param.tel
        this.personData.thumb = reg.test(res.param.thumb) ? res.param.thumb : require('@/assets/images/loggeduser.png')
        this.personData.create_time = res.param.create_time
      }
    },
    filters: {
      // 格式化创建时间
      formateCreateDate (val) {
        return typeof val === 'number' ? `${util.formatDate.format(new Date(val * 1000), 'yyyy-MM-dd hh:mm:ss')}` : val
      }
    },
    mounted () {
      this.getPersonData()
    }
  }
</script>

<style lang="scss" scoped>
  .personal-wrapper {
    margin: 30px;
    vertical-align: middle;
    .form-item {
      border-bottom: 1px dotted #ddd;
      padding: 12px 15px;
      vertical-align: middle;
    }
    .person-avatar {
      display: inline-block;
      width: 150px;
      height: 150px;
      border: 1px solid #eee;
    }
  }
</style>
