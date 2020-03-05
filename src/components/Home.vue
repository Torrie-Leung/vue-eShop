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
      <el-aside width="205px">
        <!-- side menu -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF">
          <!-- 1st class menu -->
          <!-- concat '' to meet the props required type string -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 1st class menu template -->
            <template slot="title">
              <!-- menu icon -->
              <i :class="iconObj[item.id]"></i>
              <!-- menu text -->
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <!-- 2nd class menu template -->
              <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航3</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- main page section -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'LogOut',
  data () {
    return {
      // menu data
      menuList: [],
      // customized icons
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-users',
        102: 'iconfont icon-shangpin',
        101: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  created () {
    this.getMenuLists()
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
    },
    // fetch all menu lists
    async getMenuLists () {
      const { data: res } = await this.$http.get('menus')
      // if request failed, notificate with msg
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res)
      this.menuList = res.data
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
  background-color: #333744;
  .el-menu{
    border-right:none !important;
    .el-submenu{
      .iconfont{
        margin-left: 5px;
        margin-right: 10px;
      }
    }
  }
}
.el-main{
  background-color: #eee
}
</style>
