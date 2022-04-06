<template>
  <div>
    名称：<el-input></el-input>
    活动区域：<el-input></el-input>
      <el-upload
        class="avatar-uploader"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    <el-button @click="submitForm">添加</el-button>
  </div>
</template>
<script>
export default {
  name: 'custom',
  data () {
    return {
      imageUrl: '',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        imgPath: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.formLabelAlign.imgPath = res.data.imgUrl
    },
    submitForm () {
      console.log(this.formLabelAlign)
    }
  }
}

</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
