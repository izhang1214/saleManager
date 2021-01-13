<template>
    <div class="container">
        <HomeHeader/>
        <HomeSlide />
        <HomeContent />    
    </div>
</template>

<script>
    import HomeHeader from '../HomeHeader/homeheader';
    import HomeSlide from '../HomeSlide/homeslide';
    import HomeContent from '../HomeContent/homecontent';
    export default {
        name:"Home",
        components:{
            HomeHeader,
            HomeSlide,
            HomeContent
        }
    }
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.main {
  position: absolute;
  right: 0;
  left: 230px;
  top: 50px;
  bottom: 0;
  padding: 10px;
}
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2d3a4b;
}
.aside {
  width: 230px;
  position: absolute;
  top: 50px;
  bottom: 0;
  background: #545c64;
}
</style>