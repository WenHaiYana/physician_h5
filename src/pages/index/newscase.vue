<template>
  <div class="content-box-not">
    <div class="text" v-for="(item, id) in data" :key="id">
      <div class="text-top">
        <h2>{{ item.newsTitle }}</h2>
        <span>{{ item.createTime }}</span>
      </div>
      <div class="text-middle">
        <p v-html="item.newsText"></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsListId: "",
      data: {},
      newscase: []
    };
  },
  created() {
    this.newsListId = this.$route.params.id;
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    this.$http
      .get("/news/getNewsById", {
        params: {
          newsId: this.newsListId
        }
      })
      .then(res => {
        console.log(res, "公告详情");
        this.data = res;
      });
  },
  methods: {}
};
</script>
<style lang="less">
//富文本的内容要生效
.content-box-not {
  padding: 10px 10px;
  box-sizing: border-box;
  .text {
    padding: 10px;
    .text-top {
      h2 {
        font-size: 16px;
        text-align: center;
        margin: 10px 0;
        font-weight: 700;
      }
      span {
        color: #ababab;
      }
    }
    .text-middle {
      margin: 0 0 70px 0;
      /deep/ img {
        width: 100%;
        height: 100%;
      }
      span {
        display: block;
      }
    }
    .text-bottom {
      p {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
}
</style>
