<template>
  <div class="container">
  原密码：
    <el-input v-model="editFormData.password" placeholder="请输入密码"></el-input>
  新密码：
    <el-input v-model="editFormData.newPassword" placeholder="请输入新密码"></el-input>
  确认密码：
    <el-input v-model="reNewPassword" placeholder="请确认新密码"></el-input>
    <el-button @click="submit" value="提交">提 交</el-button>
    <el-button @click="cancel" value="取消">取 消</el-button>
  </div>
</template>
<script>
export default {
  name: 'editPassword',
  data () {
    return {
      userInfo: {},

      editFormData: {
        uid: 0,
        password: '',
        newPassword: ''
      },
      reNewPassword: ''
    }
  },
  methods: {
    submit () {
      if (this.editFormData.newPassword !== this.reNewPassword) {
        this.$message({
          type: 'error',
          message: '两次输入的密码不一致'
        })
      } else {
        this.userInfo = localStorage.getItem('userInfo')
        this.editFormData.uid = JSON.parse(this.userInfo).uid
        // this.editFormData.password = this.userInfo.password
        // console.log(this.userInfo)
        this.$axios.post('/api/editPassword', this.editFormData).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.push({
              path: '/'
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      }
    },
    cancel () {
      // d
    }
  }
}
</script>
<style lang="less" scoped>
    .container{
      height: 100%;
      .el-input {
        padding-top: 20px;
      }
      .el-button {
        margin: 20px 20px;
      }
      }
</style>
