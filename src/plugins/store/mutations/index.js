// 同步操作

// 注销
const LOGIN_OUT = (state, payload) => {
  window.localStorage.removeItem('IS_LOGIN')
}
// 登录成功
const LOGIN_SUCCESS = (state) => {
  window.localStorage.setItem('IS_LOGIN', true)
}
// 设置用户信息
const SET_USER_INFO = (state, {
  user,
  avatar
}) => {
  state.user.name = user
  state.user.avatar = avatar
}

const CLEAR_AUTH_MENU = (state) => {
  state.user.auth = []
  state.user.hasAuth = false
  state.user.nav = []
}

// 设置用户权限
const SET_USER_AUTH = (state, auth) => {
  state.user.auth = auth.concat('欢迎使用')
  state.user.hasAuth = true
}
// 设置导航菜单
const SET_SIDE_NAV = (state, nav) => {
  // 导航菜单
  let _nav = [{
    name: '欢迎使用',
    url: '/main',
    iconCls: 'fa fa-bookmark'
  }]
  // 权限菜单对应的路由地址
    /**
   * '演示菜单': {iconCls: 'fa fa-archive', url: ''},
   * 'Admin/Demo/list': {iconCls: '', url: '/demo/list'},
   */
  const route = {
    '演示菜单': {
      iconCls: 'fa fa-archive',
      url: ''
    },
    'Admin/Demo/list': {
      iconCls: '',
      url: '/demo/list'
    },
    '演示菜单1': {
      iconCls: 'fa fa-archive',
      url: ''
    },
    'Admin/Demo1/list': {
      iconCls: '',
      url: '/demo1/list'
    }
  }
  for (let key in nav) {
    let item = nav[key]
    let _temp = {}
    let subItems = [] // 二级菜单临时数组
    if (item.children && item.children.length > 0) {
      // 二级菜单
      item.children.forEach(subItem => {
        // 防止因无菜单导致的错误
        if (route[subItem.url] !== undefined) {
          subItems.push(Object.assign({}, {
            name: subItem.name || '',
            url: route[subItem.url].url || '',
            iconCls: route[subItem.url].iconCls || ''
          }))
        }
      })
      // 一级菜单
      // 防止因无菜单导致的错误
      if (route[item.name] !== undefined) {
        _temp = Object.assign({}, {
          name: item.name || '',
          url: item.url || '',
          iconCls: route[item.name].iconCls || '',
          children: subItems.slice(0)
        })
        _nav.push(_temp)
      }
    }
  }
  state.nav = _nav
}

const INCREASE_TAG = (state, tagObj) => {
  state.pageOpenedList.splice(1, 0, tagObj)
}

const REMOVE_TAG = (state, name) => {
  state.pageOpenedList.map((item, index) => {
    if (item.path === name) {
      state.pageOpenedList.splice(index, 1)
    }
  })
}

const MOVE_TO_SECOND = (state, index) => {
  let openedPage = state.pageOpenedList[index]
  state.pageOpenedList.splice(index, 1)
  state.pageOpenedList.splice(1, 0, openedPage)
  sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
}

const SET_OPENED_LIST = (state) => {
  state.pageOpenedList = sessionStorage.pageOpenedList ? JSON.parse(sessionStorage.pageOpenedList) : [{
    name: '欢迎使用',
    path: '/main'
  }]
}

const CLEAR_OPENED_LIST = (state) => {
  state.pageOpenedList = [{
    name: '欢迎使用',
    path: '/main'
  }]
  sessionStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList) // 本地存储已打开页面
}

const SET_CURRENT_TITLE = (state, title) => {
  state.currentTitle = title
}

export default {
  LOGIN_OUT,
  LOGIN_SUCCESS,

  SET_USER_INFO,
  SET_USER_AUTH,
  SET_SIDE_NAV,
  CLEAR_AUTH_MENU,

  INCREASE_TAG,
  REMOVE_TAG,
  MOVE_TO_SECOND,
  SET_OPENED_LIST,
  CLEAR_OPENED_LIST,
  SET_CURRENT_TITLE
}
