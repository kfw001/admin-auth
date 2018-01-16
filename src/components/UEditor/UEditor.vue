<template>
  <div class="editor-container"><script :id="id" type="text/plain"></script></div>
</template>

<script>
  /**
   * 百度富文本编辑器 使用说明
   * 获取富文本内容使用 this.$refs.UE.getContent() 方法
   *
   *
   *
   * 上线前需修改 static/ueditor/ueditor.config.js 文件中的
   * serverUrl 和 window.UEDITOR_HOME_URL
   */
  // 主体文件引入
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all'
  import '../../../static/ueditor/ueditor.all.min.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

  export default {
    name: 'UE',
    data () {
      return {
        // 每个编辑器生成不同的id,以防止冲突
        id: 'editor_' + (Math.random() * 100000000000000000),
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    watch: {
      defaultMsg (val, oldVal) {
        // eslint-disable-next-line
        this.editor = UE.getEditor(this.id, this.config) // 初始化UE
        if (val !== null) {
          this.editor.ready(function () {
            this.setContent(val) // 确保UE加载完成后，放入内容。
          })
        }
      }
    },
    mounted () {
      const _this = this
      // eslint-disable-next-line
      this.editor = UE.getEditor(this.id, this.config) // 初始化UE
      this.editor.ready(function () {
        this.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
      })
    },
    methods: {
      // 获取内容方法
      getUEContent () {
        return this.editor.getContent()
      }
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>
<style>
  .editor-container {
    line-height: 16px;
  }
</style>
