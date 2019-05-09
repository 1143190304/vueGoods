<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--给a选择性的增加一个类，如果item.id=0,则附加给它一个active，不为0，则为空-->
                    <a :class="['mui-control-item',item.id==0? 'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getphotolist(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>

        </div>
        <ul class="photolist">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <div class="info-title">{{item.title}}</div>
                    <div class="info-content">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //由于顶部滑动条的引入，需要通过js来初始化，这里引入mui.js
    import mui from '../../lib/js/mui.js'

    export default {
         data(){
             return{
                 cates:[], //所有图片的分类
                 list:[] //图片列表数组
             }
         },
        created(){
            this.getcategory();
            this.getphotolist(0);//默认进入页面时显示id为0的图片列表
        },
         mounted(){//当组件中的dom结构被渲染好被放到页面中后会执行这个钩子函数
             //最好在mounted里操作元素。这里的元素是最新的
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
         },
         methods:{
            getcategory(){ //获取所有的图片分类
                this.$http.get('api/getimgcategory').then(result=>{
                    if (result.body.status === 0){
                        result.body.message.unshift({title:'全部',id:0})
                        this.cates = result.body.message;
                    }
                })
            },
            getphotolist(cateId){ //根据分类id获取图片列表
               this.$http.get('api/getimages/' + cateId).then(result=>{
                   if (result.body.status === 0){
                    this.list = result.body.message;
                   }
               })
            }
         }
    }
</script>

<style scoped>
    *{
        touch-action: none;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .photolist{
        padding: 10px 10px 0px;
    }
    .photolist li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 8px #999;
        position: relative;
    }
    .photolist li img{
        width: 100%;
        display: block;
    }
    .photolist li image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .photolist li .info{
        color: #fff;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        max-height: 90px;
    }
    .photolist li .info-title{
        font-size: 12px;
    }
    .photolist li .info-content{
        font-size: 10px;
    }
</style>