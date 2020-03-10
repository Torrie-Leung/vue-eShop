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
          <el-button type="primary" round>Add Role</el-button>
        </el-col>
      </el-row>
      <!-- role list -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Assignment',
  data() {
    return {
      roleLest: {}
    }
  }
}
</script>

<style lang="less" scoped>

</style>
