<template>
  <div class="input-box">
    <div class="all">全部分配</div>
    <span class="icon"></span>
    <input type="text" class="search" placeholder="病例\专家">
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.input-box{
  position: relative;
  display: flex;
  padding: 5px 3px 3px 3px;
  .all {
    flex: 1;
    text-align: center;
    background-color: #3f4660;
    color: #fff;
    box-sizing: border-box;
    border-radius: 8px;
    margin-right: 10px;
    font-size: 14px;
    line-height: 55px;
  }
  .icon{
    position: absolute;
    display: inline-block;
    .w(45);
    .h(45);
    top: 50%;
    .mt(-18);
    .left(195);
    background-image: url("../assets/imgs/search.svg");
    background-size: cover;
  }
  .search{
    flex: 3;
    border: 1px solid #ccc;
    .b-radius(10);
    // .h(50);
    .lh(50);
    // width: 100%;
    outline: none;
    .pl(50);
    .pt(5);
    .pt(5);
    // .ml(-25);
    .fs(26);
  }
}
</style>
