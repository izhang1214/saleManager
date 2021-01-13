<template>
  <div class="header">
    <a href="#/home">
      <span class="span-title">销售管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <span style="margin-right:15px;">登录名：{{ user.name }}({{user.roleName}})</span>
        <span>部门：{{user.deptName}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-s-fold" command="logout"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user.user,
    };
  },
  methods: {
    handleCommand(command) {
      this.handleLogout();
    },
    handleLogout() {
      this.$store.dispatch('Logout');
    },
  },
};
</script>

<style scoped>
.header .logo {
  width: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin: 0 10px 0 30px;
}
.span-title {
  color: #fff;
  font-size: 18px;
  margin: 0 15px;
}
.el-dropdown {
  float: right;
  margin-right: 30px;
  cursor: pointer;
  color: #fff;
}
</style>