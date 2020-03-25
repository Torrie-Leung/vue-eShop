<template>
  <div>
    <h3>New good item form</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/goods'}">Goods List</el-breadcrumb-item>
      <el-breadcrumb-item>New Item</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
