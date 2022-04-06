<template>
  <div class="container">
    <!-- 导航 -->
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/product">商品管理</a></el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="6">
        <!-- <span>商品名：</span> -->
        <el-input
          size="small"
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          v-model="searchForm.productName">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchForm.productCate" placeholder="请选择分类">
          <el-option
            v-for="item in categroyList"
            :key="item.cid"
            :label="item.cateName"
            :value="item.cateName">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input
          size="small"
          placeholder="请输入商品价格"
          prefix-icon="el-icon-search"
          v-model="searchForm.productPrice">
        </el-input>
      </el-col>
      <el-col :span="6" class="opt">
        <el-button type="primary" @click="searchProduct">搜索</el-button>
        <el-button type="warn" @click="reset">重置</el-button>
        <el-button type="success" @click="add">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- Product list 表单  -->
     <el-table
      ref="multipleTable"
      :data="productList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="title"
      label="商品名称"
      width="180px">
    </el-table-column>
    <el-table-column
      label="商品图片"
      width="180px">
      <template slot-scope="scope">
        <el-image :src="scope.row.img" alt="图片" />
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="cateName"
      label="分类"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="stock"
      label="库存"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="发布日期"
      width="180px">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="商品描述">
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
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([productList[1], productList[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 当前页  -->
  </el-card>
  <!-- 添加商品dialog -->
      <el-dialog title="添加商品" :visible.sync="addProductFormVisible" width="40%">
      <el-form :model="addProductform">
        <el-form-item label="商品名称" >
          <el-input v-model="addProductform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" >
          <el-input v-model="addProductform.price" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="规格">
          <el-input v-model="addProductform.specification" placeholder="个/台/件" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="addProductform.stock" placeholder="个/台/件/部" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="addProductform.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProduct">修 改</el-button>
      </div>
      </el-dialog>
<!-- 修改商品的列表 -->
      <el-dialog title="修改商品" :visible.sync="dialogEditFormVisible" width="40%">
      <el-form :model="editProductform">
        <el-form-item label="商品名称" >
          <el-input v-model="editProductform.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select v-model="editProductform.cid" placeholder="请选择商品">
            <el-option
              v-for="item in categroyList"
              :key="item.cid"
              :label="item.cateName"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" >
          <el-input v-model="editProductform.price" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="规格" >
          <el-input v-model="editProductform.specification" autocomplete="off" placeholder="台/部/件"></el-input>
        </el-form-item>
         <el-form-item label="描述" >
          <el-input v-model="editProductform.desc" autocomplete="off" placeholder="请输入商品描述"></el-input>
        </el-form-item>
         <el-form-item label="库存" >
          <el-input v-model="editProductform.stock" autocomplete="off" placeholder="库存"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editProduct">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
      // 控制添加商品显示与隐藏
      addProductFormVisible: false,
      // 控制修改商品显示与隐藏
      dialogEditFormVisible: false,
      // 查询商品的表单
      searchForm: {
        productName: '',
        productCate: '',
        productPrice: null
      },
      // 添加商品的表单
      addProductform: {
        title: '',
        price: '',
        specification: '',
        img: '',
        stock: 100,
        desc: ''
      },
      // 编辑商品的表单
      editProductform: {
        // pid: 0,
        title: '',
        price: '',
        specification: '',
        stock: 100,
        desc: ''
      },
      // 分类列表
      categroyList: [],
      // 商品列表
      productList: [],
      // 页面大小
      pageSize: 5,
      // 当前页面
      currentPage: 1,
      // 商品总数
      total: 5
      // url: this.productList.img
    }
  },
  // 生命周期钩子函数 页面渲染之前获取页面内的数据
  created () {
    this.getProductList()
    this.getCategories()
  },
  methods: {
    getProductList () {
      this.$axios.get('/api/products', {
        params: {
          productName: this.searchForm.productName,
          productCate: this.searchForm.productCate,
          productPrice: this.searchForm.productPrice,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.total = res.total
        this.productList = res.data
        // console.log(this.productList)
      })
    },
    searchProduct () {
      this.getProductList()
    },
    add () {
      this.addProductFormVisible = true
    },
    addProduct () {
      // 添加商品
      this.addProductFormVisible = true
      this.$axios.post('/api/addProduct', this.addProductform).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          // 隐藏对话框
          this.addProductFormVisible = false
          // 重新加载数据
          // this.get
          this.appProductform = {
          }
          this.getProductList()
        }
      })
    },
    getProduct (productInfo) {
      this.$axios.get('/api/product/' + productInfo.pid).then(res => {
        this.editProductform = res.data
      })
    },
    getCategories () {
      this.$axios.get('/api/categories').then(res => {
        this.categroyList = res.data
      })
    },
    handleEdit (productInfo) {
      console.log(productInfo)
      this.getProduct(productInfo)
      this.dialogEditFormVisible = true
      // d
      // this.$axios.post("/api/editProduct, this.edit)
    },
    editProduct () {
      this.$axios.post('/api/editProduct', this.editProductform).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.dialogEditFormVisible = false
          this.getProductList()
        } else {
          this.$message({
            type: 'info',
            message: '修改失败'
          })
          this.cancel()
        }
      })
    },
    cancel () {
      this.dialogEditFormVisible = false
      this.editProductform = {
        title: '',
        price: '',
        specification: '',
        stock: 100,
        desc: ''
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getProductList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProductList()
    },
    toggleSelection (rows) {
      if (rows) {
        console.log(rows)
        console.log('---------')
        rows.forEach(row => {
          console.log(row)
          // this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange () {},
    reset () {
      this.searchForm = {
        productName: '',
        productCate: '',
        productPrice: 0.0
      }
    },
    handleDelete (productInfo) {
      //
      this.$confirm('您确认删除商品：' + productInfo.title + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行 下面的代码
        this.$axios.get('/api/deleteProduct/' + productInfo.pid).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getProductList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
    .container{
      .el-breadcrumb{
        padding-bottom: 30px;
        // border-bottom: 3px solid #e5e5e5;
      }
      .el-pagination{
        margin-top: 40px;
        text-align: right;
      }
        .el-col{
          padding: 0 30px 0 0;
        }
    }
</style>
