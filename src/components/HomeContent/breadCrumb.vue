<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" v-show="$route.path!=='/home'">
        <el-breadcrumb-item class="line">{{$route.meta.ptitle}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: $route.path}">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
    }
</script>

<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line {
  border-left: 3px solid #31c17b;
  padding: 0 0 0 8px;
}
</style>