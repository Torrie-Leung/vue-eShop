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
          <el-button type="primary" @click="addCateDialogVisible = true">Add Category</el-button>
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

        <!-- template of validation -->
        <template v-slot:operation>
          <el-button type="primary" icon="el-icon-edit" size="mini">Edit</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteCateDialog = true" size="mini">Delete</el-button>
        </template>
      </tree-table>
      <!-- pagination -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        layout="total,prev, pager, next,jumper"
        :total="totalPages"
        :page-size="queryInfo.pagesize">
      </el-pagination>
    </el-card>
    <!-- add category dialog -->
    <el-dialog
      title="Confirmation"
      :visible.sync="addCateDialogVisible"
      width="40%"
      close-on-click-modal
    >
      <!-- notification content -->
      <span>You're gonna add a new category.</span>
      <el-form :model="newCate" ref="newCateRef" :rules="newCateRules">
        <el-form-item label="Cate Name" prop="cat_name">
          <el-input v-model="newCate.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="Cate Class"></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">Cancel</el-button>
        <el-button type="primary">Confirm</el-button>
      </span>
    </el-dialog>
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
        },
        {
          label: 'OPERATION',
          type: 'template',
          template: 'operation'
        }
      ],
      deleteCateDialog: false,
      addCateDialogVisible: false,
      newCate: {
        cat_name: '',
        // default root cate
        cat_pid: 0,
        // default cate class
        cat_level: 0
      },
      newCateRules: {
        cat_name: [
          { required: true, message: 'please input category name', trigger: 'blur' }
        ]
      }
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
      this.cateList = res.data.result
      this.totalPages = res.data.total
    },
    handleSizeChange (newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getCateList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    }
  }
}
</script>

<style lang="less" scoped>
.zk-table__cell-inner i{
  font-size: 1.5rem;
  vertical-align: middle !important;
}
</style>
