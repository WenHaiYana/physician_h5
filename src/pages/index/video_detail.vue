<template>
  <div class="page-video_detail">
    <div class="top">
      
      <video
       ref="custom-video"
       x5-video-player-type="h5"
       x5-video-orientation="portraint"
       x5-video-player-fullscreen="true"
        controls></video>
    </div>
    <div class="page-bottom">
      <ul>
        <li @click="fn1(1)" class="active-color first_li">视频介绍</li>
        <li @click="fn1(2)" class="second_li">讲师</li>
        <li @click="fn1(3)" class="third_li">评论</li>
      </ul>
    </div>
    <div class="show">
      <!-- <ul> -->
      <a class="show_1" v-if="wenhy===1" :key="index" @click="next(item.id)">
        <!-- <div class="show-left">
          <img src="/static/111.png" alt />
        </div>
        <div class="show-right">
          <h2>{{item.subTitle}}</h2>
          <p>主讲：{{item.speakerName}}</p>
          <p>
            <span>长度{{item.subTime}}</span>
            <span>播放:{{item.subPlay}}</span>
          </p>
        </div>-->
        <h3>视频介绍</h3>
        <p>{{videoIntro}}</p>
      </a>
      <a v-if="wenhy===2" class="show_2">
        <div class="exp-top">
          <div class="exp-top-left">
            <img src="/static/1-1.png" alt />
          </div>
          <div class="exp-top-right">
            <h2>
              {{expName}}
              <span>{{expPosition}}</span>
            </h2>
            <!-- <p>{{expPlace}}</p> -->
          </div>
        </div>
        <div class="exp-bottom">
          <h2>简介1</h2>
          <!-- <p>{{expSynopsis}}</p> -->
        </div>
      </a>
      <a v-if="wenhy===3" class="show_3">
        <div class="comment-wrap">
          <textarea class="comment-input" placeholder="请输入评论...." id="textpanel" v-model="content"></textarea>
          
          <div class="opration">
            <div class="emoji-panel-btn" @click="showEmojiPanel">
              <img src="../../assets/img/face_logo.png" />
            </div>
            <div @click="saveComment" class="comment-send-btn comment-send-btn-bounce">发表评论</div>
            <emoji-panel @emojiClick="appendEmoji" v-if="isShowEmojiPanel"></emoji-panel>
          </div>
          <div class="watchRecord" v-if="videoReviews === null">
            <ul>
              <li>当前视频没有评论...</li>
            </ul>
          </div>
          <div class="comments-list">
            <div class="comments-list-item">
              <div class="comments-list-item-heading">
                <!-- <img :src="headimgurl" /> -->
                <!-- <span class="comments-list-item-username">{{item.userName}}</span> -->
                <li v-for="(item, index) in discuss" :key="item.id">
                  <img :src="item.image" alt />
                  <span class="comments-list-item-username">{{item.userName}}</span>
                  <div>
                    <div class="comments-list-item-content">{{item.comment}}</div>
                    <div class="createTime">{{item.createTime}}</div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </a>
      <!-- </ul> -->
    </div>
  </div>
</template>
<script>
import EmojiPanel from "./child/EmojiPanel.vue";
import $ from "jquery";
export default {
  data() {
    return {
      videoReviews: "", //没有视频评论
      videoIntro: "",
      expPosition: "",
      index: "",
      discuss: [], //评论
      headingurl: {},
      pinglun: {},
      content: "",
      flag: false,
      isShowEmojiPanel: false,
      comments: [],
      videotypeIdData: {},
      ceshi: {},
      videoId: [], // 当前视频的id
      childId: [],
      loopData: {},
      wenhy: 1,
      exp: {},
      videotypeId: [], //总分类id
      typeId: [],
      expName: "",
      boderColor: "",
      rows: [],
      subPath: {},
      videoOp: {},
      videoOption: {
        poster: require("../../../static/images/poster.jpg"), // 初始化占位图片
        volume: 100
      },
      videoState: {
        play: false, //播放状态
        hideControl: false, // 控制栏状态
        distance: 0, // 移动的距离
        downState: false, // 鼠标点击进度条
        playState: false,
        leftInit: 0, // 当前进度初始偏移量
        screenState: false
      },
      voiceState: {
        // 同上
        distance: 0,
        downState: false,
        topInit: 0
      },
      videoDom: null, // video
      videoProOut: null, // 视频总进度条
      videoPro: null, // 视频进度条
      videoPoi: null, // 视频进度点
      duration: 0, // 视频总时长
      currentTime: 0, // 视频当前播放时长
      processWidth: 0, // 视频进度条总长度
      voiceProOut: null, // 音频总进度条
      voicePro: null, // 音频进度条
      voicePoi: null, // 音频进度点
      volProcessHeight: 0
    };
  },
  components: {
    EmojiPanel
  },
  created() {
    this.fatherId = this.$route.params.id;
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
  },
  mounted() {
    this.$get("/video/watch", {
      userId: this.userinfo.unionid,
      videoId: this.fatherId,
    }).then(res => {

    })
    this.$get("/videoComment/comm", {
      videoId: this.fatherId
    }).then(res => {
      this.discuss = res.rows;
    });
    this.$get("/video/getVideoById", {
      id: this.fatherId
    }).then(res => {
      this.rows = res;
      this.videoIntro = res.video.videoIntro;
      this.videoId = res.id;
      this.expName = res.expert.expName;
      this.expPosition = res.expert.expPosition
      this.$refs["custom-video"].src = res.video.videoUrl;
    });
  },
  methods: {
    
    fn1(index) {
      if (index === 1) {
        this.wenhy = index;
        $(".page-bottom .first_li").css("color", "#6d89b9");
        $(".page-bottom .second_li").css("color", " #000");
        $(".page-bottom .third_li").css("color", "#000");
      } else if (index === 2) {
        this.wenhy = index;
        $(".page-bottom .first_li").css("color", "#000");
        $(".page-bottom .second_li").css("color", " #6d89b9");
        $(".page-bottom .third_li").css("color", "#000");
      } else {
        this.wenhy = index;
        $(".page-bottom .first_li").css("color", "#000");
        $(".page-bottom .second_li").css("color", "#000");
        $(".page-bottom .third_li").css("color", " #6d89b9");
        this.$get("/videoComment/comm", {
          videoId: this.fatherId
        }).then(res => {
          if (res.rows === null) {
            this.videoReviews = null;
          }
          console.log(res, "/videoComment/comm");
        });
      }
    },
    next(itemId) {
      this.$get("/video/path", {
        videoId: itemId, 
        typeId: this.fatherId 
      }).then(({ data }) => {
        this.$refs["custom-video"].src = data.videoPath;
      });
      this.childId = itemId;
    },
    saveComment(e) {
      this.comments.push(this.content.replace(/:.*?:/g, this.emoji)); //替换:"符号包括的字符串，通过emoji方法生成表情<span></span>
      // this.content = "";
      this.isShowEmojiPanel = false;
      this.$get("/videoComment/comm", {
        content: this.content,
        videoId: this.fatherId,
        userId: this.userinfo.unionid
      })
        .then(res => {
          if (res.flag === true) {
            this.$get("/videoComment/comm", {
              videoId: this.fatherId
            }).then(res => {
              this.discuss = res.rows;
            });
          }
        })
    },
    
    
  }
};
</script>
<style  lang="less" scoped>
body {
  background-color: #fff;
}
.top {
  video {
    width: 100%;
  }
}

.page-bottom {
  display: flex;
  background-color: #fff;
  width: 100%;
  border-bottom: #eee 2px solid;
  ul {
    display: flex;
    width: 100%;
    li {
      flex: 1 !important;
      text-align: center;
      padding: 20px 0px;
      font-size: 15px;
    }
    li.active-color {
      color: #6d89b9;
    }
  }
}
.show {
  background-color: #fff;
  height: 100%;
  // ul {
  a.show_1 {
    display: block;
    padding: 10px 20px;
    line-height: 20px;
  }
  a.show_2 {
    .exp-top {
      display: flex;
      border-bottom: 2px solid #eee;
      padding: 0px 20px;
      .exp-top-left {
        flex: 2;
        display: flex;
        align-items: center; /*垂直居中*/
        justify-content: center; /*水平居中*/
        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
        }
      }
      .exp-top-right {
        flex: 5;
        line-height: 20px;
        margin-top: 5px;
        h2 {
          font-size: 13px;
          span {
            color: #ababab;
            margin-left: 20px;
          }
        }
        // }
      }
    }
    .exp-bottom {
      padding: 10px 20px;
      line-height: 25px;
      h2 {
        font-size: 13px;
      }
      p {
        color: #ababab;
        line-height: 20px;
      }
    }
  }
  a.show_3 {
    display: block;
    padding: 20px;
    // 注意 这里因为v-html的原因 不能使用scoped 不然样式不能失效
    .comment-wrap {
      width: 100%;
      box-sizing: border-box;
      .comment-input {
        width: 100%;
      }
      .emoji-item-common {
        background: url("../../assets/img/emoji_sprite.png");
        display: inline-block;
        &:hover {
          cursor: pointer;
        }
      }
      .emoji-size-small {
        // 表情大小
        zoom: 0.3;
      }
      .emoji-size-large {
        zoom: 0.5; // emojipanel表情大小
        margin: 4px;
      }
      .comments-list {
        margin-top: 20px;
        .comments-list-item {
          margin-bottom: 20px;
          .comments-list-item-heading {
            display: inline-block;
            width: 100%;
            li {
              position: relative;
              list-style: none;
              border-top: 1px solid #f1f1f1;
              padding: 10px 0;
              width: 100%;
              img {
                height: 32px;
                width: 32px;
                border-radius: 50%;
                vertical-align: middle;
              }
              .comments-list-item-username {
                margin-left: 5px;
                -weight: bold;
              }
              .comments-list-item-content {
                margin: 10px 0px;
                &:last-child {
                  border-bottom: 0;
                }
                span {
                  vertical-align: top;
                }
              }
              .createTime {
                color: #8a9aa9;
                position: absolute;
                bottom: 10px;
                right: 5px;
              }
            }
          }
        }
      }
      .opration {
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: relative;
        .emoji-panel-btn {
          opacity: 0;
          &:hover {
            cursor: pointer;
            // opacity: 0.8;
          }
          img {
            height: 24px;
            width: 24px;
          }
        }
        .comment-send-btn {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #1da1f2;
          border-radius: 100px;
          box-sizing: border-box;
          font-weight: bold;
          font-size: 13px;
          color: #ffffff;
          background-color: #4ab3f4;
          &:hover {
            cursor: pointer;
          }
        }
        .comment-send-btn-bounce {
          position: relative;
        }
        .comment-send-btn-bounce:focus {
          outline: none;
        }
        .comment-send-btn-bounce:after {
          content: "";
          display: block;
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          border-radius: 100px;
          border: 0px solid #1da1f2;
          opacity: 0.7;
          transition: all 0.1s;
        }
        .comment-send-btn-bounce:active:after {
          //.bounce active时 伪元素:after的样式
          opacity: 1;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 100px;
          border: 2px solid #1da1f2;
          transition: all 0.2s;
        }
      }
      .watchRecord {
        color: #ababab;
      }
    }
    @import "../../assets/css/emoji.css"; // 导入精灵图样式
  }
}
</style>