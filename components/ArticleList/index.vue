<template>
    <div id="box">
          <div
            class="box">
            <div class="list">
              <div
                v-for="(item, index) in articleListTemp"
                class="list-item"
                :key="index"
              >
                <div class="meta">
                  <div class="meta-container">
                    <div class="user-message">
                      <a class="userbox">{{ item.user_to.user_to.nickname }}</a>
                    </div>
                    <div class="dividing"></div>
                    <div class="date">{{ item.created_at }}</div>
                  </div>
                  <div class="main">
                    <div class="main-box">
                      <div class="content-box">
                        <div class="title">{{ item.title }}</div>
                        <div class="content">
                          {{ item.description }}
                        </div>
                      </div>
                      <div class="img-box">
                        <img class="img" :src="item.image_url" alt="" />
                      </div>
                    </div>
                    <div class="icon-list">
                      <div class="item">
                        <i class="iconfont icon-chakan"></i>
                        <div>{{ item.pv_many_count }}</div>
                      </div>
                      <div class="item">
                        <i class="iconfont icon-31dianzan"></i>
                        <div>{{ item.like_many_count }}</div>
                      </div>
                      <div class="item">
                        <i class="iconfont icon-pinglun"></i>
                        <div>{{ item.comment_many_count }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <P
              v-if="loadingTemp"
              style="margin: 10pxauto; text-align: center"
              class="loading"
            >
              <span></span>
            </P>
            <p v-if="noMoreTemp" style="margin:10px auto;text-align: center;font-size:13px;color:#ccc">???????????????</P>
          </div>
        </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    // ??????????????????
    articleList:{
        type: Array,
        default: function() {
            return []
        }
    },
    // ????????????
    page: {
      type: Number,
      default: 1
    },
    // ??????????????????
    limit: {
      type: Number,
      default: 10
    },
    loading:{
        tyoe:Boolean,
        default:false
    },
    noMore:{
        tyoe:Boolean,
        default:false
    },
    // id: {
    //     type: Number,
    //     default: 0
    // },
    // typeId:{
    //     type: Number,
    //     default: 0
    // }
  },
  data() {
    return {
      loadingTemp: this.loading,
      noMoreTemp: this.noMore,
      articleListTemp:this.articleList,
      pageTemp:this.page
    }
  },
  mounted(){
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if (
        this.getScrollTop() + this.getWindowHeight() !==
        this.getScrollHeight()
      ) {
        return;
      }
      if (this.noMoreTemp || this.loadingTemp) {
        return;
      }
      this.loadingTemp = true;
      this.pageTemp += 1;
      this.$axios({
        url: "/index/articleList",
        params: {
          page: this.pageTemp,
          limit: this.limit,
          id: this.id,
          type_id: this.typeId,
        },
      }).then((resArticle) => {
        if (resArticle.status === 20000) {
          if (Math.ceil(resArticle.data.total / this.limit) <= this.pageTemp) {
            this.noMoreTemp = true;
          }
          if (resArticle.data.list.length) {
            this.articleListTemp = [...this.articleListTemp, ...resArticle.data.list];
          }
        }
        this.loadingTemp = false;
      });
    },
    //????????????Y?????????????????????
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    //??????????????????
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    //????????????????????????
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
  }
}
</script>

<style lang="scss" scoped>
#box{
    width: 100%;
    // height: 100px;
    overflow-y:auto;
}
.box {
  width: 100%; 
}
.list {
    margin-top: 10px;
    padding: 0;
    .list-item {
        cursor: pointer;
        width: 100%;
        background-color: #ffffff;
        padding: 12px 20px;
        padding-bottom: 0;
        box-sizing: border-box;
        .meta{
            display: flex;
            flex-direction: column;
            padding-bottom: 12px;
            box-sizing: border-box;
            border-bottom: 1px solid #e5e6eb;
            .meta-container{
                display: flex;
                flex-direction: row;
                line-height: 22px;
                font-size: 13px;
                color: #86909c;
                align-items: center;
                .dividing{
                    width: 1px;
                    height: 14px;
                    background: #e5e6eb;
                    margin: 0 8px;
                }
                .user-message{
                    // margin-right: 8px;
                    .userbox{
                        font-size: 13px;
                        color: #4e5969;
                        white-space: nowrap;
                    }
                }
            }
            .main{
                display: flex;
                flex-direction: column;
                .main-box{
                    display: flex;
                    flex-direction: row;
                    .content-box{
                        flex-grow: 1;
                        .title{
                            font-weight: bold;
                            font-size: 16px;
                            line-height: 24px;
                            color: #1d2129;
                            margin-bottom: 8px;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                        }
                        .title:hover{
                            color: #999999;
                        }
                        .content{
                            font-weight: normal;
                            font-size: 13px;
                            line-height: 22px;
                            color: #86909c;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }
                    }
                    .img-box{
                        flex: 0 0 auto;
                        width: 120px;
                        height: 80px;
                        margin-left: 24px;
                        border-radius: 2px;
                        .img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .icon-list{
                    display: flex;
                    flex-direction: row;
                    .item{
                        display: flex;
                        flex-direction: row;
                        margin-right: 20px;
                        font-size: 13px;
                        line-height: 20px;
                        color: #4e5969;
                        flex-shrink: 0;
                        i{
                            
                        }   
                        div{
                            margin-left: 4px;
                        } 
                    }
                    .item:hover{
                        color: #999999;
                    }
                }
            }
        }
        
    }
}


.loading span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #409eff;
  border-left: transparent;
  animation: zhuan 0.5s linear infinite;
  border-radius: 50%;
}
@keyframes zhuan {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
