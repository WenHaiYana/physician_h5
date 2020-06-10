<template>
  <div class="content-box">
    <div class="header">
      <input type="text" v-model="issue_content" name="search" placeholder="搜索视频..." />
      <button @click="search()">搜索</button>
    </div>
    <div class="all">
      <span>>>></span>当前的位置：
      <span>{{typeNameinfo}}</span>
    </div>
    <div class="page-content" v-if="status === 404">
      <ul>
        <li v-for="(item,index) in typeVideoData" :key="item.id">
          <div class="case-top">
            <h3>{{gettypeVideoName}}</h3>
            <!-- <span class="more" @click="classify_1(item.tp.id)">更多</span> -->
          </div>
          <div class="case-bottom" @click="videoDetail(item.id)">
            <div class="left-img">
              <img class="li_img" :src="item.videoImg" />
            </div>
            <div class="right-text">
              <h3 class="right-title">{{item.videoTitle}}</h3>
              <!-- <p class="videoIntro">{{item.videoIntro}}</p> -->
              <span>{{item.createTime}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="search-content" v-if="searchContent === null">
      <p>请重新搜索，没有搜索到...</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      inputFunc: "",
      issue_content: "",
      searchContent: [],
      status: 404,
      num: 0,
      firstVideoData: [],
      typeVideoData: [],
      gettypeVideoName: "",
      typeNameinfo: "",
      id: 0
    };
  },
  created() {},
  beforeCreate() {
  },
  mounted() {
   
    var videoTypeInfo = JSON.parse(localStorage.getItem("videoTypeId"));
    var typeNameinfo = JSON.parse(localStorage.getItem("typeNameinfo"));
    this.typeNameinfo = typeNameinfo;
    this.$get("/video/findVideoList", {
      typeId: videoTypeInfo
    }).then(res => {
      this.typeVideoData = res;
    });
  },
  methods: {
    viewDetail(id) {
      this.$router.push({ name: "video_detail", params: { id } });
    },
    ...mapMutations({
      setNum: "SET_NUM"
    }),
    classify_1(id) {
      this.$get("/qlib/findType", {
        id
      }).then(res => {
        this.manyli = res.rows;
      });
      this.$router.push({ name: "video_detail", params: { id } });
    },
    videoDetail(id) {
      this.$router.push({ name: "video_detail", params: { id } });
    },
    search() {
      this.typeVideoData = [];
      this.manyli = [];
      this.imgArr = [];
      this.status = 404;
      this.searchContent = 404;
      this.$http
        .get("http://www.crahim.cn/video/param", {
          params: {
            param: this.issue_content
          }
        })
        .then(res => {
          console.log(res, "病例搜索");
          if (res.data.result === null) {
            this.status = null;
            this.searchContent = null;
          } else {
            this.imgArr = [];
            this.status = 404;
            this.typeVideoData = res.data.rows;
          }
        });
    },
   
  },

  computed: {
    ...mapGetters(["number"]),
    ...mapState({
      number: state => state.home.number
    }),
   
  }
};
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.content-box {
  background-color: #fff;
  overflow: hidden;
}
.header {
  display: flex;
  position: relative;
  top: 12px;
  right: 0;
  left: 10px;
  padding-right: 23px;
  margin-bottom: 22px;
  height: 29px;
  .all {
    flex: 1;
    text-align: center;
    background-color: #3f4660;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
    margin-right: 10px;
  }
  input {
    flex: 3;
    border-width: 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding-left: 10px;
    position: relative;
    appearance: none;
    margin-right: 10px;
  }
  :focus {
    border-color: #ccc;
    outline: none;
  }
  button {
    border-radius: 8px;
    border: 1px solid #ccc;
  }
}
.all {
  padding: 5px 15px;
  color: #ababab;
  span {
    color: green;
    font-weight: 700;
  }
}
.page-content {
  width: 95%;
  margin-bottom: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    list-style: none;
    display: inline-block;
    width: 100%;
    height: 99px;
    .case-top {
      border-bottom: 1px solid #eee;
      position: relative;
      padding: 10px;
      border-radius: 8px;
      flex-wrap: wrap;
      h3 {
        font-size: 13px;
        font-weight: 700;
      }
      .more {
        position: absolute;
        right: 0;
        top: 15px;
        color: #777;
      }
    }
    .case-bottom {
      margin: 15px 10px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      .left-img {
        flex: 2;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right-text {
        flex: 4;
        h3 {
          float: right;
          width: 160px;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
          height: 28px;
          font-size: 16px;
          color: #666;
        }
        span {
              color: #ababab;
    margin: 46px 0 0 40px;
    display: block;
        }
        .videoIntro {
          min-height: 22px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
.search-content {
  padding: 15px 10px;
  display: flex;
}
.search-content .search-content-left {
  float: left;
  flex: 1;
  margin-right: 10px;
}
.search-content .search-content-left img {
  width: 100%;
  height: 100%;
}
.search-content .search-content-right {
  float: left;
  flex: 3;
  text-align: left;
}
.search-content .search-content-right h2 {
  font-size: 16px;
}
.search-content .search-content-right p {
  font-size: 12px;
  color: #ababab;
}
.search-content .search-content-right span {
  font-size: 14px;
  color: #ababab;
}
.search-content .search-content-right .videoPlay {
  float: right;
  color: #ababab;
}
</style>
