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
          v-model="selectedCateKeys"
          @change="cascaderChange"
          change-on-select
          expand-trigger="hover"></el-cascader>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="Dynamic Params" name="many">
          <el-button type="primary" icon="el-icon-plus" :disabled="isBtnDisabled" @click="addParamsDialogVisible = true">Dynamic Params</el-button>
          <!-- dynamic params table -->
          <el-table :data="manyTableData" border>
            <el-table-column type="expand">
              <template v-slot="slotData">
                <el-tag
                v-for="(val, i) in slotData.row.attr_vals"
                :key="i"
                closable>{{val}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="param name" prop="attr_name"></el-table-column>
            <el-table-column label="operation" >
              <template v-slot="slotProp">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="openEditParamDiaolog(slotProp.row.attr_id)">Edit</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(slotProp.row.attr_id)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Configuration" name="only">
          <el-button type="primary" icon="el-icon-plus" :disabled="isBtnDisabled" @click="addParamsDialogVisible = true">Configs</el-button>
          <!-- only params table -->
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="param name" prop="attr_name"></el-table-column>
            <el-table-column label="operation" >
              <template v-slot="slotProp">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="openEditParamDiaolog(slotProp.row.attr_id)">Edit</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(slotProp.row.attr_id)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- add param dialog -->
      <el-dialog
        :title="addParamTitle"
        :visible.sync="addParamsDialogVisible"
        width="40%"
        close-on-click-modal
        @closed="addParamFormClosed"
      >
        <!-- notification content -->
        <span>You're gonna add a new param.</span>
        <el-form :model="addParamForm" :rules="addParamFormRules" ref="addParamFormRef" >
          <el-form-item label="Param Name" prop="attr_name">
            <el-input v-model="addParamForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addParamsDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addParamConfirmed">Confirm</el-button>
        </span>
      </el-dialog>
      <!-- edit param dialog -->
      <el-dialog
        title="Confirmation"
        :visible.sync="editParamsDialogVisible"
        width="40%"
        close-on-click-modal
        @close="editParamsClosed"
      >
        <!-- notification content -->
        <span>You're gonna update param name.</span>
        <el-form :model="editParam" :rules="editParamFormRules" ref="editParamRef">
          <el-form-item label="Param Name" prop="attr_name">
            <el-input v-model="editParam.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editParamsDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="editParamsConfirmed">Confirm</el-button>
        </span>
      </el-dialog>
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
      },
      selectedCateKeys: [],
      activeName: 'many',
      manyTableData: [],
      onlyTableData: [],
      addParamsDialogVisible: false,
      editParamsDialogVisible: false,
      addParamFormRules: {
        attr_name: [
          { required: true, message: 'please input param name', trigger: 'blur' }
        ]
      },
      addParamForm: {
        attr_name: ''
      },
      editParamFormRules: {
        attr_name: [
          { required: true, message: 'please input param name', trigger: 'blur' }
        ]
      },
      editParam: {
        attr_name: ''
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
      // console.log(this.cateList)
    },
    cascaderChange () {
      this.getParamsData()
    },
    handleTabClick(tab, event) {
      // console.log(tab, event)
      // console.log(this.activeName)
      this.getParamsData()
    },
    // to get params data from server
    async getParamsData () {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.$message.error('please select a 3rd clss.')
        return false
      }
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: {
          sel: this.activeName
        }
      })
      if (res.meta.status !== 200) return this.$message.error('Failed to load params data.')
      // console.log(res)
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals.split(' ')
      })
      console.log(res)
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else if (this.activeName === 'only') {
        this.onlyTableData = res.data
      }
    },
    addParamFormClosed () {
      this.$refs.addParamFormRef.resetFields()
    },
    addParamConfirmed () {
      this.$refs.addParamFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
          attr_name: this.addParamForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 201) this.$message.error('Failed to add new param.')
        this.getCateList()
        this.$message.success('new param added.')
        // console.log(res)
        this.addParamsDialogVisible = false
      })
    },
    async openEditParamDiaolog (attrId) {
      console.log(attrId)
      this.editParamsDialogVisible = true
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes/${attrId}`, {
        params: {
          attr_sel: this.activeName
        }
      })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('failed to load param info.')
      this.editParam = res.data
    },
    editParamsConfirmed () {
      this.$refs.editParamRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editParam.attr_id}`, {
          attr_name: this.editParam.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 200) return this.$message.error('Failed to update param name.')
        this.getParamsData()
        this.$message.success('param name updated.')
        this.editParamsDialogVisible = false
      })
    },
    editParamsClosed () {
      this.$refs.editParamRef.resetFields()
    },
    async deleteParams (paramId) {
      console.log(paramId)
      const confirmRes = await this.$confirm('You\'re gonna delete this param,are u shure?', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes !== 'confirm') {
        this.$message.info('cancel deletion.')
      } else {
        const { data: res } = await this.$http.delete(`categories/${this.cateId}/attributes/${paramId}`)
        if (res.meta.status !== 200) return this.$message.error('Failed to delete param.')
        this.$message.warning('param deleted')
        this.getCateList()
      }
    }
  },
  computed: {
    isBtnDisabled () {
      if (this.selectedCateKeys.length !== 3) {
        return true
      } else {
        return false
      }
    },
    cateId () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      } else {
        return null
      }
    },
    addParamTitle () {
      return this.activeName === 'many' ? 'Add Dynamic Params' : 'Add Constant Params'
    }
  }
}
</script>

<style lang="less" scoped>
.cates_option{
  margin: 15px;
}
</style>
