<template>
  <div class="header-box">
    <div class="header">
      <div class="all">全部分类</div>
      <input
        type="text"
        v-model="issue_content"
        v-on:input="inputFunc"
        name="search"
        placeholder="请输入病例/专家"
      />
      <button @click="search()">搜索</button>
      <div class="serch_result" v-show="serch_result_issue">
          <li v-for="item in searchData" id="searchContent" @click="searchContent()">{{item.name}}</li>
        
      </div>
    </div>
  </div>
</template>

<script>
import cusInput from "common/cus-input";
export default {
  data() {
    return {
      inputFunc: "",
      status: 404,
      issue_content: "", //输入框中的内容
      serch_result_issue: false, //控制搜索的问题显示隐藏
      serch_result: [
        { name: "儿科" },
        { name: "腹部" },
        { name: "腹部胀痛" },
        { name: "温海燕" },
        { name: "鹿晗" },
        { name: "吴亦凡" },
        { name: "灿烈" },
        { name: "温暖" },
        { name: "温柔" },
        { name: "温暖的天气" }
      ]
    };
  },
  props: {
    showright: {
      type: Boolean,
      default: false
    },
    showleft: {
      type: Boolean,
      default: false
    },
    showinput: {
      type: Boolean,
      default: false
    },
    tittle: {
      type: String,
      default: "全部分配"
    },
    showback: {
      type: Boolean,
      default: true
    },
    showmore: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    serchData() {
      var issue_content = this.issue_content;
      if (issue_content) {
        return this.serch_result.filter(function() {
          return Object.keys(product).some(function(key) {
            return (
              String(product[key])
                .toLowerCase()
                .indexOf(issue_content) > -1
            );
          });
        });
      }
    }
  },
  methods: {
    //监听输入事件，当input中有内容时，下面的搜索列表显示出来
    inputFunc() {
      if (this.issue_content.length > 0) {
        this.serch_result_issue = true;
      } else {
        this.serch_result_issue = false;
      }
    },
    back() {
      this.$router.goBack();
    },
    searchContent(text) {
      const ct = document.getElementById("searchContent");
      this.issue_content = ct.value + text;
    },
    search() {
      this.$http
        .get("http://www.crahim.cn/qlib/param", {
          params: {
            param: this.issue_content
          }
        })
        .then(({ data }) => {
          
        });
    }
  },
  computed: {
    //当输入内容的时候下面的方法就会根据你输入的内容来过滤serch_result数组中的数据
    searchData() {
      var issue_content = this.issue_content;
      if (issue_content) {
        return this.serch_result.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return (
              String(product[key])
                .toLowerCase()
                .indexOf(issue_content) > -1
            );
          });
        });
      }
      return this.products;
    }
  },
  components: {
    cusInput
  }
};
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
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
    display: relative;
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
.serch_result {
  position: absolute;
  top: 36px;
  left: 25%;
  background-color: #fff;
  z-index: 99;
  border: 2px solid #eee;
  width: 200px;
  margin-top: 10px;
  border-radius: 8px;
  ul {
    li {
      padding: 20px;
      &:hover {
        // cursor:pointer;
        background-color: #ccc;
      }
    }
  }
}
</style>
