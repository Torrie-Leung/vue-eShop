<template>
  <el-container class="home-container">
    <!-- header section -->
    <el-header>
      <div class="header-name">
        <img src="../assets/logo.png" alt="logo">
        <span>Coding Jungle</span>
      </div>
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
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 24px;
  line-height: 24px;
  .header-name{
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
      height: 60px;
      width: 60px;
    }
    span{
      margin-left: 10px;
    }
  }
}
.el-aside{
  background-color: #333744
}
.el-main{
  background-color: #eee
}
</style>
