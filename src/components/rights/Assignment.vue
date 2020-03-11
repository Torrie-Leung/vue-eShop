<template>
  <div>
    <h3>Role Assignment</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Access Management</el-breadcrumb-item>
      <el-breadcrumb-item>Role Assignment</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card>
      <!-- add role btn -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogVisible = true">Add Role</el-button>
        </el-col>
      </el-row>
      <!-- role list -->
      <el-table :data="rolesList" border stripe>
        <!-- expanded area -->
        <el-table-column type="expand">
          <template v-slot="slot">
            <el-row
              v-for="(item1,i1) in slot.row.children"
              :class="['bdb',i1 === 0?'bdt':'','vCenter']"
              :key="item1.id">
              <!-- 1st access -->
              <el-col :span="5">
                <el-tag
                closable
                @close="rmvRightById(slot.row,item1.id)"
                >{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 2nd & 3rd access -->
              <el-col :span="19">
                <el-row
                  v-for="(item2,i2) in item1.children"
                  :class="['vCenter',i2 === 0?'':'bdt']"
                  :key="item2.id">
                  <el-col :span="6">
                    <el-tag
                    type="success"
                    closable
                    @close="rmvRightById(slot.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                    type="warning"
                    :class="[i3 === 0?'':'bdt']"
                    v-for="(item3,i3) in item2.children"
                    :key="item3.id"
                    closable
                    @close="rmvRightById(slot.row,item3.id)"
                    >
                    {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre>{{slot.row}}</pre>
          </template>
        </el-table-column>
        <!-- index area -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="RoleName" prop="roleName"></el-table-column>
        <el-table-column label="Role Desc" prop="roleDesc"></el-table-column>
        <el-table-column label="Operation" width="300px">
          <template v-slot="slotProp">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editItem(slotProp.row.id)">Edit</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSettingDialog">Setting</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteItem(slotProp.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- add role dialog -->
    <el-dialog
      title="Confirmation"
      :visible.sync="dialogVisible"
      width="40%"
      close-on-click-modal
      @close="newRoleFormClosed"
    >
      <!-- notification content -->
      <span>You're gonna add a new role.</span>
      <el-form :model="newRole" ref="newRoleRef">
        <el-form-item label="Role Name" prop="roleName">
          <el-input v-model="newRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="Role Description" prop="roleDesc">
          <el-input v-model="newRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmNewRole">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- edit role dialog -->
    <el-dialog
      title="Edit Role"
      :visible.sync="editDialogVisible"
      width="40%"
      close-on-click-modal
    >
      <el-form :model="editRole" ref="editRoleRef">
        <el-form-item label="Role Name" prop="roleName">
          <el-input v-model="editRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="Role Desc" prop="roleDesc">
          <el-input v-model="editRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editNewRole">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- setting role dialog -->
    <el-dialog
      title="Set Role"
      :visible.sync="setRightDialogVisible"
      width="40%"
      close-on-click-modal
    >
    <!-- tree compo -->
      <el-tree
      :data="rightsList"
      show-checkbox
      :props="treeProps"></el-tree>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Assignment',
  data() {
    return {
      rolesList: [],
      newRole: {
        roleName: '',
        roleDesc: ''
      },
      editRole: {},
      dialogVisible: false,
      editDialogVisible: false,
      setRightDialogVisible: false,
      rightsList: [],
      // tree compo attribute data binding
      treeProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        this.$message.error('Failed to get role list.')
      }
      // console.log(res)
      this.rolesList = res.data
    },
    async confirmNewRole() {
      const { data: res } = await this.$http.post('roles', this.newRole)
      if (res.meta.status !== 201) {
        return this.$message.error('Failed to add new role.')
      }
      this.$message.success('new role added.')
      this.dialogVisible = false
      this.getRolesList()
    },
    newRoleFormClosed() {
      this.$refs.newRoleRef.resetFields()
    },
    async editItem (id) {
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('failed to load role info.')
      }
      this.editRole = res.data
      this.editDialogVisible = true
    },
    async editNewRole () {
      const { data: res } = await this.$http.put('roles/' + this.editRole.roleId, {
        roleName: this.editRole.roleName,
        roleDesc: this.editRole.roleDesc
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('Failed to edit role')
      }
      this.$message.success('Role edited.')
      this.getRolesList()
      this.editDialogVisible = false
    },
    async deleteItem(id) {
      this.$confirm('You\'re gonna delete this role, are u sure?', 'Comfirmation', {
        confirmButtonText: 'Comfirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async result => {
        // console.log(result)
        const { data: res } = await this.$http.delete('roles/' + id)
        if (res.meta.status === 200) {
          this.getRolesList()
          this.$message({
            type: 'danger',
            message: 'role deleted.'
          })
        }
      }).catch((result) => {
        // console.log(result)
        this.$message({
          type: 'info',
          message: 'Failed to  delete role.'
        })
      })
    },
    async rmvRightById (role, rightId) {
      console.log(role, rightId)
      const confirmRes = await this.$confirm('You\'re gonna delete this right, are u sure?', 'Comfirmation', {
        confirmButtonText: 'Comfirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes === 'confirm') {
        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.info('right deleted.')
          // reassign right to the role
          role.children = res.data
        } else {
          this.$message.error('failed to delete right.')
        }
      } else if (confirmRes === 'cancel') {
        this.$message.info('Cancel right deletion.')
      }
    },
    async showSettingDialog () {
      this.setRightDialogVisible = true
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        this.$message.error('Failed to get right list.')
      } else {
        this.rightsList = res.data
        console.log(this.rightsList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag{
  margin: 7px;
}
.bdt{
  border-top: 1px solid #eee;
}
.bdb{
  border-bottom: 1px solid #eee;
}
.vCenter{
  display: flex;
  align-items: center;
}
</style>
