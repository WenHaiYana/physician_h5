<template>
  <div class="page-detail">
    <div class="header-box">
      <div class="header">
        <div class="all">在线答题</div>
      </div>
    </div>
    <div class="content">
      <div class="page-content-top">
        <h2>患者</h2>
        <p>{{ caseDetails.name }}</p>
        <h2 class="age">年龄</h2>
        <p>{{ caseDetails.age }}</p>
        <h2>病史</h2>
        <p v-html="caseDetails.mainSuit" class="vHtml"></p>

        <div class="right_button">
          <ul>
            <li class="collect_1" @click="collect()">{{ this.collectCon }}</li>
          </ul>
        </div>
      </div>
      <!-- <div class="page-content-middle">
        <h2>影像资料</h2>
        <ul>
          <li class="img_id" v-for="(item, id) in imageData" :key="id">
            <img class="li_img" src="/static/images/bone_myopathy.png" alt />
          </li>
        </ul>
      </div>-->
      <div class="page-content-questions">
        <!-- 单选题区 -->
        <div class="radio-area" v-if="questions.choice === '单选题'">
          <h2>{{ questions.chioce }}</h2>
          <!-- 题目 -->
          <h2>单选题</h2>
          <h3 class="nane">{{ questions.show }}</h3>
          <ul>
            <li
              v-for="(item, index) in option"
              :key="index"
              :class="activedRadio === index ? 'bg-green' : ''"
              @click="handleChangeRadio(index)"
            >
              <span style="color:#789cb6">{{ index }}</span>
              <span v-if="index != ''">:</span>
              <span>{{ item }}</span>
            </li>
            <div class="btns">
              <button
                type="button"
                class="btn btn-primary"
                style="width: 80px; height: 30px"
                @click="getPrevQuestions(questions.id)"
              >
                {{ questions.last }}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style="width: 80px; height: 30px"
                @click="submitAnswer(questions.id)"
              >
                {{ questions.commit }}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style="width: 80px; height: 30px"
                @click="getNextQuestions(questions.id)"
              >
                {{ questions.nexts }}
              </button>
            </div>
          </ul>
          <!-- 答案选项区 -->
          <div class="daan">
            <div v-show="daan.flag === 'YES'">
              <h2>回答正确</h2>
              <h4>正确答案是：{{ daan.rightOption }}</h4>
              <pre v-html="daan.rightDes"></pre>
            </div>
          </div>
          <div class="daan">
            <div v-show="daan.flag === 'NO'">
              <h2>回答错误</h2>
              <h4>正确答案是：{{ daan.rightOption }}</h4>
              <pre v-html="daan.rightDes"></pre>
            </div>
          </div>
        </div>
        <!-- 多选择题区 -->
        <div class="checkbox-area" v-if="questions.choice === '多选题'">
          <h2>{{ questions.chioce }}</h2>
          <!-- 题目 -->
          <h2>多选题</h2>
          <h3 class="nane">{{ questions.show }}</h3>
          <ul id="Options_s">
            <li
              v-for="(item, index) in option"
              :key="item.id"
              @click="handleChangeCheckbox(index)"
            >
              <span style="color:#789cb6">{{ index }}</span>
              <span v-if="index != ''">:</span>
              <span>{{ item }}</span>
            </li>
            <div class="btns">
              <button
                type="button"
                class="btn btn-primary"
                style="width: 80px; height: 30px"
                @click="getPrevQuestions(questions.id)"
              >
                {{ questions.last }}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style="width: 80px; height: 30px"
                @click="submitAnswer(questions.id)"
              >
                {{ questions.commit }}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                style="width: 80px; height: 30px"
                @click="getNextQuestions(questions.id)"
              >
                {{ questions.nexts }}
              </button>
            </div>
          </ul>
          <!-- 答案选项区 -->
          <div class="daan">
            <div v-show="daan.flag === 'NO'">
              <h2>回答错误</h2>
              <h4>正确答案是：{{ daan.rightOption }}</h4>
              <pre v-html="daan.rightDes"></pre>
            </div>
          </div>
          <div class="daan">
            <div v-show="daan.flag === 'YES'">
              <h2>回答正确</h2>
              <h4>正确答案是：{{ daan.rightOption }}</h4>
              <pre v-html="daan.rightDes"></pre>
            </div>
          </div>
        </div>

        <!-- <commonAnswer :answer="answer"></commonAnswer> -->
      </div>
      <div class="analyze" v-if="questions.flag === '当前题目已是最后一题'">
        <div
          class="commAnaly"
          v-for="(item, index) in questions.commAnaly"
          :key="index"
        >
          <h2>案例分析</h2>
          <h3>【最终结果】</h3>
          <p>{{ item.content }}</p>
          <h3>【诊断要点】</h3>
          <p v-html="item.identifyDiag"></p>
          <h3>【鉴别诊断】</h3>
          <p v-html="item.identifyDiag"></p>
        </div>
      </div>
      <div
        class="expName"
        v-if="questions.flag === '当前题目已是最后一题'"
        v-for="(item, index) in questions.commAnaly"
        :key="index"
      >
        <h2>专家点评</h2>
        <div class="expName-top" @click="toexpert()">
          <div class="expName-top-left">
            <img :src="item.expImg" alt />
          </div>
          <div class="expName-top-right">
            <h3>{{ item.expName }}</h3>
            <p>{{ item.expPlace }}</p>
          </div>
        </div>
        <div class="expName-bottom">
          <p>{{ item.content }}</p>
        </div>
      </div>
      <div class="comment-wrap">
        <textarea
          class="comment-input"
          placeholder="请输入评论...."
          id="textpanel"
          v-model="content"
        ></textarea>
        <div class="opration">
          <div class="emoji-panel-btn" @click="showEmojiPanel">
            <img src="../../assets/img/face_logo.png" />
          </div>
          <div
            @click="saveComment"
            class="comment-send-btn comment-send-btn-bounce"
          >
            发表评论
          </div>
          <emoji-panel
            @emojiClick="appendEmoji"
            v-if="isShowEmojiPanel"
          ></emoji-panel>
        </div>
        <a class="show_3">
          <div class="comments-list">
            <div class="comments-list-item">
              <div class="comments-list-item-heading">
                <!-- <img :src="headimgurl" /> -->
                <!-- <span class="comments-list-item-username">{{item.userName}}</span> -->
                <ul>
                  <li v-for="(item, index) in discuss" :key="index">
                    <img :src="item.img" alt />
                    <span class="comments-list-item-username">
                      {{ item.userName }}
                    </span>
                    <div>
                      <div class="comments-list-item-content">
                        {{ item.content }}
                      </div>
                      <div class="createTime">{{ item.createTime }}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import EmojiPanel from "./child/EmojiPanel.vue";
// import commonAnswer from "../../components/common-answer";
export default {
  data() {
    return {
      content: "",
      isShowEmojiPanel: false,
      discuss: [], //评论
      answer: {},
      caseDetails: [],
      fatherId: "",
      questions: [],
      nextId: 1,
      prevId: 1,
      isCliocked: true,
      chioceType: 1,
      id: [],
      Arr: [],
      choice: {},
      checkboxAnswer: [],
      nextId: [],
      daan: [],
      imageData: [],
      // clickAnswerId: []
      // answerId: this.$route.params.id
      radioId: "",
      activedRadio: -1,
      checkboxId: "",
      activedChecked: [],
      collectCon: "收藏",
      option: [],
      indexXb: ""
    };
  },
  created() {
    this.fatherId = this.$route.params.id;
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    console.log(this.userinfo.unionid, "this.userinfo.unionid");
    this.$get("/qlib/comm", {
      caseId: this.fatherId
    }).then(res => {
      this.discuss = res.rows;
    });
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.$get("/qlib/comm", {
      caseId: this.fatherId
    }).then(res => {
      this.discuss = res.rows;
    });
    this.$get("/qlib/showFirst", {
      id: this.fatherId
    }).then(res => {
      this.imageData = res.rows.imageData;
      this.caseDetails = res.rows.caseDetails;
      this.prevId = res.rows.questions.id;
      this.chioceType = res.rows.questions.chioceType;
      this.questions = res.rows.questions;
      this.option = JSON.parse(res.rows.questions.option);
      let aaa = 0;
      let str = this.questions.option.split(",");
      let style = [];
      for (let i in str.length) {
        style.push(-1);
      }
      if (this.questions.choice === "多选题") {
        this.initCheckedAnswer(this.questions.option);
      }
    });
  },
  methods: {
    collect() {
      this.$get("/qlib/collect", {
        caseId: this.fatherId,
        userId: this.userinfo.unionid
      }).then(res => {
        console.log(res, "收藏得接口");
        if (res.rows === true) {
          this.collectCon = "已收藏";
        }
      });
    },
    toexpert() {
      let expertId = 1;
      this.$router.push({ name: "expert", params: { expertId } });
    },
    showEmojiPanel() {
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },
    emoji(word) {
      // 生成html
      const type = word.substring(1, word.length - 1);
      return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`;
    },
    appendEmoji(text) {
      const el = document.getElementById("textpanel");
      this.content = el.value + ":" + text + ":";
    },
    saveComment(e) {
      this.isShowEmojiPanel = false;
      this.$get("/qlib/add", {
        content: this.content,
        caseId: this.fatherId,
        userId: this.userinfo.unionid
      }).then(res => {
        console.log(res, "提交评论的接口");
        if (res.flag === true) {
          this.$get("/qlib/comm", {
            caseId: this.fatherId
          }).then(res => {
            console.log(res, "提交评论得接口");
            this.discuss = res.rows;
          });
        }
      });
    },
    handleChangeRadio(index, radioId) {
      this.indexXb = index;
      this.activedRadio = this.activedRadio === index ? -1 : index;
      this.radioId = this.activedRadio === -1 ? "" : radioId;
      this.opIds = index;
    },
    /**
     * 多选题的答案
     * @param {Number} index 题目的序号,用判断是否添加哪一项的背景颜色
     * @param {String} id 答案的id值
     */
    handleChangeCheckbox(index, id) {
      // this.indexXb = index
      //  多选时可以得到用户选择的答案的数据, 比如: [a, b, d], this.checkboxAnswer = [a, b, d]
      // this.checkboxAnswer.push(index);
      // this.opIds = this.checkboxAnswer.join(",");
      // console.log(this.opIds, "this.opIds")
      //==========================================
      let cli;
      if (index == "A") {
        cli = 0;
      } else if (index == "B") {
        cli = 1;
      } else if (index == "C") {
        cli = 2;
      } else if (index == "D") {
        cli = 3;
      } else if (index == "E") {
        cli = 4;
      } else if (index == "F") {
        cli = 5;
      } else if (index == "G") {
        cli = 6;
      } else if (index == "H") {
        cli = 7;
      } else if (index == "I") {
        cli = 8;
      } else if (index == "J") {
        cli = 9;
      } else if (index == "K") {
        cli = 10;
      } else if (index == "L") {
        cli = 11;
      }
      if (this.checkboxAnswer.indexOf(index) != -1) {
        $("#Options_s")
          .find("li")
          .eq(cli)
          .removeClass("bg-green");
      } else {
        $("#Options_s")
          .find("li")
          .eq(cli)
          .addClass("bg-green");
      }
      console.log("这是第几个：", cli);
      let activedChecked = this.activedChecked;

      if (activedChecked.indexOf(index) != -1) {
        // 说明现在是有颜色的, 此时需要去掉背景颜色
        activedChecked[index] = -1;
      } else {
        //  如果没有颜色的话, 那么就添加背景颜色
        activedChecked[index] = index;
      }
      if (this.checkboxAnswer.length > 0) {
        let num = 0;
        let inst = 0;
        if (this.checkboxAnswer.indexOf(index) != -1) {
          inst = this.checkboxAnswer.indexOf(index);
          this.checkboxAnswer.splice(inst, 1);
        } else {
          this.checkboxAnswer.push(index);
        }
      } else {
        this.checkboxAnswer.push(index);
      }

      this.activedChecked = activedChecked;
      // this.checkboxAnswer = activedChecked.filter(item => item !== -1);
      this.opIds = this.checkboxAnswer.map(item => item).join(",");
      // console.log(this.opIds, 55555);
      console.log(this.opIds, 55555);
      this.$forceUpdate();
      //==========================================
    },
    //  初始化多选题的答案样式值
    //  传入的答案选项必须是数组
    initCheckedAnswer(options) {
      const { length } = options;
      if (!length || length === 0) {
        this.activedChecked = [];
      } else {
        const activedChecked = new Array(length).fill(-1);
        this.activedChecked = activedChecked;
      }
    },
    //  提交用户的答案
    submitAnswer(itemId) {
      // if (!this.opIds) {
      // alert("没有选择不可以提交噢");
      // } else {
      this.$get("/qlib/showAnswer", {
        opIds: this.opIds,
        id: itemId,
        userId: this.userinfo.unionid
      })
        .then(res => {
          this.checkboxAnswer = [];
          console.log(res, "提交用户的答案");
          this.daan = res.rows;
        })
        .catch(err => {});
      // }
      this.opIds = [];
    },

    //  获取下一道题目
    getNextQuestions(itemId) {
      this.checkboxAnswer = [];
      this.option = [];
      this.daan = [];
      this.$get("/qlib/showNext", {
        id: itemId,
        caseId: this.fatherId
      })
        .then(res => {
          console.log(res, "33333333");
          this.questions = res.rows;
          this.option = JSON.parse(res.rows.option);
          console.log(this.option, "11111");
          if (this.questions.choice === "多选题") {
            this.initCheckedAnswer(this.questions.option);
          }
        })
        .catch(error => {});
    },
    //  获取上一道题目
    getPrevQuestions(itemId) {
      this.checkboxAnswer = [];
      this.daan = [];
      this.$get("/qlib/showLast", {
        id: itemId,
        caseId: this.fatherId
      })
        .then(res => {
          this.questions = res.rows;
          this.option = JSON.parse(res.rows.option);
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="less" scoped>
@import "~styles/variable.less";
.page-detail {
  background-color: #eee;
  box-sizing: border-box;
  .right_button {
    position: fixed;
    width: 50px;
    margin-left: -25px;
    top: 50%;
    right: 10px;
    z-index: 2000;
    background-color: #fff;
    color: #6b6b6b;
    ul {
      li {
        margin-bottom: 10px;
        text-align: center;
        width: 50px;
        -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 1px;
        padding: 8px 0 9px;
        background-color: #fff;
        &:hover {
          color: #ca0c16;
        }
      }
    }
  }
  h2 {
    color: #789cb6;
    font-size: 16px;
  }
  .header-box {
    margin-bottom: 20px;
    background-color: #fff;
  }
  .header {
    display: flex;
    position: relative;
    top: 0;
    right: 0;
    padding: 15px;
    background-color: #fff;
    .all {
      flex: 1;
      text-align: center;
      background-color: #3f4660;
      color: #fff;
      padding: 10px;
      border-radius: 8px;
      margin-right: 10px;
      text-decoration: none;
    }
    input {
      flex: 3;
      border-width: 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding-left: 10px;
      position: relative;
      appearance: none;
    }
    :focus {
      border-color: #ccc;
      outline: none;
    }
  }
  .content {
    p {
      font-size: 13px;
    }
    .page-content-top {
      background-color: #fff;
      padding: 10px 15px;
      line-height: 22px;
      /deep/ img {
        width: 100%;
        height: 100%;
      }
    }
    .page-content-middle {
      margin: 20px 0;
      background-color: #fff;
      padding: 10px 15px;
      ul {
        display: flex;
        flex-wrap: wrap;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
        li {
          flex: 1;
          margin-right: 10px;
          list-style: none;
          .li_img {
            display: inline-block;
            max-width: 100% !important;
          }
        }
        li.bg-green {
          background: #a5d146;
        }
      }
    }
    .page-content-questions {
      background-color: #fff;
      padding: 10px 15px 26px;
      line-height: 12px;
      margin: 23px 0px;
      .checkbox-area {
        line-height: 35px;
      }
      ul {
        margin-right: 36px;
        display: block;
        list-style-type: disc;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0;
        li {
          padding: 10px;
          list-style: none;
          font-size: 14px;
          margin-bottom: 10px;
          background-color: #fff;
          border-radius: 5px;
        }
        li.bg-green {
          background: #a5d146;
        }
        .btns {
          display: flex;
          margin: 15px 0;
          button {
            margin-right: 8px;
            flex: 1;
          }
        }
      }
      .radio-area {
        line-height: 30px;
      }
      .daan {
        margin: 10px 0;
        line-height: 25px;
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          line-height: 18px;
        }
      }
    }
    .analyze {
      background-color: #fff;
      padding: 10px 15px;
      pre {
        text-indent: 0.5rem;
        font-size: 0.7rem;
        font-family: -moz-fixed;
        white-space: pre-wrap;
        white-space: pre-wrap;
      }
    }
    .expName {
      h2 {
        padding-left: 10px;
      }
      .expName-top {
        background-color: #fff;
        display: flex;
        padding: 10px;
        border-radius: 8px;
        margin: 10px;
        .expName-top-left {
          flex: 1;
          border-radius: 50%;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .expName-top-right {
          flex: 3;
          p {
            color: #cfcfcf;
          }
        }
      }
      .expName-bottom {
        background-color: #fff;
        border-radius: 8px;
        margin: 10px;
        padding: 10px;
        text-indent: 2em;
      }
    }
  }
  .comment-wrap {
    margin-top: 20px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px 0 0 0;
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
      background-color: #fff;
      padding: 0 20px;
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
              font-weight: bold;
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
    .comment-input {
      height: 38px;
      width: 95%;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      resize: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0 12px 16px;
      &:focus {
        outline: none;
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
          opacity: 0;
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
  }
  .answer {
    height: 50px;
  }
}
</style>
