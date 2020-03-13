<template>
  <div>
    <h3>Goods Category</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Category List</el-breadcrumb-item>
      <el-breadcrumb-item>Categories</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card>
      <!-- button -->
      <el-row>
        <el-col>
          <el-button type="primary">Add Category</el-button>
        </el-col>
      </el-row>
      <!-- table -->
      <el-table></el-table>
      <!-- pagination -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Cate',
  data() {
    return {
      cateList: []
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        type: 3,
        pagenum: 1,
        pagesize: 5
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
