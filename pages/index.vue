<template>
  <div class="page-container">
    <el-row :gutter="20" class="banner-container">
      <el-col :span="12" :offset="6">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>点击排行</span>
          </div>
          <div class="click-list">
            <div class="item">
              <div class="item-index">1</div>
              <div class="item-title">后疫情时代,备受期待的“大学校园开放</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div id="box">
          <div
            class="box"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <div class="list">
              <div
                v-for="(item, index) in count"
                class="list-item"
                :key="index"
              >
                <div class="meta">
                  <div class="meta-container">
                    <div class="user-message">
                      <a class="userbox">Yumiazusa</a>
                    </div>
                    <div class="dividing"></div>
                    <div class="date">10天前</div>
                  </div>
                  <div class="main">
                    <div class="main-box">
                      <div class="content-box">
                        <div class="title">后疫情时代,备受期待的“大学校园开放”</div>
                        <div class="content">“对于长时段的社会常态,疫情只是‘过客’,
                          它带来的隔断只是‘例外状态’,这种‘例外状态’应随着疫情的结束而结束,
                          回到大学应有的开放状态。”2月15日,央视网刊发的评论文章《大学校门,
                          该打开了》引发广泛转载和舆论共鸣!
                        </div>
                      </div>
                      <div class="img-box">
                        <img
                          class="img"
                          src="http://www.miledoapi.com/upload/images/common/22.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="icon-list">
                      <div class="item">
                        <i class="iconfont icon-chakan"></i>
                        <div>30</div>
                      </div>
                      <div class="item">
                        <i class="iconfont icon-31dianzan"></i>
                        <div>30</div>
                      </div>
                      <div class="item">
                        <i class="iconfont icon-pinglun"></i>
                        <div>15</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <P
              v-if="loading"
              style="margin: 10pxauto; text-align: center"
              class="loading"
            >
              <span></span>
            </P>
            <P
              v-if="noMore"
              style="
                margin: 1opxauto;
                text-align: center;
                font-size: 13px;
                color: #ccc;
              "
              >没有更多了</P
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      count: 10,
      loading: false,
    };
  },
  //异步请求
  async asyncData({ $axios }) {
    //  const res = await $axios({ url: "/index/typeList" })
    //  return {
    //    typeList: res.data,
    //  };
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 5000px;
  background-color: #f4f5f5;
}
.banner-container {
  padding-top: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
#box {
  width: 100%;
  overflow-y: auto;
  margin-top: 5px;
}
.box {
  width: 100%;
}
.list {
  padding-top: 10px;
  padding: 0;
  .list-item {
    cursor: pointer;
    width: 100%;
    background-color: #ffffff;
    padding: 12px 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    .meta {
      display: flex;
      flex-direction: column;
      padding-bottom: 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e6eb;
      .meta-container {
        display: flex;
        flex-direction: row;
        line-height: 22px;
        font-size: 13px;
        color: #86909c;
        align-items: center;
        .dividing {
          width: 1px;
          height: 14px;
          background: #e5e6eb;
          margin: 0 8px;
        }
        .user-message {
          // margin-right: 8px;
          .userbox {
            font-size: 13px;
            color: #4e5969;
            white-space: nowrap;
          }
        }
      }
      .main {
        display: flex;
        flex-direction: column;
        .main-box {
          display: flex;
          flex-direction: row;
          .content-box {
            flex-grow: 1;
            .title {
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
            .title:hover {
              color: #999999;
            }
            .content {
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
          .img-box {
            flex: 0 0 auto;
            width: 120px;
            height: 120px;
            margin-left: 24px;
            border-radius: 2px;
            .img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .icon-list {
          display: flex;
          flex-direction: row;
          .item {
            display: flex;
            flex-direction: row;
            margin-right: 20px;
            font-size: 13px;
            line-height: 20px;
            color: #4e5969;
            flex-shrink: 0;
            i {

            }
            div {
              margin-left: 4px;
            }
          }
          .item:hover {
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

.box-card{
  margin-left: 30px;
.click-list{
  display: flex;
  flex-direction: column;
    .item{
      display: flex;
      flex-direction: row;
      height:30px;
      margin-bottom: 10px;
      padding-left: 5px;
      align-items: center;
      font-size: 14px;
      .item-index{
        flex-grow: 1;
        background-color: #b1b1b1;
        width: 20px;
        height: 20px;
        color: #ffffff;
        line-height: 16px;
        text-align: center;
        margin-right: 10px;
      }
      .item-title{
        line-height: 30px;
        color: #333;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
}
}


</style>
