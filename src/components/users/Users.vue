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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary">Add User</el-button>
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
            <el-switch v-model="slotProp.row.mg_state"></el-switch>
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
              <el-button type="success" icon="el-icon-setting" circle size="mini"></el-button>
            </el-tooltip>
            <!-- delete btn -->
            <el-tooltip content="Delete" placement="top" :enterable="false" :hide-after=1500>
              <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
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
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      // get user data params
      queryInfo: {
        query: '',
        // current page number
        pagenum: 1,
        // items displayed every page
        pagesize: 3
      },
      userList: [],
      // total data item
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('Failed to fetch user list.')
      console.log(res)
      this.userList = res.data.users
      this.total = res.data.total
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
    editItem (itmeID) {
      console.log(itmeID)
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
}
</style>
