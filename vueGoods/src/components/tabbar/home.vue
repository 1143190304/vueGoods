<template>
    <div>
        <!--轮播图区域-->
        <mt-swipe :auto="3000">
            <mt-swipe-item>
                <img :src="urlone" alt="" class="img">
            </mt-swipe-item>
            <mt-swipe-item>
                <img :src="urltwo" alt="" class="img">
            </mt-swipe-item>
            <mt-swipe-item>
                <img :src="urlthree" alt="" class="img">
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格区域-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="./img/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                <img src="./img/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                <img src="./img/menu3.png" alt="">
                <div class="mui-media-body">商品分类</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="./img/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="./img/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="./img/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-gear"></span>
                <div class="mui-media-body">商家投资</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-info"></span>
                <div class="mui-media-body">社区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-more"></span>
                <div class="mui-media-body">更多</div></a></li>
        </ul>
    </div>
</template>
<!--知识点：加载首页轮播图数据：
1，获取数据，使用Vue-resroure
2.在methods方法中使用this.$http.get/post获取，用then.(result=>{
     this.lunboList = result.body.message; 注意要先在data中定义一个lunboList数组来接收数据
})
3.在mt-swipe标签中用v-for='item in lunboList' :key="item.url"循环遍历lunboList数组
4.在mt-swipe下面的img中绑定一个:src="item.img"-->
<script>
    import {Toast} from 'mint-ui'
    //知识点：Vue组件中获取静态图片的方式如下：“
    import urlone from './img/lunbo4.jpg'
    import urltwo from './img/lunbo2.jpg'
    import urlthree from './img/lunbo3.jpg'
    export default {
        data(){
            return {
                lunboList:[],//保存轮播图的数组
                urlone:urlone,
                urltwo:urltwo,
                urlthree:urlthree
            }
        },
        created(){
            this.getInfo();
        },
        methods:{
            getInfo(){//获取数据
                this.$http.get('api/getlunbo').then(result =>{
                    if (result.body.status === 0){
                        this.lunboList = result.body.message;
                    } else{
                        Toast("加载轮播图失败");
                    }

                })
            }
        }
    }
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
    }
    .mint-swipe-item:nth-child(1){
        background-color: #007aff;
    }
    .mint-swipe-item:nth-child(2){
        background-color: #ffff00;
    }
    .mint-swipe-item:nth-child(3){
        background-color: #6d6d72;
    }
    .img{
        width: 100%;
        height: 100%;
        display: inline-block;
    }
    .mui-table-view.mui-grid-view{
        background-color: #fff;
        border: none;
    }
    .mui-table-view.mui-grid-view img{
        width: 60px;

    }
    .mui-media-body{
        font-size: 13px;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }

</style>