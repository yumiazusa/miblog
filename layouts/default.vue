<template>
  <div class="container">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in typeList"
        :index="item.id + ''"
        :key="index"
        >{{ item.name }}</el-menu-item
      >
    </el-menu> -->
    <div class="container-header">
      <!-- <el-row :gutter="24">
                <el-col :span="4">
                    <logo v-if="showLogo" :collapse="true"/>
                </el-col>
                <el-col :span="18">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="0">首页</el-menu-item>
                        <el-menu-item v-for="(item,index) in typeList" :key="index" :index="item.id+''">{{item.name}}</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="2">
                    <header-rigth/>
                </el-col>
            </el-row> -->
      <el-row>
        <el-col :span="3"
          ><div class="grid-content bg-purple">
            <logo v-if="showLogo" :collapse="true" /></div
        ></el-col>
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="0">首页</el-menu-item>
              <el-menu-item
                v-for="(item, index) in typeList"
                :key="index"
                :index="item.id + ''"
                >{{ item.name }}</el-menu-item
              >
            </el-menu>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple login-container">
            <img class="user-figure" src="http://www.miledoapi.com/upload/images/common/logo.png" alt=""/>
            <el-button class="login-button" size="mini" plain>登录</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="top-height"></div>
    <nuxt />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Logo from "./components/Logo.vue";
export default {
  data() {
    return {
      activeIndex: "0",
      showLogo: true,
    };
  },
  components: {
    Logo,
  },
  computed: {
    ...mapState(["typeList"]),
  },

  // middleware:'auth' ,可直接调用middleware里的中间件
  async middleware({ $axios, store }) {
    if (!store.getters.getTypeList.length) {
      const res = await $axios({ url: "/index/typeList" });
      store.dispatch("UPDATE_TYPE_LIST", res.data);
    } else {
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query.id) {
          this.activeIndex = route.query.id;
        } else {
          this.activeIndex = "0";
        }
      },
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === "0") {
        this.$router.push("/");
      } else {
        this.$router.push("/?id=" + key);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container{
  height: 3000px;
  overflow: hidden;
}
.container-header{
  position:fixed;
  width: 100%;
  top:0px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.el-menu-item {
  color: #666666;
  font-size: 18px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}
.el-menu-demo{
  border-bottom: 0px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.grid-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-purple-light {
  border-bottom: solid 1px #e6e6e6;
}
.login-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  line-height: 60px;
  .user-figure{
    width:32px;
    height:32px;
  }
  .login-button{
        cursor: pointer;
        margin-left:10px;
        color: #666666;
        font-size: 15px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
  }
}
.top-height{
  height: 60px;
}

</style>
