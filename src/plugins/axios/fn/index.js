/**
 *  对于axios的进一步封装
 *  @desc: 契合公司开发流程以及vue开发模板，对axios进行进一步分装
 **/

// 加载axios
import axios from 'axios'
// 加载本地配置文件
import configs from '@/configs/api'
// 导入全局配置
import './config.js'
// 获取请求地址域名以及接口列表
const {api} = configs

// 处理回调参数
const handleResponse = function (res) {
  return (res.data ? res.data : null)
}
// core
export default {
  post (name, params, options = {}) {
    // 验证name参数, 必填参数
    if (name == null) {
      throw new Error(`
            error arguments: name is undefined,
            please check your function.
        `)
    }
    // 验证所使用的方法是否被配置
    // if( api[name] == null ) throw `
    //     error arguments: name is not configured,
    //     please check \'@\/configs\/api.js\'.
    // `;
    // 根据默认参数进行ajax请求
    // 如果找不到匹配的接口地址，则采用通配模式 `${MODEL_NAME}/<action>`
    return axios.post(api[name] ? api[name] : name, params, options)
      .then(res => handleResponse(res))
  },
  get (name, params) {
    // 验证name参数, 必填参数
    if (name == null) {
      throw new Error(`
            error arguments: name is undefined,
            please check your function.
        `)
    }
    // if( api[name] == null ) throw `
    //     error arguments: name is not configured,
    //     please check \'@\/configs\/api.js\'.
    // `;
    // 根据默认参数进行ajax请求
    // 如果找不到匹配的接口地址，则采用通配模式 `${MODEL_NAME}/<action>`
    return axios.get(api[name] ? api[name] : name, {params})
      .then(res => handleResponse(res))
  }
}
