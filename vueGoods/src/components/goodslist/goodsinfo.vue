<template>
    <div class="goodsinfo">
        <!--小球动画-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"“”“>
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        <!--商品轮播图区域-->
        <lunbo :lunbolist="lunbolist" :wide="false"></lunbo>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">

                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    购买数量:
                    <!--将该组件内部的getnumber方法传递给购买数量的子组件，让其在内部调用方法，将count值传递回来-->
                    <numbox @getnumber="getnumber" :max="goodsinfo.stock_quantity"></numbox>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addshopcar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="gogoodsintroduce(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="gogoodscomment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<!--需求：点击按钮+/-号，拿到对应的number值，然后点击添加，让购物车上的元素显示对应的数据
思路：1.按钮和其对应的number值均为子组件身上的，要将子组件身上的值传递给父组件，可以在子组件中通过$emit()调用父组件的方法，同时传一个参数
     2.在父组件data身上定义一个number值，每次子组件调用父组件方法的时候，让传递过来的参数等于该number值
     3.在子组件input身上定义一个change事件，每当input里的值发生改变，就自动调用change方法，在此方法内,让子组件通过$emit()调用父组件的方法，同时传一个参数。-->
<script>
    import mui from '../../lib/js/mui.js'
    import lunbo from '../subcomponents/lunbo.vue'
    import numbox from '../subcomponents/mui-numbox.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,
                lunbolist:[],
                goodsinfo:{},
                ballflag:false,  //控制小球显示隐藏标识符
                number:1     //保存用户选中的商品数量
            }
        },
        created(){
            this.getgoodsinfolunbo();
            this.getgoodsinfo();
        },
        mounted(){//初始化组件
            mui(".mui-numbox").numbox()
        },
        methods:{
            getgoodsinfolunbo(){
                this.$http.get("api/getthumimages/" + this.id).then(result=>{
                    if (result.body.status === 0){
                        //循环每一项，将里面得src赋值给img，与轮播图里的img相呼应
                        result.body.message.forEach(item=>{
                        item.img = item.src
                        })
                        this.lunbolist = result.body.message
                    }
                })
            },
            getgoodsinfo(){ //获取商品详情
                this.$http.get('api/goods/getinfo/' + this.id).then(result=>{
                    if (result.body.status === 0){
                        this.goodsinfo = result.body.message[0];
                    }
                })
            },
            gogoodsintroduce(id){ //点击图文介绍
                this.$router.push({name:'goodsintroduce',params:{id}})
            },
            gogoodscomment(id){  //点击评论
                this.$router.push({name:'goodscomment',params:{id}})
            },
            addshopcar(){
                this.ballflag = !this.ballflag;
                //拼接一个商品数据对象，保存在vuex中
                var shopcar = {id:this.id,count:this.number,price:this.goodsinfo.sell_price,selected:true}
                this.$store.commit("addgoodinfo",shopcar)  //调用vuex中的addshopcar方法，同时传递一个数据
            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)";
            },
            enter(el,done){
                el.offsetWidth;
                //获取元素的页面位置 domObject.getBoundingClientRect()
                //获取小球页面位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //获取购物车的页面位置,注意;在组件中可以通过document.getElementById(badge)的方式拿到页面中的元素，无论此元素是否在该组件中
                const badgePosition = document.getElementById("badge").getBoundingClientRect();
                const Xchange = badgePosition.left - ballPosition.left;
                const Ychange = badgePosition.top - ballPosition.top;
                el.style.transform =  `translate(${Xchange}px,${Ychange}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.31,.68,.67,.93)";
                done();
            },
            afterEnter(el){
                this.ballflag = !this.ballflag
            },
            getnumber(count){
                 //当调用getnumber传入一个count时，将count值赋给number
                 this.number = count
            }
        },
        components:{
            lunbo,
            numbox,
        }
    }
</script>

<style scoped>
    .price .now{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-numbox{
        height: 30px;
        margin: 10px 0;
    }
    .mui-card-footer{
        display: block;
    }
    .mui-card-footer button{
        margin: 15px 0;
    }
    .goodsinfo .ball{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: 400px;
        left: 144px;
        z-index: 99;
    }
</style>