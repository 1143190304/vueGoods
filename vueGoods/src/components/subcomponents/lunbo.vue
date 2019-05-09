<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in lunbolist" :key="item.url">
                <img :src="item.img" alt="" :class="{'wide':wide}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:["lunbolist","wide"] //定义props，规定谁调用该组件，必须传一个lunbolist数组
    }
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
    }
    .mint-swipe-item{
        text-align: center;
    }
    img{
        height: 100%;
        display: inline-block;
    }
    .wide {
        width: 100%;
    }
</style>