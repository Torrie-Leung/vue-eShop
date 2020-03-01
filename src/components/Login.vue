<template>
  <div class="login_container">
    <div class="login_box">
      <!-- avatar -->
      <div class="avatar_box">
        <img src="../assets/lsp.png" alt="">
      </div>
      <!-- login form -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
        <!-- user name -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- user password -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!-- button area -->
        <el-form-item class="btns">
          <el-button type="primary" >Log in</el-button>
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      // login form data binding
      loginForm: {
        username: 'chimp',
        password: '123456'
      },
      // login form validation
      loginRules: {
        username: [
          {
            required: true,
            message: 'please input your account',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: 'length should be 3 to 5',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'please input your password',
            trigger: 'blur'
          },
          {
            min: 6,
            message: 'password must be at least 6 digit number',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      console.log(this.$refs)
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less"  scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color:#fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  /* 而translate可以在不知道宽高的情况下进行居中，tranlate（）函数中的百分比是相对于自身宽高的百分比，所以能进行居中。 */
  /* translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置。 */
  transform: translate(-50%,-50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid darkkhaki;
    border-radius: 50%;
    padding: 5px;
    background-color: plum;
    box-shadow: 0 0 5px plum;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img {
      width:100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_form{
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  padding: 0 15px;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
