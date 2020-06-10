<template>
  <div class="content-box">
    <div class="about-top">
      <h2>中国医师协会</h2>
      <p>中国医师协会（ChineseMedical Doctor Association，CMDA），是2002年1月9日经国家民政部登记注册在北京正式成立，是由执业医师、执业助理医师及单位会员自愿组成的全国性、行业性、非营利性群众团体，是国家一级协会、独立法人社团。国家卫生计生委是业务主管单位。</p>
    </div>
    <div class="about-bottom">
      <div class="bottom-left">
        <p>联系电话：</p>
        <p>官方邮箱：</p>
        <p>官方微信:</p>
      </div>
      <div class="bottom-right">
        <img src="/static/images/about/about_logo.jpg" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.content-box {
  padding: 50px 10px;
  box-sizing: border-box;
  .about-top {
    border-top: 2px solid #c02c38;
    border-bottom: 2px solid #c02c38;
    padding: 20px 0;
    margin-bottom: 10px;
    h2 {
      text-align: center;
      font-size: 21px;
    }
    p {
      font-size: 13px;
      text-indent: 2em;
    }
  }
  .about-bottom {
    width: 100%;
    .bottom-right {
      width: 100%;
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
    }
  }
}
</style>