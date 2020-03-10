<template>
  <div>
    <h3>Users Management</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Users List</el-breadcrumb-item>
      <el-breadcrumb-item>Schedule</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card class="box-card">
      <!-- search&add area -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
          placeholder="Please input user name"
          v-model="queryInfo.query"
          @change="getUserList"
          clearable
          >
            <el-button slot="append" icon="el-icon-search"
            @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="dialogVisible = true">Add User</el-button>
        </el-col>
      </el-row>
      <!-- table section -->
      <el-table
        :data="userList"
        border
        stripe
        style="width: 100%">
        <!-- define table header -->
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="ROLE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="USER NAME">
        </el-table-column>
        <el-table-column
          prop="email"
          label="EMAIL">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="MOBILE">
        </el-table-column>
        <!-- if assign both slot template and prop to a compo, slot will take place of prop -->
        <el-table-column
          label="STATUS">
          <!-- Whenever there are multiple slots, use the full <template> based syntax for all slots -->
          <template v-slot="slotProp">
            <!-- {{slotProp.row.mg_state}} -->
            <el-switch v-model="slotProp.row.mg_state" @change="handleSwitch(slotProp.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="OPERATION">
          <template v-slot="slotProp">
            <!-- {{slotProp.row.id}} -->
            <!-- edit butn -->
            <el-tooltip content="Edit" placement="top" :enterable="false" :hide-after=1500>
              <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editItem(slotProp.row.id)"></el-button>
            </el-tooltip>
            <!-- allocate role btn -->
            <el-tooltip content="Allocate role" placement="top" :enterable="false" :hide-after=1500>
              <el-button type="warning" icon="el-icon-setting" circle size="mini"></el-button>
            </el-tooltip>
            <!-- delete btn -->
            <el-tooltip content="Delete" placement="top" :enterable="false" :hide-after=1500>
              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteUser(slotProp.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination section -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 30, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- add user dialog -->
    <el-dialog
      title="Confirmation"
      :visible.sync="dialogVisible"
      width="40%"
      close-on-click-modal
      @close="newUserFormClosed"
      >
      <!-- notification content -->
      <span>You're gonna add a new user.</span>
      <!-- new user form validation -->
      <el-form :model="newUserForm" :rules="newUserFormRules" ref="newUserFormRef" label-width="98px" >
        <el-form-item label="Username" prop="username">
          <el-input v-model="newUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="newUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="newUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Mobile" prop="mobile">
          <el-input v-model="newUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmNewUser">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- edit user dialog -->
    <el-dialog
      title="edit user"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
      >
      <el-form :model="editUserForm" :rules="editUserFormRules" ref="editUserFormRuleForm" label-width="100px">
        <el-form-item label="Username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="Email" prop= "email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Mobile" prop= "mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editUserInfo">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    // validate email
    // get user data params
    const emailCheck = (rule, value, callback) => {
      // reg to validate email address
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // do not forget callback's paren ()!!!!
        return callback()
      } else {
        callback(new Error('please input valid email address'))
      }
    }
    const mobielCheck = (rule, value, callback) => {
      // reg to validate phone number
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return callback()
      } else {
        callback(new Error('please input valid phone number'))
      }
    }
    return {
      queryInfo: {
        // searching keyword
        query: '',
        // current page number
        pagenum: 1,
        // items displayed every page
        pagesize: 3
      },
      userList: [],
      // total data item
      total: 0,
      // handle dialog's visibility
      dialogVisible: false,
      // new user form data model
      newUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // new user form validation rules
      newUserFormRules: {
        username: [
          { required: true, message: 'please input username', trigger: 'blur' },
          { min: 3, max: 20, message: 'username should be 3 to 20 letters.', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'please input password', trigger: 'blur' },
          { min: 6, max: 30, message: 'password should 6 to 30 digits.', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'please input email', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: 'please input your phone number', trigger: 'blur' },
          { validator: mobielCheck, trigger: 'blur' }
        ]
      },
      // handle editing dialog's visibility
      editDialogVisible: false,
      // query user info
      editUserForm: {},
      // edit form validation rules
      editUserFormRules: {
        email: [
          { required: true, message: 'please input email', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: 'please input your phone number', trigger: 'blur' },
          { validator: mobielCheck, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('Failed to reload user list.')
      console.log(res)
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleClose () {
      console.log('close dialog')
    },
    // listen to show data size change
    handleSizeChange (newPageSize) {
      // console.log(newPageSize)
      this.queryInfo.pagesize = newPageSize
      this.getUserList()
    },
    // listen to current page change
    handleCurrentChange (curPage) {
      // console.log(curPage)
      this.queryInfo.pagenum = curPage
      this.getUserList()
    },
    async editItem (itmeID) {
      // console.log(itmeID)
      const { data: res } = await this.$http.get('users/' + itmeID)
      if (res.meta.status !== 200) {
        return this.$message.error('failed to check user info.')
      } else {
        this.editUserForm = res.data
      }
      this.editDialogVisible = true
    },
    async handleSwitch (userInfo) {
      // console.log(userInfo)
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        // console.log(res)
        return this.$message.error('Failed to update user status.')
      }
      this.$message({
        message: 'user status updated.',
        type: 'success',
        duration: 1500
      })
    },
    // listen to newUserForm closing event
    newUserFormClosed () {
      this.$refs.newUserFormRef.resetFields()
    },
    // click btn to add new user
    confirmNewUser () {
      this.$refs.newUserFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) {
          return false
        } else {
          const { data: res } = await this.$http.post('users', this.newUserForm)
          if (res.meta.status !== 201) {
            return this.$message.error('Failed to add new user.')
          } else {
            this.$message.success('New user added.')
            // hide new user form dialog
            this.dialogVisible = false
            // reload user list
            this.getUserList()
          }
        }
      })
    },
    // handle edit user form closing event
    editDialogClosed () {
      this.$refs.editUserFormRuleForm.resetFields()
    },
    // confirm edited user info
    editUserInfo () {
      this.$refs.editUserFormRuleForm.validate(async valid => {
        if (!valid) {
          this.$message.error('failed to update user info, please check it again.')
          return false
        } else {
          const { data: res } = await this.$http.put('users/' + this.editUserForm.id, {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile,
            role: this.editUserForm.role
          })
          console.log(res)
          if (res.meta.status !== 200) {
            this.$message.erro('Failed to update.')
          } else {
            this.editDialogVisible = false
            this.getUserList()
            this.$message.success('user info updated.')
          }
        }
      })
    },
    async deleteUser (id) {
      // const confirmResult = await this.$confirm('You\'re gonna delete this user, are u sure?', 'Comfirmation', {
      //   confirmButtonText: 'Comfirm',
      //   cancelButtonText: 'Cancel',
      //   type: 'warning'
      // }).catch(err => err)
      // console.log(confirmResult)
      // // if confirm clicked, return string 'confirm'
      // // if delete cancelled, return string 'cancel'
      // if (confirmResult === 'cancel') {
      //   return this.$message.info('cancel delete user')
      // } else if (confirmResult === 'confirm') {
      //   const { data: res } = await this.$http.delete('users/' + id)
      //   console.log(res)
      //   if (res.meta.status === 200) {
      //     this.getUserList()
      //     return this.$message.warning('user deleted.')
      //   } else {
      //     return this.$message.info('Failed to  delete user.')
      //   }
      // }

      // my approach
      this.$confirm('You\'re gonna delete this user, are u sure?', 'Comfirmation', {
        confirmButtonText: 'Comfirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async result => {
        // console.log(result)
        const { data: res } = await this.$http.delete('users/' + id)
        if (res.meta.status === 200) {
          this.getUserList()
          this.$message({
            type: 'danger',
            message: 'user deleted.'
          })
        }
      }).catch((result) => {
        console.log(result)
        this.$message({
          type: 'info',
          message: 'Failed to  delete user.'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
}
</style>
