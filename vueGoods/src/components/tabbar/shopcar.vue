<template>
    <div class="shopcar-container">
        <!--商品购买数量区域-->
        <div class="mui-card" v-for="(item,i) in shopcarlist" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getgoodsSelected[item.id]" @change="selectedchanged(item.id,$store.getters.getgoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <numbox :initcount="$store.getters.getshopcarcount[item.id]" :goodsid="item.id"></numbox>
                            <a href="#" @click.prevent="del(item.id,i)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--商品结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner zongji">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="num">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价￥<span class="num">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <p>{{$store.getters.getgoodsSelected}}</p>
    </div>

</template>
<!--需求：从购物车中获取商品数量
1.创建空对象，循环购物车中所有商品的数据，把当前循环这条商品的id作为对象的属性名，count作为属性值，
循环结束后得到对象{id：count,id2:count2,id3:count3...}-->
<script>
    import numbox from '../subcomponents/mui-numbox-shopcar.vue'
    export default {
         data(){
             return{
                 shopcarlist:[]
             }
         },
        created(){
             this.getshopcarlist()
        },
        methods:{
             getshopcarlist(){  //获取购物车中的商品列表 //获取vuex中所有商品的id 拼接字符串
                 var idArr = []
                 this.$store.state.car.forEach(item=>idArr.push(item.id))
                 if (idArr.length <= 0){ //如果循环以后发现car里没有数据，则return
                     return;
                 }
                 this.$http.get('api/goods/getshopcarlist/' + idArr.join(",")).then(result=>{
                     if (result.body.status === 0){
                        this.shopcarlist = result.body.message
                     }
                 })
             },
             del(id,index){  //点击删除商品
                  this.shopcarlist.splice(index,1)
                  this.$store.commit("delshopcar",id);
             },
            selectedchanged(id,val){
                 this.$store.commit('updateGoodsSelect',{id,selected:val})
            }
        },
         components:{
             numbox
         }
    }
</script>

<style scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
    }
    .shopcar-container .mui-card img{
        width: 60px;
        height: 60px;
    }
    .shopcar-container .mui-card h1{
        font-size: 12px;
    }
    .shopcar-container .mui-card .price{
        color: red;
        font-size: 15px;
    }
    .shopcar-container .mui-card .mui-card-content-inner{
        display: flex;
        align-items: center;
    }
    .shopcar-container .mui-card .mui-card-content-inner .info h1{
        margin: 5px 0;
    }
    .shopcar-container .mui-card .mui-card-content-inner .info p{
        display: flex;
        justify-content: flex-end;
        font-size: 8px;
    }
    .shopcar-container .mui-card .mui-card-content-inner .info p span{
        margin-right: 10px;
        margin-top: 10px;
    }
    .shopcar-container .mui-card .mui-card-content-inner .info p a{
        margin-left: 10px;
        margin-top: 10px;
    }
    .zongji{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .zongji .num{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
</style>