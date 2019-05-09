//导入icons样式
import './lib/css/icons-extra.css'

// 导入app根组件
import app from './App.vue'

//按需导入mint-ui组件
// import {Header} from 'mint-ui'
// Vue.component(Header.name, Header)
//全局导入mint-ui组件
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入MUI的样式
import './lib/css/mui.css'

//导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入自己的router.js路由模块
import router from './router.js'

//导入vue-resource包，安装
import VueResource from 'vue-resource'
Vue.use(VueResource)

//全局设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';

//导入Toast弹框
import {Toast} from 'mint-ui'//注意：即使全局导入了mint-ui组件。在使用弹框的时候依然要单独导入
Vue.use(Toast)

//导入格式化时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="Y-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
});

//导入axios
import axios from 'axios'
//将axios绑定在vue原型上,这样就可以在其他组件中通过this.$axios去使用axios发送请求
Vue.prototype.$axios = axios;

//全部设置post表单数据格式
Vue.http.options.emulateJSON = true;

//导入缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//导入全局样式（为缩略图提供样式展示）
import "./lib/css/golbal.css"

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex);
var car = JSON.parse(localStorage.getItem('car' || []));
const store = new Vuex.Store({
    state:{
        car:car     //存储购物车里的商品数据,{id:,count:,单价：,是否选中：true/false}
    },
    mutations:{
        addgoodinfo(state,shopcar){  //定义一个方法，点击加入购物车，将商品数据保存在state中
             var key = false;  //定义一个标识符，用来判断原来car中没有对应的数据
             state.car.some(item =>{   //在state.car身上循环查找数据
                 if (item.id == shopcar.id){   //如果传递过来的shopcar对应的id已经可以查到数据
                     item.count += parseInt(shopcar.count);//则在数量上递增
                     key = true;
                     return true    //终止查找
                 }
             });
            if (!key){   //如果原来的car循环完毕后中有对应的数据，即key=false,则直接push进去
                state.car.push(shopcar)
            }
            //将最新的car存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updategoodsinfo(state,shopcar){ //修改购物车中的商品数量值
             state.car.some(item=>{
                 if (item.id == shopcar.id){
                     item.count = parseInt(shopcar.count);
                     return true
                 }
             })
            //修改完商品数量 ，把最新的购物车数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        delshopcar(state,id){
             state.car.some((item,i)=>{
                 if (item.id == id){
                     state.car.splice(i,1)
                     return true
                 }
             })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelect(state,info){
            state.car.some(item=>{
                if (item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{   //相当于计算属性，可以监听state上面的数据，当发生改变的时候可以计算
        getallshopcar(state){
             var num = 0;
             state.car.forEach(item=>{
                 num += item.count
             });
            return num
        },
        getshopcarcount(state){
            var shopcarobj = {};
            state.car.forEach(item=>{
                shopcarobj[item.id] = item.count
            });
            return shopcarobj
        },
        getgoodsSelected(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id]  = item.selected;
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,   //勾选数量
                amount:0   //勾选总价
            }
            state.car.forEach(item=>{
                if (item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
});


var vm = new Vue({
    el:"#app",
    render:c => c(app),
    // components:{app,Toast},
    router,
    store
})