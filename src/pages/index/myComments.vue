<template>
  <div class="content-box">
    <ul>
      <li
        v-for="(item, index) in myComments"
        :key="index"
        @click="toComments(item.fId,item.flag, item.id)"
      >
        <h2>{{item.original}}</h2>
        <span>{{item.createTime}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myComments: []
    };
  },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
  },
  mounted() {
    this.$get("/qlib/mycomm", {
      userId: this.userinfo.unionid
      // userId: "oeGxTwTawM6qpgB28WxzPIe9GN6c"
    })
    .then(res => {
      console.log(res, "res")
      this.myComments = res.rows;
      let loopData = res.rows;
      localStorage.setItem("name", loopData);
    })
  },
  methods: {
    toComments(id, flag, blId) {
      if (flag === "qlib") {
        this.$router.push({ name: "detail", params: { id } });
      } else if (flag === "video") {
        this.$router.push({ name: "video_detail", params: { id } });
      } else if (flag === "news") {
        this.$router.push({ name: "newscase", params: { id } });
      }
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
      position: relative;
      span {
        color: #ababab;
        position: absolute;
        right: 0;
        bottom: 5px;
      }
    }
  }
}
</style>