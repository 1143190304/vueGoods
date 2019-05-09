<template>
    <div class="mui-numbox" :data-numbox-max='max' data-numbox-min='0'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" value="1" @change="countchange" ref="input"/>
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
                //触发父组件的getnumber事件
                this.$emit('getnumber',parseInt(this.$refs.input.value))
            }
        },
        props:["max"],
        watch:{   //监听属性的改变
            'max':function(newVal){
                mui(".mui-numbox").numbox().setOption('max',newVal)
            }
        }
    }
</script>

<style scoped>

</style>