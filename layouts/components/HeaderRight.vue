<template>
    <div class="grid-content bg-purple login-container">
      <img
        class="user-figure"
        src="http://www.miledoapi.com/upload/images/common/logo.png"
        alt=""
      />
      <el-button class="login-button" size="mini" plain>登录</el-button>
    </div>
</template>
<script>
export default {
  name: "HeaderRight",
  props: {},
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  line-height: 60px;
  .user-figure {
    width: 32px;
    height: 32px;
  }
  .login-button {
    cursor: pointer;
    margin-left: 10px;
    color: #666666;
    font-size: 15px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
</style>
