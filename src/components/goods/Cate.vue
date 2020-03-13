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
      <tree-table
      :data="cateList"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      :show-index="true"
      index-text="#"
      border
      >
        <!-- template of validation -->
        <!-- discarded by vue 3.0 -->
        <!-- <template slot="isOK" slot-scope="scope">
          <i
          :class="[!scope.row.cat_deleted ? 'el-icon-success': 'el-icon-error']"
          :style="{ color: !scope.row.cat_deleted ? 'lightgreen': 'red'}"></i>
        </template> -->
        <!--supported by vue 3.0  -->
        <template v-slot:isOK= "scope">
          <i
          :class="[!scope.row.cat_deleted ? 'el-icon-success': 'el-icon-error']"
          :style="{ color: !scope.row.cat_deleted ? 'lightgreen': 'red'}"></i>
        </template>

        <!-- template of validation -->
        <template v-slot:order= "scope">
          <el-tag v-if="scope.row.cat_level === 0" >1st</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 1" type="warning">2nd</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 2" type="success">3rd</el-tag>
        </template>
      </tree-table>
      <!-- pagination -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalPages"
        :page-size="queryInfo.pagesize">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Cate',
  data() {
    return {
      cateList: [],
      // query condition
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      totalPages: 0,
      // define table columns
      columns: [
        {
          label: 'CATE_NAME',
          prop: 'cat_name'
        },
        {
          label: 'VALIDATION',
          // define template type
          type: 'template',
          // define template name
          template: 'isOK'
        },
        {
          label: 'ORDER',
          // define template type
          type: 'template',
          // define template name
          template: 'order'
        }
      ]
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        this.$message.error('Failed to get category list.')
      }
      console.log(res.data)
      this.cateList = res.data.result
      this.totalPages = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>

</style>
