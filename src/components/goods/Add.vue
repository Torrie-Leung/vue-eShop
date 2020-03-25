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
      <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
      class="add-ruleForm"
      label-position="top"
      >
        <el-tabs
        :tab-position="tabPosition"
        class="list_tab"
        v-model="activeStepIdx">
          <el-tab-pane label="brief" name="0">
            <el-form-item label="Name" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="Price" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="Weight" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="Number" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="param" name="1">item param</el-tab-pane>
          <el-tab-pane label="attr" name="2">item attribution</el-tab-pane>
          <el-tab-pane label="pic" name="3">item pictures</el-tab-pane>
          <el-tab-pane label="content" name="4">item content</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {
      activeStepIdx: '0',
      tabPosition: 'left',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        pics: ''
      },
      addFormRules: {
        goods_name: [
          { required: true, message: 'please input item\'s name', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: 'please input item\'s price', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: 'please input item\'s weight', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: 'please input item\'s number', trigger: 'blur' }
        ]
      }
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
