<template>
  <div class="container">
    <div>
          <!-- <el-avatar size="large" :src="circleUrl"></el-avatar> -->
    </div>
    欢迎{{userInfo.username}}登录CRM后台管理系统
  </div>
</template>
<script>
export default {
  name: 'sysindex',
  data () {
    return {
      userInfo: {},
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  },
  created () {
    // 创建组件后就会执行 页面还没被渲染的时候
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  height: 100%;
  text-align: center;
  // line-height: ;
  padding-top: 200px;
  font-size: 48px;
  color: rgb(34, 10, 14);
}
</style>
