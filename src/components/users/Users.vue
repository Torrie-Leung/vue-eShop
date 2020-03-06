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
        <el-table-column
          prop="mg_state"
          label="STATUS">
          <template v-slot="scope">
            {{scope.row.mg_state}}
          </template>
        </el-table-column>
        <el-table-column
          label="OPERATION">
        </el-table-column>
      </el-table>
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
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
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
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
}
</style>
