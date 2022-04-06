<template>
<div class="home">
    <el-container>
      <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/sysindex">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
      <el-menu-item index="/addUser">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-menu-item index="/editPassword">
        <i class="el-icon-menu"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
      </el-submenu>
      <el-menu-item index="/customer">
        <i class="el-icon-menu"></i>
        <span slot="title">客户管理</span>
      </el-menu-item>
      <el-menu-item index="/employee">
        <i class="el-icon-document"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="/product">
        <i class="el-icon-setting"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/analyse">
        <i class="el-icon-setting"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
      <el-menu-item index="/location">
        <i class="el-icon-setting"></i>
        <span slot="title">地图位置</span>
      </el-menu-item>
      </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
</div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    handleOpen () {},
    handleClose () {},
    close () {},
    open () {}
  }
}
</script>
<style lang="less" scoped>
.home{
  height: 100%;
  width: 100%;
}
.el-container{
  height: 100%;
    width: 100%;
  .el-aside{
    height: 100%;
    background-color: #545c64;
      width: 100%;
  }
}
</style>
