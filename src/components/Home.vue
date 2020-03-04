<template>
  <el-container class="home-container">
    <!-- header section -->
    <el-header>
      Header
      <el-button type="info" @click="logOut">Log out</el-button>
    </el-header>
    <el-container>
      <!-- aside section -->
      <el-aside width="200px">Aside</el-aside>
      <!-- main page section -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'LogOut',
  data () {
    return {}
  },
  methods: {
    logOut () {
      // clear sessionStorage & redirect to the login page
      window.sessionStorage.clear()
      this.$message({
        message: 'Your account has been logged out.',
        type: 'warning',
        duration: 2000
      })
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  background-color: #373d41
}
.el-aside{
  background-color: #333744
}
.el-main{
  background-color: #eee
}
</style>
