<template>
  <div class="content-box">
    <ul>
      <li v-for="(item, index) in mywatch" :key="item.listId" @click="watchVideo(item.videoId)">
        <h2>{{item.subTitle}}</h2>
        <span>{{item.createTime}}</span>
      </li>
    </ul>
    <div class="watchRecord" v-if="mywatch === null" >
       <ul>
         <li>当前没有观看记录</li>
       </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mywatch: []
    };
  },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
  },
  mounted() {
    this.$get("/video/mywatch", {
       userId: this.userinfo.unionid
      // userId: "oeGxTwWB_n5ubjk0UJnlbOiWRlz0",
    })
    .then(res => {
      this.mywatch = res.rows;
      let loopData = res.rows;
      localStorage.loop = JSON.stringify(loopData);

    })
  },
  methods: {
    watchVideo(id) {
      this.$router.push({ name: "video_detail", params: { id } });
    }
  }
};
</script>
<style lang="less" scoped>
.content-box {
  padding: 20px 10px;
  box-sizing: border-box;
  ul {
    li {
      margin-bottom: 10px;
      border-bottom: 1px dashed #ababab;
      padding-bottom: 10px;
      span {
        color: #ababab;
        position: absolute;
        right: 0;
        bottom: 5px;
      }
    }
  }
  .watchRecord {
    padding: 0px 20px;
  }
}
</style>