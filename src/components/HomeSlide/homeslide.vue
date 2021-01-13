<template>
  <div class="aside">
    <el-menu
      :router="true"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/quoteManage">
        <i class="el-icon-s-order"></i>
        <span slot="title">报价管理</span>
      </el-menu-item>
      <el-submenu index="2" v-show="roleId != 2">
        <template slot="title">
          <i class="el-icon-suitcase-1"></i>
          <span>销售管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/saleOrder" class="item">销售订单</el-menu-item>
          <el-menu-item index="/saleSingle" class="item">销售单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" v-show="roleId != 2">
        <template slot="title">
          <i class="el-icon-search"></i>
          <span>查询</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/reportySearch" class="item"
            >库存查询</el-menu-item
          >
          <el-menu-item index="/providerSearch" class="item"
            >客户及供应商查询</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4" v-show="roleId != 2">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>报表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/orderReport" class="item"
            >销售订单报表</el-menu-item
          >
          <el-menu-item index="/singleReport" class="item"
            >销售单报表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5" v-show="roleId != 2">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>客户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custRelationManage" class="item"
            >客户关系管理</el-menu-item
          >
          <el-menu-item index="/custRelationFenxi" class="item"
            >客户关系分析</el-menu-item
          >
          <!-- <el-menu-item index="/moneyApply" class="item">费用报销申请</el-menu-item>
          <el-menu-item index="/moneyBaoxiaoFenxi" class="item">费用报销分析</el-menu-item>
          <el-menu-item index="/researchApply" class="item">研发及后勤报销申请</el-menu-item>
          <el-menu-item index="/researchFenxi" class="item">研发及后勤报销分析</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6" v-show="roleId == 0">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>库存管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/entryStore" class="item">入库管理</el-menu-item>
          <el-menu-item index="/outStore" class="item">出库管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/phoneList" v-show="roleId != 2">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">通讯录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "/",
      roleId: "",
    };
  },
  created() {
    this.activeIndex = this.$route.path;
    this.roleId = this.$store.state.user.user.roleId;
    console.log(this.roleId);
  },
  watch: {
    $route(to) {
      this.activeIndex = to.path;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
.el-menu {
  border-right: none !important;
}
.item {
  padding-left: 70px !important;
}
/deep/.el-icon-arrow-down {
    font-size: 25px;
    color: #f00;
}
</style>