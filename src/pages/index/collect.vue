<template>
   <div class="page-collect">
     <div>
        <ul>
            <li v-for="(item, index) in collect" :key="index" @click="collectDtail(item.caseId)">
               <h2>{{item.caseName}}</h2>
               <span>{{item.createTime}}</span>
            </li>
        </ul>
     </div>
      <div class="watchRecord" v-if="iscollect === null" >
       <ul>
         <li>当前没有收藏病例</li>
       </ul>
    </div>
   </div>

</template>
<script>
 export default {
     data() {
         return {
             collect: [],
             id: [],
             iscollect: []
         }
     },
     created() {
        // this.fatherId = this.$route.params.id;
        this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
    },
     mounted() {
         this.$get("/qlib/mycollect", {
                 userId: this.userinfo.unionid
         })
         .then(res => {
             console.log(res, "res---")
             this.iscollect = res.rows;
             this.collect = res.rows;
         })
     },
     methods: {
         collectDtail(id) {
             console.log("123")
             this.$router.push({ name: "detail", params: { id } });
         }
     }
 }
</script>
<style lang="less" scoped>
.page-collect {
    padding: 15px;
    box-sizing: border-box;
    ul {
        li {
            position: relative;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #ababab;
            span {
                color: #ababab;
                position: absolute;
                right: 0;
                bottom: 5px;
            }
        }
    }
}
</style>