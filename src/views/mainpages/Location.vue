<template>
  <div id="appp">
  </div>
</template>

<script>
export default {
  name: 'location',
  data () {
    return {
    }
  },
  methods: {
    // 地图初始化函数，本例取名为init，开发者可根据实际情况定义
    initMap () {
    // 定义地图中心点坐标
      var center = new window.TMap.LatLng(39.984120, 116.307484)
      // 定义map变量，调用 TMap.Map() 构造函数创建地图
      var map = new window.TMap.Map(document.getElementById('appp'), {
        center: center, // 设置地图中心点坐标
        zoom: 17.2, // 设置地图缩放级别
        pitch: 43.5, // 设置俯仰角
        rotation: 45 // 设置地图旋转角度
      })
      console.log(map)
      console.log(window)
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>
<style lang="less" scoped>
    .container{color: burlywood;height: 100%; width: 100%;}
</style>
