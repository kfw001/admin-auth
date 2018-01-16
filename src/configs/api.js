import systems from '@/configs'

const baseUrl = systems.debug ? '/api/' : 'http://api.kfw001.com/'
export default {
  // 接口请求baseUrl
  baseUrl: baseUrl,
  // 接口文档地址
  // document:
  api: {
    // 公共接口
    imageUpload: 'Uploadlocal/image', // 文件上传
    sysinfoProvince: 'Sysinfo/province', // 省市级三级联动
    sysinfoCity: 'Sysinfo/city', // 省市级三级联动
    sysinfoZone: 'Sysinfo/zone', // 省市级三级联动
    adminMenu: 'admin/menu', // 用户权限
    login: 'Login/login', // 登录接口
    logout: 'Login/logout', // 退出接口
    code: 'Login/code', // 二维码生成接口
    personData: 'Personal/data' // 个人资料接口

  }
}
