<template>
  <div class="container">
    <div class="container-header">
      <el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <logo v-if="showLogo" :collapse="true" /></div
        ></el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light nav-list">
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
        <el-col :span="4">
          <header-right />
        </el-col>
      </el-row>
    </div>
    <div class="type-tag" v-if="tagItems.length">
      <el-row :gutter="20">
        <el-col :span="14" :offset="9">
          <div class="tag-list">
            <el-tag
              class="tag-item"
              @click="typeItem(0)"
              :effect="type_id == 0 ? 'dark' : 'light'"
              >推荐</el-tag
            >
            <el-tag
              class="tag-item"
              v-for="item in tagItems"
              :key="item.id"
              :effect="type_id == item.id ? 'dark' : 'light'"
              @click="typeItem(item.id)"
            >
              {{ item.name }}
            </el-tag>
          </div>
        </el-col>
      </el-row>
    </div>
    <div :style="{ height: tagItems.length ? '105px' : '60px' }"></div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :visibility-height="300"
        :back-position="0"
        transition-name="fade"
      />
    </el-tooltip>
    <nuxt />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Logo from "./components/Logo";
import HeaderRight from "./components/HeaderRight";
import BackToTop from "@/components/BackToTop";
export default {
  data() {
    return {
      activeIndex: "0",
      showLogo: true,
      tagItems: [],
      type_id: 0,
    };
  },
  components: {
    Logo,
    HeaderRight,
    BackToTop,
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
          this.type_id = route.query.type_id;
          this.tagItems = this.typeList.filter((item) => {
            return item.id == route.query.id;
          })[0].children;
          if (!this.tagItems) {
            this.tagItems = [];
          }
        } else {
          this.activeIndex = "0";
          this.tagItems = [];
        }
      },
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == this.activeIndex) {
        return;
      }
      if (key === "0") {
        this.$router.push("/");
      } else {
        this.tagItems = [];
        this.$router.push("/article?id=" + key + "&type_id=0" + "&open=1");
      }
    },
    typeItem(type_id) {
      if (type_id == 0) {
        this.$router.push(
          "/article?id=" +
            this.$route.query.id +
            "&type_id=" +
            type_id +
            "&open=1"
        );
      } else {
        this.$router.push(
          "/article?id=" + this.$route.query.id + "&type_id=" + type_id
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// .container {
//   height: 3000px;
//   overflow: hidden;
// }
.container-header {
  background-color: #ffffff;
  border-bottom: solid 1px #e6e6e6;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 20;
}
.type-tag {
  border-bottom: solid 1px #e6e6e6;
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  top: 61px;
  height: 45px;
  z-index: 20;
}
.tag-list {
  flex-direction: row;
  line-height: 45px;
  .tag-item {
    cursor: pointer;
    margin: 0px 10px;
  }
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
.el-menu-demo {
  border-bottom: 0px;
}
.nav-list {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
