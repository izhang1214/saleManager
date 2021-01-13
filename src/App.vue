<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
body {
  font-family: "微软雅黑";
}
#app {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
[v-cloak] {
  display: none;
}
</style>
