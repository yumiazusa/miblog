<template>
  <div>
    <div>首页</div>
    <nuxt-link :to="{ name: 'article-id', params: { id: 1 }, query: { a: 1, b: 2 } }">
      文章列表</nuxt-link>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
     
    };
  },
  //异步请求
  async asyncData({ $axios }) {
   //  const res = await $axios({ url: "/index/typeList" })
   //  return {
   //    typeList: res.data,
   //  };
  },
  methods: {
    btn() {
      // 调用actions   异步请求
      // this.$store.dispatch("UPDATE_TYPE_LIST", this.typeList);

      // 调用mutations
      // this.$store.commit("SET_TYPE_LIST", this.typeList);
    },
  },
  computed: {
   // ...mapGetters(['getTypeList']),
   //   ...mapState(['typeList'])
  },
};
</script>
