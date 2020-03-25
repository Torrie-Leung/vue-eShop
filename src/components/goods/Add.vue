<template>
  <div>
    <h3>New good item form</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/goods'}">Goods List</el-breadcrumb-item>
      <el-breadcrumb-item>New Item</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card>
      <el-alert
        title="警告提示的文案"
        type="info"
        center
        show-icon
        :closable="false">
      </el-alert>
      <!-- steps -->
      <el-steps :space="200" :active="1" finish-status="success" class="process_step">
        <el-step title="info"></el-step>
        <el-step title="param"></el-step>
        <el-step title="attributes"></el-step>
        <el-step title="pic"></el-step>
        <el-step title="content"></el-step>
        <el-step title="completed"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less">
.process_step{
  margin: 10px 5px;
  .el-step__main{
    font-size: 13px;
    .el-step__title{
      font-size: 13px;
    }
  }
}
</style>
