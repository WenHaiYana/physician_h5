<template>
  <div class="content-box">
    <div class="page-top-1">
      <img :src="message.headimgurl" alt />
      <div class="username" @click="todetail">{{ message.username }}</div>
    </div>
    <div class="page-content">
      <ul>
        <li @click="collect()">我收藏的病例</li>
        <li @click="myComments()">我的评论</li>
        <li @click="mywatch()">我的观看记录</li>
        <li @click="home()">病例学习</li>
        <li @click="video()">视频</li>
        <!-- <li @click="newslist()">新闻资讯</li> -->
      </ul>
    </div>
    <div class="page-about" @click="about()">关于医师学会</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";
import commonHeader from "common/common-header";

export default {
  data() {
    return {
      state: "STATE",
      message: {},
      data: {}
    };
  },
  methods: {
    about() {
      this.$router.push({ name: "about" });
    },
    collect() {
      this.$router.push({ name: "collect" });
    },
    ...mapMutations({
      setNum: "SET_NUM"
    }),
    myComments() {
      this.$router.push({ name: "myComments" });
    },
    mywatch() {
      this.$router.push({ name: "mywatch" });
    },
    newslist() {
      this.$router.push({ name: "newslist" });
    },
    toabout(id) {
      this.$router.push({ name: "about", params: { id } });
    },
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    todetail() {
      this.code = "";
      // var local = window.location.href; // 获取页面url
      var local = "http://www.crahim.cn/#/personal";
      var appid = "wxc5f079368de93a34";
      this.code = this.getUrlCode().code; // 截取code
      // var state = STATE;
      if (this.code == null || this.code === "") {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
      } else {
        let code = this.code;
        localStorage.loop = JSON.stringify(code);
        this.$get("/wx/callBack", {
          code: this.code
        }).then(res => {
          localStorage.setItem("userinfo", JSON.stringify(res.rows));
          this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
          this.message = this.userinfo;
        });
      }
    },
    home() {
      this.$router.push({ name: "home" });
    },
    video() {
      this.$router.push({ name: "video" });
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("userinfo"))) {
      this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
      this.message = this.userinfo;
    } else {
      this.todetail();
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters(["number"]),
    ...mapState({
      number: state => state.home.number
    })
  }
};
</script>

<style scoped lang="less">
@import "~styles/reset.less";
.content-box {
  background-color: #efefef;
  overflow: hidden;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
  .page-top-1 {
    background-color: #cedff3;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    img {
      flex: 1;
      height: 76px;
      width: 72px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .username {
      flex: 3;
      font-weight: 700px;
      font-size: 20px;
      height: 50px;
      line-height: 50px;
    }
  }
  .page-content {
    border-radius: 8px;
    padding: 20px 20px 0 20px;
    background-color: #fff;
    box-sizing: border-box;
    height: 48%;
    line-height: 44px;
    margin: 20px 0;
  }
  .page-about {
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
  }
}
</style>
