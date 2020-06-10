<template>
  <div class="page-expert">
    <div class="expert-top">
      <img :src="member.expImg" alt />
      <h2>{{member.expName}}</h2>
      <p>{{member.expSynopsis}}</p>
    </div>
    <h2>他的视频</h2>
    <div class="expert-bottom" v-for="(item, index) in member.expVideo" :key="item.id" @click="viewDetail(item.id)">
      <div class="expert-bottom-left">
        <img :src="item.videoImg" alt />
      </div>
      <div class="expert-bottom-right">
        <h3>{{item.videoTitle}}</h3>
        <p>{{item.videoBrief}}</p>
        <span>{{item.videoPlay}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      res: {},
      member: []
    };
  },
  created() {
  },
  mounted() {
    this.$http
      .get("http://www.crahim.cn/video/detail", {
        params: {
          expId: 1
        }
      })
      .then(res => {
        this.member = res.data;
        this.res = res;
        console.log(this.member, "this.member");
        console.log(res, "我是专家的页面");
      });
  },
  methods: {
      viewDetail(id) {
      this.$router.push({ name: "video_detail", params: { id } });
    },
  }
};
</script>

<style lang="less" scoped>
.expert-top {
  padding: 10px 20px;
  h2 {
    text-align: center;
  }
  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
    text-align: center;
  }
  p {
    text-indent: 2em;
  }
}
h2 {
  // padding-left: 10px;
  color: #728ab9;
}
.expert-bottom {
  padding: 15px 10px;
  display: flex;

  .expert-bottom-left {
    float: left;
    flex: 1;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .expert-bottom-right {
    float: left;
    flex: 3;
    text-align: left;
    h2 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
      color: #ababab;
    }
    span {
      font-size: 14px;
      color: #ababab;
    }
    .videoPlay {
      float: right;
      color: #ababab;
    }
  }
}
</style>