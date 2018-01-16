<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed ? '' : sysName}}
      </el-col>
      <el-col :span="14" class="header-bar">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
        <div class="head-nav">
          <!--<strong class="title">{{$route.name}}</strong>-->
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched"
                                :key="item.path" :to="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">
                        <img :src="avatar"/> {{username}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleRedirect('个人资料')">
              个人资料
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleRedirect('个人设置')">
              个人设置
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              注销
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="currentPageName"
                 class="el-menu-vertical-aliyun"
                 :collapse="collapsed"
                 unique-opened>
          <template v-for="(item,index) in nav">
            <!-- 二级菜单 -->
            <el-submenu :index="index+''"
                        v-if="item.children && item.children.length > 0">
              <!-- 二级菜单顶级 -->
              <template slot="title">
                <i :class="['icon',item.iconCls]"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <!-- 二级菜单下级 -->
              <el-menu-item-group style="overflow: hidden">
                <!--<span slot="title">{{item.name}}</span>-->
                <!-- && child.url-->
                <template v-for="child in item.children">
                  <!--无三级菜单-->
                  <el-menu-item
                    :index="child.url"
                    :key="child.url"
                    v-if="!child.children"
                    @click="openTag(child.url, child.name)">
                    {{child.name}}
                  </el-menu-item>
                  <!--有三级菜单-->
                  <el-submenu
                    :index="child.url"
                    :key="child.url"
                    v-if="child.children">
                    <span slot="title">{{child.name}}</span>
                    <el-menu-item v-for="subChild in child.children"
                                  :index="subChild.url"
                                  :key="subChild.url"
                                  @click="openTag(subChild.url, subChild.name)">
                      {{subChild.name}}
                    </el-menu-item>
                  </el-submenu>
                </template>
              </el-menu-item-group>
            </el-submenu>
            <!-- 一级菜单 -->
            <el-menu-item v-if="!item.children"
                          :index="item.url"
                          @click="openTag(item.url, item.name)">
              <i :class="['icon',item.iconCls]"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24">
            <openedPageTags :pageTagsList="pageTagsList" class="opened-page-list"></openedPageTags>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import configs from '@/configs'
  import openedPageTags from '@/components/openedPageTags/openedPageTags'

  const {title} = configs

  export default {
    data () {
      return {
        sysName: title,
        collapsed: false,
        currentPageName: this.$route.path
      }
    },
    computed: {
      username () {
        return this.$store.state.user.name
      },
      avatar () {
        const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
        return reg.test(this.$store.state.user.avatar)
          ? this.$store.state.user.avatar
          : require('@/assets/images/loggeduser.png')
      },
      // 导航菜单
      nav () {
        return this.$store.state.nav
      },
      pageTagsList () {
        return this.$store.state.pageOpenedList // 打开的页面的页面对象
      }
    },
    methods: {
      initTag () {
        this.$store.commit('SET_OPENED_LIST')
      },
      openTag (url, name) {
        //        console.log(url, name);
        // 欢迎页不做任何操作，直接跳转
        if (url !== '/main') {
          let pageOpenedList = this.$store.state.pageOpenedList
          let openedPageLen = pageOpenedList.length
          let i = 0
          let tagHasOpened = false
          while (i < openedPageLen) {
            if (url === pageOpenedList[i].path) {
              // 页面已经打开
              this.$store.commit('MOVE_TO_SECOND', i)
              tagHasOpened = true
              break
            }
            i++
          }
          // 已打开标签，则切换到已有的，否则新增一个
          if (!tagHasOpened) {
            this.$store.commit('INCREASE_TAG', {
              path: url,
              name: name
            })
            sessionStorage.pageOpenedList = JSON.stringify(
              this.$store.state.pageOpenedList
            ) // 本地存储已打开页面
          }
          this.$store.commit('SET_CURRENT_TITLE', url)
        }
        this.$router.push({
          path: url
        })
      },
      // 菜单跳转
      handleRedirect (data) {
        this.$router.push({name: data})
      },
      // 退出登录
      logout () {
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$http.post('logout')
            this.$store.dispatch('loginOut')
            this.$store.commit('CLEAR_AUTH_MENU')
            this.$router.push('/login')
          })
          .catch(() => {})
      },
      // 获取用户信息
      async getUserData () {
        const res = await this.$http.post('personData')
        if (res === null) return
        this.$store.dispatch('setUserInfo', {
          user: res.param.realname,
          avatar: res.param.thumb
        })
      },
      // 折叠导航栏
      collapse () {
        this.collapsed = !this.collapsed
      }
    },
    watch: {
      $route (to) {
        this.currentPageName = to.path
        sessionStorage.currentPageName = to.path
      }
    },
    mounted () {
      this.getUserData()
      this.initTag()
    },
    components: {
      openedPageTags
    }
  }
</script>

<style lang="scss">
  @import "Main";
</style>
