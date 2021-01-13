<template>
    <div class="main">
        <bread-crumb></bread-crumb>
        <keep-alive>
            <router-view></router-view>  
        </keep-alive>
              
    </div>
</template>

<script>
import breadCrumb from './breadCrumb';
export default {
    components:{
        breadCrumb
    }
}
</script>

<style lang="scss" scoped>

</style>