<template>
    <div class="goodslist">
        <router-link class="goodslist-container" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="money">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="piece">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                pageindex:1 ,//设置分页，默认展示第一页
                goodslist:[] //存放商品列表
            }
        },
        created(){
            this.getgoodslist()
        },
        methods:{
            getgoodslist(){
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                    if (result.body.status === 0){
                        this.goodslist = this.goodslist.concat(result.body.message)
                    }
                })
            },
            getmore(){
                this.pageindex ++
                this.getgoodslist()
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .goodslist{
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;
    }
    .goodslist-container{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 7px #ccc;
        margin: 2px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 285px;
    }
    .goodslist-container img{
        width: 100%;
    }
    .goodslist-container .title{
        font-size: 14px;
    }
    .goodslist-container .now{
        color: red;
        font-size: 18px;
        font-weight: bold;
    }
    .goodslist-container .old{
        text-decoration: line-through;
        font-size: 8px;
    }
    .goodslist-container .info{
        background-color: #eee;
        padding: 5px;
    }
    .goodslist-container .money{
        margin-top: 2px;
        margin-bottom: 10px;
    }
    .goodslist-container .piece{
        display: flex;
        justify-content: space-between;
        font-size: 8px;
    }
</style>