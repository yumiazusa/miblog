<template>
  <div class="page-container">
    <el-row :gutter="20" class="banner-container">
      <el-col :span="12" :offset="6">
        <banner-list :bannerList="bannerList"></banner-list>
      </el-col>
      <el-col :span="4" :offset="0">
        <open-article-list :openArticleList="openArticleList"></open-article-list>   
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <article-list :articleList="articleList" :page="page" :limit="limit" :noMore="noMore" :loading="loading"></article-list>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import ArticleList from '@/components/ArticleList'
import OpenArticleList from '@/components/OpenArticleList'
import BannerList from '@/components/BannerList'
export default {
  components: {ArticleList,OpenArticleList,BannerList},
  data() {
    return {
    };
  },
  //异步请求
  async asyncData({ $axios }) {
    let bannerList = [];
    const resBanner = await $axios({
      url: "/index/bannerList",
      params: { type: 0 },
    }).then((resBanner) => {
      if (resBanner.status === 20000) {
        bannerList = resBanner.data;
      }
    });

    let articleList = []
    let page =1
    let limit = 5
    let noMore = false
    let loading = false
    const resArticle = await $axios({
      url: "/index/articleList",
      params: { page: page, limit: limit },
    }).then((resArticle) => {
      if (resArticle.status === 20000) {
        if(Math.ceil(resArticle.data.total/limit) <= page){
                    noMore = true
                }
        articleList = resArticle.data.list;
      }
    })
    let openArticleList =[]
    const resOpenArticle = await $axios({
      url: "/index/openArticleList"}).then((resOpenArticle) => {
      if (resOpenArticle.status === 20000) {
        openArticleList = resOpenArticle.data;
      }
    })
    return {
      bannerList: bannerList,
      articleList: articleList,
      page:page,
      limit:limit,
      noMore:noMore,
      loading:loading,
      openArticleList:openArticleList
    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  background-color: #f4f5f5;
}
.banner-container {
  padding-top: 10px;
}
</style>
