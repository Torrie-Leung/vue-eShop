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
          <el-button type="primary" @click="openCateDialog">Add Category</el-button>
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
        <template v-slot:operation="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCate(scope.row.cat_id)">Edit</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteCate(scope.row.cat_id)" size="mini">Delete</el-button>
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
      @close="addCateDialogClosed"
    >
      <!-- notification content -->
      <span>You're gonna add a new category.</span>
      <el-form :model="newCate" ref="newCateRef" :rules="newCateRules">
        <el-form-item label="Cate Name" prop="cat_name">
          <el-input v-model="newCate.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="Cate Class">
          <!-- options define datasource -->
          <el-cascader
          size="small"
          v-model="selectedKeys"
          :options="parentCateList"
          :props="cascaderProps"
          @change="parentCateChanged"
          clearable
          change-on-select
          expand-trigger="hover"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmNewCate">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- edit category dialog -->
    <el-dialog
      title="Edit Category"
      :visible.sync="editDialogVisible"
      width="40%"
      close-on-click-modal
      @close="editCateDialogClosed">
      <span>You're gonna edit this category.</span>
      <el-form :model="editCateForm" :rules="newCateRules" ref="editCateFormRef">
        <el-form-item label="Category Name" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmEditCateInfo">Confirm</el-button>
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
      },
      parentCateList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedKeys: [],
      editDialogVisible: false,
      editCateForm: {},
      editCateRules: {
        cat_name: [
          { required: true, message: 'please input category name', trigger: 'blur' }
        ]
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
    async getCateList() {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        this.$message.error('Failed to get category list.')
      }
      this.cateList = res.data.result
      this.totalPages = res.data.total
    },
    openCateDialog () {
      this.getParentTreeList()
      this.addCateDialogVisible = true
    },
    handleSizeChange (newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getCateList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    async getParentTreeList () {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) return this.$message.error('Failed to reload parent class list.')
      this.parentCateList = res.data
    },
    parentCateChanged () {
      console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        // parent class id
        this.newCate.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.newCate.cat_level = this.selectedKeys.length
      } else {
        this.newCate.cat_pid = 0
        this.newCate.cat_level = 0
      }
    },
    confirmNewCate () {
      this.$refs.newCateRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('categories', this.newCate)
        if (res.meta.status !== 201) return this.$message.error('Failed to add new category.')
        this.$message.success('new category added.')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    addCateDialogClosed () {
      this.$refs.newCateRef.resetFields()
      this.selectedKeys = []
      this.newCate.cat_pid = 0
      this.newCate.cat_level = 0
    },
    async editCate (id) {
      const { data: res } = await this.$http.get('categories/' + id)
      if (res.meta.status !== 200) return this.$message.error('Failed to load category info.')
      this.editCateForm = res.data
      this.editDialogVisible = true
      // console.log(this.editCateForm)
    },
    editCateDialogClosed () {
      this.$refs.editCateFormRef.resetFields()
    },
    confirmEditCateInfo () {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.put('categories/' + this.editCateForm.cat_id, {
          cat_name: this.editCateForm.cat_name
        })
        if (res.meta.status !== 200) return this.$message.error('Failed to update category info.')
        this.$message.success('category info updated.')
        this.getCateList()
        this.editDialogVisible = false
      })
    },
    deleteCate (id) {
      this.$confirm('You\'re gonna delete this category,are u sure?', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async result => {
        const { data: res } = await this.$http.delete('categories/' + id)
        this.getCateList()
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'danger',
            message: 'category deleted.'
          })
        }
      }).catch((result) => {
        this.$message({
          type: 'error',
          message: 'Failed to  delete category.'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.zk-table__cell-inner i{
  font-size: 1.5rem;
  vertical-align: middle !important;
}
.el-cascader{
  width: 100%;
}
</style>
