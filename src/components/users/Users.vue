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
        pagesize: 3
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.msg.status !== 200) return this.$message.error('Failed to fetch user list.')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
}
</style>
