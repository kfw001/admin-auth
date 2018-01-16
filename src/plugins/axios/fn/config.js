/**
 *  axios 配置文件
 *  @desc: 配置ajax headers request Response 数据预处理
 *  @author: 52admin<ismrwang+kfw@gmail.com>
 */

import axios from 'axios'
import Qs from 'qs'
import configs from '@/configs/api'
// vue 实例
import { vm as Vue } from '@/main.js'

const {baseUrl} = configs
// 确认默认链接
axios.defaults.baseURL = baseUrl

// 初始化post header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 支持跨域携带cookie
axios.defaults.withCredentials = true

/**
 * todo: 预处理Requests数据
 * desc: 进行数据转换，添加默认字段等
 * @return data;
 **/
axios.defaults.transformRequest = function _transformRequest (params = {}) {
  // 返回完整数据，请求ajax
  return Qs.stringify(params)
}

/**
 * todo: 预处理Response数据
 * desc: 可以进行返回码操作
 * @return data || null;
 **/
axios.defaults.transformResponse = function _transformResponse (res) {
  try {
    res = JSON.parse(res)
  } catch (e) {
    Vue.$message({
      message: '服务器有问题！',
      type: 'error'
    })
    return null
  }

  res.status = Number(res.status) // 错误码统一转为 Number
  // 状态正常
  if (res.status !== 200) {
    switch (res.status) {
      case 102: // 没有登录
        // case 1020: // 您没有访问权限
        // case 104: // 请勿非法访问
        // case 306: // 身份信息过期
        // 需要跳转路由，清除登录状态
        Vue.$store.dispatch('login_out')
        Vue.$router.push('/login')
        Vue.$message({
          message: res.info,
          type: 'error'
        })
        break
      default:
        // 其他错误提示错误信息，返回data
        Vue.$message({
          message: res.info,
          type: 'error'
        })
        break
    }
    return null
  } else {
    return res
  }
}
