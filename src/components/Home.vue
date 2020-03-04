<template>
  <div>
    <el-button type="info" @click="logOut">Log out</el-button>
  </div>
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
</style>
