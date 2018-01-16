# 快房传媒后台管理系统（带权限版）

## 代码风格

本项目遵循 [`Javascript Standard Style`](https://standardjs.com/readme-zhcn.html)

## 目录结构

```
.
├── README.md                        # 说明文档
├── build                            # webpack 配置文件
│   ├── build.js                     
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config                           # 项目主配置文件
│   ├── dev.env.js
│   ├── index.js                     # 用于调试端口修改及发布路径修改
│   └── prod.env.js
├── index.html                       # 页面入口
├── package.json                     # 构建项目所需的命令及依赖
├── src
│   ├── App.vue                      # app 主组件
│   ├── assets                       # 模块静态资源（可被 webpack 打包）
│   │   └──  images                  # 图片资源 
│   │       ├── loggeduser.png
│   │       └── logo.png
│   ├── components
│   │   ├── BaiduMap                 # 百度地图
│   │   │   └── BaiduMap.vue
│   │   ├── MutiUploader             # 多个图片上传
│   │   │   └── MutiUploader.vue
│   │   ├── UEditor                  # UEditor 富文本编辑器
│   │   │   └── UEditor.vue
│   │   ├── Uploader                 # 单个图片上传
│   │   │   └── Uploader.vue
│   │   └── openedPageTags           # 已打开标签组件
│   │       └── openedPageTags.vue
│   ├── configs                      # 项目配置文件 
│   │   ├── api.js                   # 接口
│   │   └── index.js
│   ├── main.js                      # app 入口文件
│   ├── plugins                      # 项目插件
│   │   ├── axios                    # Ajax 请求 
│   │   │   ├── fn
│   │   │   │   ├── config.js        # axios 相关配置
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── fastclick                # 移动端防止点击穿透 
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── router                   # Vue Router
│   │   │   ├── index.js
│   │   │   └── routes
│   │   │       └── index.js
│   │   ├── store                    # Vuex
│   │   │   ├── actions
│   │   │   │   ├── data.js
│   │   │   │   └── index.js
│   │   │   ├── getters
│   │   │   │   └── index.js
│   │   │   ├── index.js
│   │   │   ├── mutations
│   │   │   │   └── index.js
│   │   │   └── state
│   │   │       └── index.js
│   │   ├── tree-grid                # 树形表格 
│   │   │   └── index.js
│   │   └── vue-baidu-map            # 百度地图 
│   │       └── index.js
│   ├── styles                       # 通用样式
│   │   └── vars.scss
│   ├── utils                        # 通用工具函数
│   │   └── js
│   │       └── index.js
│   └── views                        # 后台页面文件
│       ├── Login                    # 登录页
│       │   ├── Login.css
│       │   ├── Login.scss
│       │   └── Login.vue
│       ├── Main                     # 主页面框架
│       │   ├── Main.scss
│       │   └── Main.vue
│       └── Welcome                  # 欢迎界面
│           ├── Welcome.scss
│           └── Welcome.vue
├── static                           # 静态资源（不被 webpack 处理）
│   └── ueditor                      # UEditor 库
│       ├── ...
├── .babelrc                         # babel 配置
├── .editorconfig                    # 缩进, 空格/Tab 以及相类似的编辑器的配置
├── .eslintrc.js                     # eslint 配置
├── .eslintignore                    # eslint 忽略规则
├── .gitignore                       # git 忽略文件或文件夹配置
├── .postcssrc.js                    # postcss 配置
└── package-lock.json                # npm 安装依赖后存在的文件

```


## 本地调试

### 跨域代理
更改 `config/index.js` 中 `proxyTable` 的地址为测试API的地址即可。
```
proxyTable: {
      '/api': {
        // 本地调试API地址
        target: 'http://api.mtd.kfw001.com', // 将 http://api.mtd.kfw001.com 修改为项目测试机接口请求地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/Admin' // `/Admin` 为 模块名
        }
      }
    },
```
### 接口地址
更改 `src/config/api.js` 中的地址。

```
const baseUrl = systems.debug ? '/api/' : 'http://api.kfw001.com/'

// 将 http://api.kfw001.com/ 替换为项目正式上线的接口地址
```

## 菜单及路由配置

> 由于本模板需要权限校验，所以菜单和路由设置略复杂。为了方便本地调试，`src/plugins/store/actions/index.js` 文件中 `getUserAuth` 方法里请将 `// for test mock` 下方代码注释，并开启上方 `// for server` 下的代码。

### 路由设置

> 用户在访问路由前，都会判断并请求服务器的权限数据接口，返回两个字段，一个是 `auth` 一个是 `nav`。

路由中需配置 `meta` 字段

```
meta: {requiresAuth: true, alias: 'Admin/Demo/list'}
```

`alias` 对应了接口返回的 `auth` 中的内容，`requiresAuth` 设置是否需要鉴权。

设置 `src/plugins/store/state/index.js` 的 `nav` 字段。

每一个菜单一个路由，路由中不分一级二级菜单。

数据格式要求：
```
  {
    path: '/demo',
    component: Main,
    name: '演示菜单',
    children: [
      {
        path: 'list',
        component: () => import('@/views/Model/List.vue'),
        name: '菜单列表',
        meta: {requiresAuth: true, alias: 'Admin/Demo/list'}
      },
      {
        path: 'list/edit/:id',
        component: () => import('@/views/Model/Edit.vue'),
        name: '菜单编辑',
        meta: {requiresAuth: true, alias: 'Admin/Demo/list'}
      },
      {
        path: 'list/add',
        component: () => import('@/views/Model/Add.vue'),
        name: '菜单新增',
        meta: {requiresAuth: true, alias: 'Admin/Demo/list'}
      }
    ]
  },
```

### 左侧菜单设置

需配置 `/src/plugins/store/mutations/index.js` 中 `SET_SIDE_NAV` 里面 `route` 对象。

格式要求如下：
```
    // 对应菜单的一级菜单
    '演示菜单': {  
      iconCls: 'fa fa-archive', // 一级菜单图标
      url: ''
    },
    // 对应菜单的二级菜单，为了方便管理，请一级下方放置二级
    'Admin/Demo/list': {
      iconCls: '',
      url: '/demo/list' // 二级菜单跳转url，对应路由的地址
    },
```

## 测试、部署说明

### 开发调试
``` bash
# 安装依赖
npm install 或 yarn

# 本地调试 localhost:8080
npm run dev
```

### 上线部署

```
# 构建部署
npm run build
```

> 发布目录 `/`

了解更加详细的 webpack 工作原理，请浏览 [guide](http://vuejs-templates.github.io/webpack/) 和 [docs for vue-loader](http://vuejs.github.io/vue-loader).

