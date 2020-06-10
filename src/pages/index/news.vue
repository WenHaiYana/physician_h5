<template>
  <div class="content-box">
    <h3 class="redain">热点新闻</h3>
    <div class="newslist" v-for="(item, id) in newslist" :key="id" @click="newscase(item.newsId)">
      <div class="newslist-right">
        <h2>{{item.newsTitle}}</h2>
        <p v-html="item.newsBrief"></p>
        <span>{{item.createTime}}</span>
      </div>
      <div class="newslist-left">
        <img :src="item.newsImg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: []
    };
  },
  mounted() {
    this.$get("/news/findNewsWithPage").then(res => {
      this.newslist = res.rows;
    });
  },
  methods: {
    newscase(id) {
      this.$router.push({ name: "newscase", params: { id } });
    }
  }
};
</script>
<style lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.content-box {
  padding: 15px;
  box-sizing: border-box;
  .redain {
    background-color: #538cfe;
    width: 60px;
    padding: 5px;
    color: #fff;
    text-align: center;
    margin: 7px;
  }
}
.newslist {
  /* margin-bottom: 15px; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 68px;
  padding: 19px 10px 15px 10px;
  border-bottom: 1px solid #ccc;
  .newslist-left {
    float: left;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-left: 16px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .newslist-right {
    float: left;
    -webkit-box-flex: 3;
    -ms-flex: 3;
    flex: 3;
    text-aling: left;
    position: relative;
    padding: 10px;
    h2 {
      font-size: 12 px;
      font-weight: 700;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #ababab;
      margin: 34px 0 0 5px;
      font-size: 10px;
      font-size: 12px;
      color: #ababab;
      margin: 20px 0 0 5px;
    }
    span {
      float: right;
      color: #ababab;
      position: absolute;
      bottom: -5px;
      right: 5px;
    }
  }
}
</style>
