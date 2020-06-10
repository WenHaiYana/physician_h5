<template>
  <div class="content-box">
    <!-- <div class="header">
      <input
        type="text"
        v-model="issue_content"
        name="search"
        placeholder="请输入视频名称"
      />
      <button @click="search()">搜索</button>
    </div>-->
    <div class="case-title" v-if="titleStatus === 404">
      <span
        v-for="(item, index) in vedioTitleArr"
        :key="index"
        @click="classify_1(item.id,item.name)"
      >{{item.name}}</span>
    </div>
    <div class="page-content" v-if="status === 404">
      <ul>
        <li v-for="(item,index) in firstVideoData" :key="item.id" :typeVideoName="item.name">
          <div class="case-top">
            <h3>{{item.tp.name}}</h3>
            <span class="more" @click="classify_1(item.tp.id, item.tp.name)">更多</span>
          </div>
          <div
            class="case-bottom"
            v-for="(items, index) in item.vedioList"
            :key="items.id"
            @click="videoDetail(items.id)"
          >
            <div class="left-img">
              <img class="li_img" :src="items.videoImg" />
            </div>
            <div class="right-text">
              <h3 class="right-title">{{items.videoTitle}}</h3>
              <p class="videoIntro">{{items.videoIntro}}</p>
              <p>{{items.createTime}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="search-content" v-else> -->
    <div
      class="search-content"
      v-else
      v-for="(item, id) in searchContent"
      :key="id"
      @click="viewDetail(item.id)"
    >
      <div class="search-content-left">
        <img :src="item.videoImg" alt />
      </div>
      <div class="search-content-right">
        <h2>{{item.videoTitle}}</h2>
        <p>{{item.videoBrief}}</p>
        <span>{{item.speakerName}}</span>
        <span class="videoPlay">{{item.videoPlay}}</span>
      </div>
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
      typeVideoName: "",
      vedioTitleArr: [],
      titleStatus: 404
    };
  },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
  },
  mounted() {
    
    
    this.$get("/video/getVideoWithType", {}).then(res => {
      this.firstVideoData = res;
      console.log(this.firstVideoData, "this.firstVideoData");
      for (var i = 0; i < res.length; i++) {
        this.vedioTitleArr = [res[0].tp];
        this.vedioTitleArr.push(res[i].tp);
      }
    });
  },
  destroyed() {
    this.bus.$emit("typeVideoName", this.typeVideoName);
  },
  methods: {
    viewDetail(id) {
      this.$router.push({ name: "video_detail", params: { id } });
    },
    ...mapMutations({
      setNum: "SET_NUM"
    }),
    classify_1(id, typeName) {
      localStorage.setItem("videoTypeId", JSON.stringify(id, typeName));
      localStorage.setItem("typeNameinfo", JSON.stringify(typeName));
      var videoTypeInfo = JSON.parse(localStorage.getItem("videoTypeId"));
      var typeNameinfo = JSON.parse(localStorage.getItem("typeNameinfo"));
      this.$router.push({ name: "typeVedio", params: { id } });
    },
    videoDetail(id) {
      this.$router.push({ name: "video_detail", params: { id } });
    },
    search() {
      this.manyli = [];
      this.imgArr = [];
      this.status = 404;
      this.searchContent = 404;
      console.log(this.issue_content, "this.issue_content");
      this.$http
        .get("http://www.crahim.cn/video/param", {
          params: {
            param: this.issue_content
          }
        })
        .then(res => {
          console.log(res, "病例搜索");
          if (res.data.result === null) {
            this.status = 404;
            this.searchContent = null;
          } else {
            this.imgArr = [];
            this.status = 404;
            this.manyli = res.data.rows;
          }
        });
    },
   
   
  },

  computed: {
    ...mapGetters(["number"]),
    ...mapState({
      number: state => state.home.number
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    border-width: 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding-left: 10px;
    position: relative;
    appearance: none;
    margin-right: 10px;
    width: 76%;
  }
  :focus {
    border-color: #ccc;
    outline: none;
  }
  button {
    border-radius: 8px;
    border: 1px solid #ccc;

    flex: 5;
  }
}
.case-title {
  padding: 15px;
  /* margin-bottom: 10px; */
  font-size: 14px;
  border-bottom: 10px solid #eee;
  // border-top: 10px solid #eee;
  font-weight: 700;
  span {
    margin-right: 5px;
    background-color: #3f4660;
    color: #fff;
    padding: 8px;
    border-radius: 8px;
  }
}
.page-content {
  // overflow: hidden;
  // .mb(98);
  width: 95%;
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
        width: 175px;
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
        flex: 5;
        h3 {
          width: 160px;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
          height: 28px;
          font-size: 16px;
          color: #666;
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
