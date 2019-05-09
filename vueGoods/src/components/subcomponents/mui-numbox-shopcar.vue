<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" :value="initcount" @change="countchange" ref="input" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import "../../lib/css/mui.css"
    import mui from '../../lib/js/mui.js'
    export default {
        data(){
            return{

            }
        },
        mounted(){
            mui(".mui-numbox").numbox()
        },
        methods:{
            //input里的数据改变的时候即刻触发
            countchange(){
                //每当数量值改变，立即把最新的数量同步到购物车中
                this.$store.commit("updategoodsinfo",{id:this.goodsid,count:this.$refs.input.value})
            }
        },
        props:["initcount","goodsid"],
    }
</script>

<style scoped>

</style>