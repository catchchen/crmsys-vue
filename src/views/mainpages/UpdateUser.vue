<template lang="">
  <div class="container">
    <el-form :model="updateUserform">
        <el-form-item label="用户名" >
          <el-input v-model="updateUserform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="updateUserform.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="电话" >
          <el-input v-model="updateUserform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="updateUserform.did" placeholder="请选择部门">
            <el-option
              v-for="item in deptList"
              :key="item.did"
              :label="item.deptName"
              :value="item.did">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="updateUser">修 改</el-button>
      </div>
  </div>
</template>
<script>
export default {
  name: 'updateUser',
  data () {
    return {
      updateUserform: {
        username: '',
        email: '',
        phone: '',
        did: 0,
        uid: 0
      },
      deptList: []
    }
  },
  created () {
    this.getUserInfo()
    // console.log(this.userInfo)
    this.getDeptList()
  },
  methods: {
    updateUser () {
      this.$axios.post('/api/editUser', this.updateUserform).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
      })
    },
    getUserInfo () {
      this.$axios.get('/api/getUser/' + this.$route.params.id).then(res => {
        // this.updateUserform = res.data
        this.updateUserform.username = res.data.username
        this.updateUserform.email = res.data.email
        this.updateUserform.phone = res.data.phone
        this.updateUserform.did = res.data.did
        this.updateUserform.uid = res.data.uid
      })
    },
    // 获取部门数据
    getDeptList () {
      this.$axios.get('/api/depts').then(res => {
      // console.log(res)
        this.deptList = res.data
        console.log(this.deptList)
      })
    }
  }

}
</script>
<style lang="">
</style>
