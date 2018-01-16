<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  body,
  html {
    min-width: 768px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    color: #333;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #e4e7ea;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  div.el-loading-mask {
    z-index: 900;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0;
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
