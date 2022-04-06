<template>
  <div class="container">
      <!-- 导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/addUser">添加用户</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面版 -->
    <el-card>
        <!-- 搜索框 -->
        <el-row :gutter="10">
            <el-col :span="4">
                <el-input size="small" v-model="searchName" placeholder="请输入姓名"></el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="searchDid" placeholder="请选择部门">
                <el-option :label="不选择" :value="null" checked></el-option>
                <el-option
                  v-for="item in deptList"
                  :key="item.did"
                  :label="item.deptName"
                  :value="item.did">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-button size="small" type="primary" @click="search">搜索</el-button>
              <el-button size="small" type="success" @click="dialogFormVisible = true">添加</el-button>
            </el-col>
            <el-col :span="8"></el-col>
        </el-row>
        <!-- 表格 -->
    <el-table
    :data="userData"
    style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        label="#">
      </el-table-column>
      <el-table-column
        label="用户名"
        width="180"
        prop="username">
      </el-table-column>
    <el-table-column
      label="邮箱"
      width="210"
      prop="email">
      <!-- <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template> -->
    </el-table-column>

    <el-table-column
      label="手机号"
      width="180"
      prop="phone">
    </el-table-column>
    <el-table-column
      label="部门名称"
      width="180"
      prop="deptName">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <!-- 分页 一页显示五条数据 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
      </el-card>
<!-- 添加用户的对话框 表单 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="addUserform">
        <el-form-item label="用户名" >
          <el-input v-model="addUserform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="addUserform.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="电话" >
          <el-input v-model="addUserform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="addUserform.did" placeholder="请选择部门">
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
        <el-button @click="concle">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户的对话框 表单 -->
    <el-dialog title="修改用户" :visible.sync="dialogEditFormVisible" width="40%">
      <el-form :model="addUserform">
        <el-form-item label="用户名" >
          <el-input v-model="editUserform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="editUserform.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="电话" >
          <el-input v-model="editUserform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="editUserform.did" placeholder="请选择部门">
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
        <el-button @click="this.dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addUser',
  data () {
    return {
      // 搜索框中的用户名
      searchName: '',
      // 搜索部门
      searchDid: null,
      // 部门列表数据
      deptList: [],
      // 用户列表数据
      userData: [],
      // 控制添加用户表单 显示
      dialogFormVisible: false,
      // 控制编辑用户表单
      dialogEditFormVisible: false,
      // 添加用户表单
      addUserform: {
        username: '',
        email: '',
        phone: '',
        did: ''
      },
      // 编辑用户表单 回写数据和 发送数据
      editUserform: {
        username: '',
        password: '',
        email: '',
        phone: '',
        did: 0
      },
      // 分页数据总条数
      total: 0,
      // 每页数据的条数
      pageSize: 5,
      // 分页数据的当前页
      currentPage: 1
    }
  },
  // 生命周期钩子函数
  created () {
    // 创建之前 请求数据过来 渲染页面
    this.getUserList()
    this.getDeptList()
  },
  methods: {
    // 根据条件搜索用户信息
    search () {
      this.getUserList()
    },
    // 获取部门数据
    getDeptList () {
      this.$axios.get('/api/depts').then(res => {
        // console.log(res)
        this.deptList = res.data
      })
    },
    // 获取部门数据
    getUserList () {
      this.$axios.get('/api/users', {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          username: this.searchName,
          did: this.searchDid
        }
      }).then(res => {
        this.total = res.total
        this.userData = res.data
      })
    },
    getUser (uid) {
      // 拿到用户的数据
      this.$axios.get('/api/getUser/' + uid).then(res => {
        this.editUserform = res.data
      })
    },
    handleEdit (userInfo) {
      // 编辑 用户首先回写数据
    // chenk start
      // this.dialogEditFormVisible = true
      // this.getUser(userInfo.uid)
    // chenk end
      // simo start
      this.$router.push({
        // 实现带参数的跳转
        path: '/updateUser/' + userInfo.uid
      })
      // simo end
    },
    addUser () {
      // this.dialogFormVisible = false
      this.$axios.post('/api/addUser', this.addUserform).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          // 隐藏对话框
          this.dialogFormVisible = false
          // 将输入框重置
          this.concle()
          // 重新加载数据
          this.getUserList()
        }
      })
    },
    editUser () {
      this.$axios.post('/api/editUser', this.editUserform).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          // 隐藏对话框
          this.dialogEditFormVisible = false
          // 重新加载数据
          this.getUserList()
        }
      })
    },
    concle () {
      this.addUserform = {
        username: '',
        email: '',
        phone: '',
        did: ''
      }
      this.dialogFormVisible = false
    },
    handleDelete (userInfo) {
      // console.log(userInfo)
      // 删除
      this.$confirm('您确认删除用户：' + userInfo.username + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行 下面的代码
        this.$axios.get('/api/deleteUser/' + userInfo.uid).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功后，再次调用获取用户列表的方法
            this.getUserList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      // 每页条数变化
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      // 点击页数时此方法被触发
      this.currentPage = val
      this.getUserList()
    }
  }
}
</script>
<style lang="less" scoped>
    .container{
      .el-breadcrumb{
        padding-bottom: 30px;
      }
    }
</style>
