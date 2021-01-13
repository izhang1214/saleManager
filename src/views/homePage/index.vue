<template>
  <div class="home-page">
    <div>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">常用功能</div></el-col
        >
      </el-row>
    </div>
    <ul class="one"  v-if="roleId!=2">
      <li style="background: #2a99d12b">
        <router-link to="/quoteManage">
        <div>
          <img src="../../assets/img1.png" alt="" />
        </div>
        <div><span>报价管理</span></div>
        </router-link>
      </li>
      <li style="background: #eed4ba7d">
        <router-link to="/saleOrder">
          <div><img src="../../assets/img2.png" alt="" /></div>
          <div><span>销售订单查询</span></div>
        </router-link>
      </li>      
      <li style="background: #dc4f4f3d">
        <router-link to="/saleSingle">
          <div><img src="../../assets/img3.png" alt="" /></div>
          <div><span>销售单查询</span></div>
        </router-link>
      </li>      
      <li style="background: #a4e6ea8c">
        <router-link to="/reportySearch">
          <div><img src="../../assets/img4.png" alt="" /></div>
          <div><span>库存查询</span></div>
        </router-link>
      </li>      
      <li style="background: #debff08f">
        <router-link to="/phoneList">
          <div><img src="../../assets/img5.png" alt="" /></div>
          <div><span>通讯录</span></div>
        </router-link>
      </li>      
    </ul>
    <ul class="two" v-else>
      <li style="background: #2a99d12b">
        <router-link to="/quoteManage">
        <div>
          <img src="../../assets/img1.png" alt="" />
        </div>
        <div><span>报价管理</span></div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleId:''
    };
  },
  created () {
    this.roleId = this.$store.state.user.user.roleId;
  },
};
</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
  /* background: rgba(234, 236, 239, 1); */
  overflow: hidden;
}
.bg-purple-dark {
  background: #ccd3dd91;
  height: 40px;
  line-height: 40px;
  color: rgba(53, 122, 247, 1);
  font-weight: bold;
  padding-left: 15px;
}
.one {
  width: 80%;
  height: 130px;
  margin: 40px auto;
  display: flex;
}

.one li {
  flex: 1;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.one li div:nth-of-type(1),.two li div:nth-of-type(1) {
  margin-top: 20px;
}
.one li div:nth-of-type(2),.two li div:nth-of-type(2) {
  margin: 10px 0;
}
li a{
  color:black;
}
.two {
  width: 80%;
  height: 130px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: center;
}
.two li{
  width: 211px;
  height: 130px;
}
</style>