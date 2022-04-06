<template>
<div class="container">
    <el-form :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="80px">
      <el-form-item label="账号" prop="username">
        <!-- 不时刻 去监听 -->
        <el-input type="text" v-model.lazy="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <!--  按钮-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过 调用登陆方法
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login () {
      // 编程式路由 <router-link to="/home">
      // var { username, password } = loginForm
      this.$axios.post('/api/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(res => {
        // 将用户信息存储的本地,只能存储字符串
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        // 请求成功 调用then
        // console.log(res)
        if (res.status === 200) {
          // 登陆成功显示 一条消息
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          // 登陆成功跳转页面
          this.$router.push('/home')
        } else {
          // element-ui 消息框
          this.$message({
            message: '登陆失败',
            type: 'error'
          })
        }
        // 不同ip，不同端口号，不同域名，使用ajax发送请求就会发生跨域问题
        // 跨域的解决方式，1.jsonp 老办法 改造前后端  2. cors 配置或注解 后台解决跨域问题，3. 代理方式，前台即可解决问题，或者使用nginx服务器代理
      })
    },
    reset () {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在6到18个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在6到18个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style scoped lang="less">
/*Emelemt UI 的标签名可以直接当类名使用  */
    .container{
      background-color: #309eff;
      height: 625px;
      padding-top: 1px;

      box-sizing: border-box;

      .el-form{
        width: 300px;
        margin: 100px auto;
        background-color: #fff;
        padding: 35px 40px 10px 0;
        border-radius : 10px;
      .el-form-item{
        display: block;
        margin-left: 20px;
        }
      }
      .el-form:last-child{
        text-align: center;
      }
    }
</style>
