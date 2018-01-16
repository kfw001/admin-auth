<template>
  <transition-group name="taglist-moving-animation">
    <el-tag
      v-for="(item, index) in pageTagsList"
      :key="item.path"
      :name="item.name"
      @close.stop="closePage(item.path)"
      @click.native="linkTo(item.path)"
      :closable="item.path!=='/main'"
      :type="matchPath(item.path)?'primary':'gray'">
      {{item.name}}
    </el-tag>
  </transition-group>
</template>

<script>
  /*
  * @Author: 52admln (ismrwang@gmail.com)
  * @Date: 2017/11/8 下午4:46
  * @Description: null
  */
  export default {
    name: 'tagsPageOpened',
    data () {
      return {
        currentPageName: this.$route.path
      }
    },
    props: {
      pageTagsList: Array
    },
    methods: {
      matchPath (path) {
        return this.$route.path.match(path) !== null
      },
      closePage (name) {
        this.$store.commit('REMOVE_TAG', name)
        sessionStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList)
        if (this.$route.path.match(name) !== null) {
          let lastPageName = ''
          if (this.$store.state.pageOpenedList.length > 1) {
            lastPageName = this.$store.state.pageOpenedList[1].path
          } else {
            lastPageName = this.$store.state.pageOpenedList[0].path
          }
          this.$router.push({
            path: lastPageName
          })
        }
      },
      linkTo (name) {
        this.$router.push({
          path: name
        })
      }
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.path
      }
    }
  }
</script>

<style lang="scss">
</style>
