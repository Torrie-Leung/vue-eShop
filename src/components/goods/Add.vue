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
        v-model="activeStepIdx"
        :before-leave="validateTabsChange"
        @tab-click="tabClicked">
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
            <el-form-item label="Category" prop="goods_cat">
              <el-cascader
              v-model="addForm.goods_cat"
              :options="cateList"
              :props="cateProps"
              @change="handleCateChange"
              expand-trigger="hover"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="param" name="1">
            <!-- rendering item -->
            <el-form-item
            :label="item.attr_name"
            v-for="item in manyTable"
            :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                border
                :label="check"
                v-for="(check, i) in item.attr_vals"
                :key="i"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
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
        goods_cat: []
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
        ],
        goods_cat: [
          { required: true, message: 'please input item\'s category', trigger: 'blur' }
        ]
      },
      cateList: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      manyTable: []
    }
  },
  created () {
    this.getCateList()
  },
  mounted () {
    setInterval(function() {
      document.querySelectorAll('.el-cascader-node__label').forEach(el => {
        el.onclick = function() {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('failed to get categories.')
      this.cateList = res.data
      console.log(this.cateList)
    },
    handleCateChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    validateTabsChange(activeName, oldActiveName) {
      // console.log('go to-', activeName, 'from-', oldActiveName)
      if (oldActiveName === 0 && this.addForm.goods_cat.length !== 3) {
        this.$message.info('please select category first.')
        return false
      }
    },
    async tabClicked() {
      // console.log(this.activeStepIdx)
      if (this.activeStepIdx === '1') {
        console.log(this.addForm.goods_cat[2])
        const { data: res } = await this.$http.get(`categories/${this.cate_id}/attributes`, { params: { sel: 'many' } })
        if (res.meta.status !== 200) return this.$message.error('failed to get dynamic attrs')
        // change string to array
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',')
        })
        this.manyTable = res.data
        console.log(this.manyTable)
      } else if (this.activeStepIdx === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cate_id}/attributes`, { params: { sel: 'only' } })
        if (res.meta.status !== 200) return this.$message.error('failed to get dynamic attrs')
        console.log(res)
      }
    }
  },
  computed: {
    cate_id() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      } else {
        return null
      }
    }
  }
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
