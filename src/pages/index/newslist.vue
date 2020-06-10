<template>
  <div class="content-box">
     <div class="newslist" v-for="(item, id) in newslist" :key="newsId" @click="newscase(item.newsId)">
     <div class="newslist-left">
       <img :src="item.newsImg" alt="">
      </div>
      <div class="newslist-right">
        <h2>{{item.newsTitle}}</h2>
        <p v-html="item.newsBrief"></p>
        <span>{{item.createTime}}</span>
      </div>
     </div>
  </div>
</template>

<script>
export default {
    data() {
     return {
         newslist: []
     }
    },
     mounted() {
         this.$get("/news/list")
         .then(res => {
           this.newslist = res.rows;
         })
     },
     methods: {
       newscase(id) {
         console.log(id, "我是新闻列表的id")
          this.$router.push({ name: "newscase", params: { id }})
       }
     }
}
</script>
<style lang="less" >
@import "~styles/index.less";
@import "~styles/variable.less";
.content-box {
   padding: 15px;
   box-sizing: border-box;
}
.newslist {
  margin-bottom: 15px;
  display: flex;
  .newslist-left {
    float: left;
    flex: 1;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .newslist-right {
    float: left;
    flex: 3;
    text-aling: left;
    h2 {
      font-size: 16px;
      font-weight: 700;
    }
    p {
      overflow: hidden;
  text-overflow:ellipsis;//文本溢出显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
    }
    span {
      float: right;
      color: #ababab;
    }
  }
}
</style>
