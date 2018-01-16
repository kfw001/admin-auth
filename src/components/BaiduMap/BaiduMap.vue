<template>
  <div class="i-baidu-map">
    <el-row style="margin-top: 10px;">
      <el-col :span="24">
        <el-button @click="display = !display">{{ !display ? '调用' : '关闭' }}百度地图查询</el-button>
      </el-col>
    </el-row>
    <div class="map" style="margin-top: 10px;" v-if="display">
      <el-input placeholder="请输入内容" v-model="keyword">
        <template slot="prepend">关键字</template>
      </el-input>
      <baidu-map class="bm-view" style="width: 100%; height: 400px;margin-top: 10px;"
                 :center="{lng: longitude, lat: latitude}" :zoom="15"
                 :scroll-wheel-zoom="true">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-view style="width: 100%; height: 400px;margin-top: 10px;"></bm-view>
        <bm-context-menu>
          <bm-context-menu-item :callback="locationSuccess" text="使用此位置"></bm-context-menu-item>
        </bm-context-menu>
        <bm-marker :position="{lng: longitude, lat: latitude}"
                   :dragging="true"
                   @dragend="locationSuccess"></bm-marker>
        <bm-local-search :keyword="keyword"
                         :auto-viewport="true"
                         :panel="false"
                         @infohtmlset="locationSuccess"></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>

<script>
  /**
   * 百度地图组件
   *
   * 1. 引入 components, 设置组件别名 'i-baidu-map'
   * 2. 传入参数 :lng="" :lat="" 经度，纬度 type="" 针对哪个表单
   * 3. 触发事件，@success="locationSuccess"
   * Demo
   *

   <i-baidu-map type="addForm" :lng="" :lat="" @success="locationSuccess"></i-baidu-map>

   import BaiduMap from '@/components/BaiduMap';

   components: {
    'i-baidu-map': BaiduMap
   }

   locationSuccess(data) {
     this[data.type].longitude = data.lng;
     this[data.type].latitude = data.lat;
   },

   */

  export default {
    name: 'baiduMap',
    props: {
      lat: {
        type: Number,
        default: 0
      },
      lng: {
        type: Number,
        default: 0
      },
      type: {
        type: String
      }
    },
    data () {
      return {
        display: false,
        keyword: '',
        latitude: this.lat,
        longitude: this.lng
      }
    },
    watch: {
      lat (val) {
        this.latitude = val
      },
      lng (val) {
        this.longitude = val
      }
    },
    methods: {
      locationSuccess (data) {
        const {lat, lng} = data.point
        this.latitude = lat
        this.longitude = lng
        this.$emit('success', {
          lat: this.latitude,
          lng: this.longitude,
          type: this.type
        })
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    position: relative;
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 178px;
    min-height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    display: block;
    max-width: 200px;
  }
</style>
