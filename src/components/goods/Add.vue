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
      <el-steps :space="200" :active="activeStepIdx - 0" finish-status="success" align-center class="process_step">
        <el-step title="info"></el-step>
        <el-step title="param"></el-step>
        <el-step title="attributes"></el-step>
        <el-step title="pic"></el-step>
        <el-step title="content"></el-step>
        <el-step title="completed"></el-step>
      </el-steps>
      <!-- tabs section -->
      <el-tabs
      :tab-position="tabPosition"
      style="height: 200px;"
      class="list_tab"
      v-model="activeStepIdx">
        <el-tab-pane label="brief" name="0">item's brief</el-tab-pane>
        <el-tab-pane label="param" name="1">item param</el-tab-pane>
        <el-tab-pane label="attr" name="2">item attributes</el-tab-pane>
        <el-tab-pane label="pic" name="3">item pictures</el-tab-pane>
        <el-tab-pane label="content" name="4">item content</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {
      activeStepIdx: '0',
      tabPosition: 'left'
    }
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
  .list_tab{
    .el-tabs--left .el-tabs__item.is-left{
      text-align: center;
    }
  }
}
</style>
