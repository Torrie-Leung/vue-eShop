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
      <el-aside :width="toggleWidth">
        <div class="toggle-menu-btn" @click="toggleMenu">
          <span v-if="!isCollapse"><i class="el-icon-d-arrow-left"></i></span>
          <span v-if="isCollapse"><i class="el-icon-d-arrow-right"></i></span>
        </div>
        <!-- side menu -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active = 'activePath'
          >
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
              <el-menu-item
                :index="'/' + subItem.path + ''"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="traceNavState('/' + subItem.path)"
                >
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- main page section -->
      <el-main>
        <!-- router placeholder -->
        <router-view></router-view>
      </el-main>
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
      },
      isCollapse: false,
      // active nav link
      activePath: ''
    }
  },
  computed: {
    toggleWidth: function () {
      return this.isCollapse ? '64px' : '205px'
    }
  },
  created () {
    this.getMenuLists()
    this.activePath = window.sessionStorage.getItem('activePath')
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
    },
    // toggle menu
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    // tracing clicking & save nav active status to sessionStorage
    traceNavState (activePath) {
      // console.log(activePath)
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
  .toggle-menu-btn{
    background-color: #4A5064;
    text-align: center;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    cursor: pointer;
    position: relative;
    height: 24px;
    span .el-icon-d-arrow-left{
      display: inline-block;
      position: absolute;
      right: 20px;
      top: 7px;
    }
  }
  .el-menu{
    border-right:none;
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
