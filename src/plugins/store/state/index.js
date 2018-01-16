// 登录用户信息
const user = {
  name: '', // 用户名
  avatar: '', // 用户头像
  auth: [], // 用户权限
  hasAuth: false // 是否已经加载用户权限
}

const nav = []

// 已打开页面的标签栏
const pageOpenedList = []
const currentTitle = ''

export default {
  user,
  nav,
  pageOpenedList,
  currentTitle
}
