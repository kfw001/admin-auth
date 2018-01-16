/**
 *  ajax集中化处理
 *  @desc: ajax集中处理函数
 *  @author: helloLaoYanG<aaron@codonas.cn>
 *  @param:
 *      name [String] 接口名称，来自/src/api/conf/config.js
 *      param [Object] 接口参数，必须为object
 *  @return
 *      axios请求对象
 **/

import Vue from 'vue'
import http from './fn'

// 挂在到$http
Vue.prototype.$http = http

export default http
