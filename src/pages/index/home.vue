<template>
  <div class="content-box">
     <div class="header">
      <input type="text" v-model="issue_content" name="search" placeholder="搜索视频..." />
      <button @click="search()">搜索</button>
    </div>
    <div class="page-content" v-if="status === null">
      <ul class="case-top">
        <li v-for="(item,index) in imgArr" :key="index" @click="classify_1(item.id)">
          <img class="li_img" :src="item.src" />
        </li>
      </ul>
    </div>
    <div  class="manyli" v-for="(item, id) in manyli" :key="id" @click="viewDetail(item.id)">
      <div class="manyli-left">
        <img :src="item.img" alt />
        <!-- {{item.img}} -->
      </div>
      <div class="manyli-right">
        <h2>{{item.name}}</h2>
        <!-- <p v-html=" item.mainSuit "></p> -->
        <span>{{item.createTime}}</span>
      </div>
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
      status: null,
      num: 0,
      imgArr: [
        { id: 1, src: "/static/images/classify.png" },
        { id: 2, src: "/static/images/abdominal.png" },
        { id: 3, src: "/static/images/head_and_neck.png" },
        { id: 4, src: "/static/images/nerve.png" },
        { id: 5, src: "/static/images/mammary.png" },
        { id: 6, src: "/static/images/bone_myopathy.png" },
        { id: 7, src: "/static/images/head_and_neck.png" },
        { id: 8, src: "/static/images/intervene.png" }
      ],
      searchContent: [],
      manyli: ""
    };
  },
  mounted() {
   
  },
  methods: {
    reload() {
      this.$router.go(0)
    },
    viewDetail(id) {
      console.log(id);
      this.$router.push({ name: "detail", params: { id } });
    },
    search() {
      this.manyli = [];
      this.imgArr = [];
      this.status = 404;
      this.searchContent = 404;
      console.log(this.issue_content, "this.issue_content");
      this.$http
        .get("http://www.crahim.cn/qlib/param", {
          params: {
            param: this.issue_content
          }
        })
        .then(res => {
          console.log(res, "病例搜索")
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
    ...mapMutations({
      setNum: "SET_NUM"
    }),
    classify_1(id) {
      this.$http
        .get("http://www.crahim.cn/qlib/findType", {
          params: {
            id
          }
        })
        .then(res => {
          this.manyli = res.data.data;
        });
      this.$router.push({ name: "classify", params: { id } });
    }
    
  },
  computed: {
    ...mapGetters(["number"]),
    ...mapState({
      number: state => state.home.number
    })
  },
  created() {}
};
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.content-box {
  overflow: hidden;
  background-color: #fff;
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
.page-content {
  overflow: hidden;
  background-color: #fff;
  .mb(98);
  .case-top {
    padding: 15px 0 0 15px;
    border-radius: 8px;
    flex-wrap: wrap;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    margin-left: 10px;
    width: 100%;
    li {
      list-style: none;
      display: inline-block;
      width: 25%;
      .li_img {
        display: inline-block;
        max-width: 80% !important;
      }
    }
  }
  // .case-bottom {
  //   display: flex;
  //   padding: 15px 0 0 15px;
  //   border-radius: 8px;
  //   li {
  //     float: left;
  //     flex: 1;
  //     margin-right: 10px;
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
}

.manyli {
  padding: 15px 10px;
  display: flex;
}
.manyli .manyli-left {
  float: left;
  flex: 1;
  margin-right: 10px;
}
.manyli .manyli-left img {
  width: 100%;
  height: 100%;
}
.manyli .manyli-right {
  float: left;
  flex: 3;
  text-align: left;
}
.manyli .manyli-right h2 {
  font-size: 16px;
}
.manyli .manyli-right p {
  font-size: 14px;
}
.manyli .manyli-right span {
  font-size: 14px;
}
</style>
