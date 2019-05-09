<template>
    <div class="app-container">
        <!--顶部header区域-->
        <mt-header fixed title="智多星商机">
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        <!--中间路由router-view区域-->
        <transition>
            <router-view></router-view>
        </transition>
        <!--底部tabbar区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-zq" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-zq" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-zq " to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-new"><span class="mui-badge" id="badge">{{$store.getters.getallshopcar}}</span></span>
                <span class="mui-tab-label">购物</span>
            </router-link>
            <router-link class="mui-tab-item-zq" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                flag:false
            }
        },
        created(){
            if (this.$route.path === '/home'){
                this.flag = false
            }else{
                this.flag = true
            }
        },
        methods:{
            goBack(){
                //点击后退
                this.$router.go(-1)
            }
        },
        watch:{
            '$route.path':function(newVal){
                if (newVal === "/home"){
                    this.flag = false
                }else{
                    this.flag = true
                }
            }
        }
    }
</script>

<style scoped>
    .mint-header.is-fixed{
        z-index: 999;
    }
    .app-container{
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;
    }
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
        position: absolute;
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        -ms-transition: all 1s;
        -o-transition: all 1s;
        transition: all 1s;
    }
    .mui-bar-tab .mui-tab-item-zq.mui-active{
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-zq{
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-zq .mui-icon{
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-zq .mui-icon ~ .mui-tab-label{
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>