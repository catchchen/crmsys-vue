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
        <span>品名：</span>
        <el-input
          size="small"
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          v-model="searchForm.productName">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input
          size="small"
          placeholder="请输入商品分类"
          prefix-icon="el-icon-search"
          v-model="searchForm.productCate">
        </el-input>
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
        <el-button type="primary">搜索</el-button>
        <el-button type="success">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 添加商品 -->
    <!-- 表格 -->
     <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="品名"
      width="180px">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="num"
      label="库存"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="publish"
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
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="35">
    </el-pagination>
  </el-card>
  </div>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
      tableData: [{
        name: '三星 Note II (N7100)',
        price: 3000,
        category: '手机',
        num: 183,
        publish: '2016-05-03',
        desc: '超长待机，更多色彩！'
      },
      {
        name: '三星 SCH-W899 ',
        price: 3500,
        category: '手机',
        num: 783,
        publish: '2016-05-03',
        desc: '下单赠12000毫安移动电源'
      },
      {
        name: '飞利浦 老人手机 (X2560) ',
        price: 1200,
        category: '手机',
        num: 143,
        publish: '2016-05-03',
        desc: '孝敬爸妈首选，大按键 大喇叭'
      },
      {
        name: '联想 MA388 老人手机',
        price: 800,
        category: '手机',
        num: 1183,
        publish: '2016-05-03',
        desc: '利浦简单健康老人手机！'
      },
      {
        name: '华为 P6 (P6-C00) ',
        price: 5000,
        category: '手机',
        num: 1830,
        publish: '2016-05-03',
        desc: '经典旗舰！雅然天成纤薄之美，强悍四核，前置500万美颜自拍'
      }],
      searchForm: {
        productName: '',
        productCate: '',
        productPrice: ''
      }
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
