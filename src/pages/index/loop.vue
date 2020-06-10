<template>
  <div class="content-box">
    <div class="header">
      <div class="all">儿科</div>
      <input
        type="text"
        v-model="issue_content"
        v-on:input="inputFunc"
        name="search"
        placeholder="病例\专家"
      />
      <button @click="search()">搜索</button>
    </div>
    <div
      class="loop"
      v-if="result"
      v-for="(item, id) in loop"
      :key="id"
      @click="viewDetail(item.id)"
    >
      <div class="loop-left">
        <img :src="item.videoImg" alt />
      </div>
      <div class="loop-right">
        <h2>{{item.videoTitle}}</h2>
        <p>{{item.videoBrief}}</p>
        <span>{{item.speakerName}}</span>
        <span class="videoPlay">{{item.videoPlay}}</span>
      </div>
    </div>
    <div class="nosearch" v-else-if="result===null">console.log(不好意思 没有搜到)</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputFunc: "",
      issue_content: "",
      result: [],
      loop: {},
      loopId: [],
      fatherId: null
    };
  },
  created() {
    this.fatherId = this.$route.params.id;
    console.log(this.fatherId, "loop");
  },
  mounted() {
    this.$get("/video/list", {
          typeId: this.fatherId
      })
      .then(res => {
        console.log(res, "res-loop")
      })
  },
  methods: {
    viewDetail(id) {
      this.$router.push({ name: "video_detail", params: { id } });
    },
    search() {
      console.log(this.issue_content, "this.issue_content");
      this.$get("/video/param", {
            param: this.issue_content,
            typeId: this.fatherId
        })
        .then(res => {
          console.log(res, "res-loop")
          if (res.result === null) {
            this.result = null;
          } else {
            this.loop = res.rows;
            let loopData = res.rows;
            localStorage.loop = JSON.stringify(loopData);
          }

        });
    }
  }
};
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.content-box {
  padding: 5px 3px 3px 3px;
  background-color: #fff;
  overflow: hidden;
}
.header-box {
  margin-bottom: 20px;
  background-color: #fff;
  padding-bottom: 10px;
}
.header {
  display: flex;
  position: relative;
  top: 12px;
  right: 0;
  left: 10px;
  padding-right: 23px;
  margin-bottom: 22px;
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
.loop {
  padding: 15px 10px;
  display: flex;
}
.loop .loop-left {
  float: left;
  flex: 1;
  margin-right: 10px;
}
.loop .loop-left img {
  width: 100%;
  height: 100%;
}
.loop .loop-right {
  float: left;
  flex: 3;
  text-align: left;
}
.loop .loop-right h2 {
  font-size: 16px;
}
.loop .loop-right p {
  font-size: 12px;
  color: #ababab;
}
.loop .loop-right span {
  font-size: 14px;
  color: #ababab;
}
.loop .loop-right .videoPlay {
  float: right;
  color: #ababab;
}
</style>