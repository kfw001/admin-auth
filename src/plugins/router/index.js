import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import configs from '@/configs'
import { store } from '@/plugins'
// Element Message Component
import { Message } from 'element-ui'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
  // mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = `${configs.title} - ${to.name}`
  const {hasAuth, auth} = store.state.user
  // 未拿到权限，则获取
  if (!hasAuth) {
    store.dispatch('getUserAuth')
  }
  // 如果未登录，跳转
  if (window.localStorage.getItem('IS_LOGIN') === null && to.path !== '/login') {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  } else {
    // 需要鉴权的路由地址
    if (to.meta.requiresAuth) {
      // 有权限进入
      if (auth.indexOf(to.meta.alias) > -1) {
        next()
      } else {
        if (auth.length > 0) {
          Message.error({
            message: '当前用户权限不足，无法访问',
            showClose: true
          })
        } else {
          next()
        }
      }
    } else {
      next()
    }
  }
})

export default router
