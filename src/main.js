import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import {
  router,
  store
} from '@/plugins'

Vue.use(ElementUI)

const vue = new Vue({
  router,
  store,
  ...App
}).$mount('#app')

// 导出 vue 实例, 用于 api 统一错误提示
export const vm = vue
