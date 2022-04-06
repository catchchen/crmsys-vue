<template>
<div>
  <el-form ref="form" :model="loginForm" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
     <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'test',
  components: {
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // 跳转到home页
      const { username, password } = this.loginForm
      if (username === 'admin' && password === '123') {
        this.$router.push('/')
      }
    },
    // 重置：清空表单内容
    reset () {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  background-color: #34495e;
  height: 100%;
  padding-top: 1px;
  box-sizing: border-box;

.el-form {
    width: 300px;
    margin: 100px auto;
    background-color: #fff;
    padding: 40px 40px 10px 0;
    border-radius: 15px;
    margin-top: 300px;
  }
}
</style>
