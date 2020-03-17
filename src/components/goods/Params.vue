<template>
  <div>
    <h3>Goods Params</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Goods Params List</el-breadcrumb-item>
      <el-breadcrumb-item>Goods Params</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card>
      <el-alert
        title="Caution: Only 3rd class category can be added params."
        type="warning"
        :closable="false"
        show-icon>
      </el-alert>
      <!-- choose good cates -->
      <el-row class="cates_option">
        <span>Choose good category: </span>
        <el-cascader
          clearable
          :options="cateList"
          :props="cateProps"
          change-on-select
          expand-trigger="hover"></el-cascader>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Params',
  data() {
    return {
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
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
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('Failed to get category list.')
      this.cateList = res.data
      console.log(this.cateList)
    }
  }
}
</script>

<style lang="less" scoped>
.cates_option{
  margin: 15px;
}
</style>
