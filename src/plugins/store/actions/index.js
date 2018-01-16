// 异步操作，发 commit 给 mutation
import http from '@/plugins/axios'
// 登录成功
const login = ({commit}) => {
  commit('LOGIN_SUCCESS')
}
// 设置已登录用户信息
const setUserInfo = ({commit}, data) => {
  commit('SET_USER_INFO', data)
}
// 注销
const loginOut = ({commit}) => {
  // 登出
  commit('LOGIN_OUT')
}
// 获取用户权限
const getUserAuth = async ({commit}) => {
  // for server
  // const res = await http.post('adminMenu', {})
  // if (res === null) return
  // console.log('getUserAuth', res.param)
  // commit('SET_USER_AUTH', res.param.auth)
  // commit('SET_SIDE_NAV', res.param.nav)

  // for test mock
  let res = {}
  setTimeout(() => {
    res.param = {
      auth: ['演示菜单', 'Admin/Demo/list', '演示菜单1', 'Admin/Demo1/list'],
      nav: {
        1: {
          name: '演示菜单',
          url: '',
          children: [
            {name: '菜单列表', url: 'Admin/Demo/list'}
          ]
        },
        2: {
          name: '演示菜单1',
          url: '',
          children: [
            {name: '菜单列表1', url: 'Admin/Demo1/list'}
          ]
        }
      }
    }
    commit('SET_USER_AUTH', res.param.auth)
    commit('SET_SIDE_NAV', res.param.nav)
  }, 1000)
}

export default {
  login,
  setUserInfo,
  loginOut,
  getUserAuth
}
