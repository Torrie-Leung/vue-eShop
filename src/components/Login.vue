<template>
  <div class="login_container">
    <div class="login_box">
      d
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style  scoped>
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
  translate: (-50%,-50%);
}
</style>
