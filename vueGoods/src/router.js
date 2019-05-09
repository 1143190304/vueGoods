import VueRouter from 'vue-router'
//导入对应的路由组件
import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photolist/photolist.vue'
import photoinfo from './components/photolist/photoinfo.vue'
import goodslist from './components/goodslist/goodslist.vue'
import goodsinfo from './components/goodslist/goodsinfo.vue'
import goodsintroduce from './components/goodslist/goodsintroduce.vue'
import goodscomment from './components/goodslist/goodscomment.vue'
var router = new VueRouter({
    routes:[
        {path:'/',redirect:"/home"},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsinfo},
        {path:'/home/photolist',component:photolist},
        {path:'/home/photoinfo/:id',component:photoinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodsinfo},
        {path:'/home/goodsintroduce/:id',component:goodsintroduce,name:"goodsintroduce"},
        {path:'/home/goodscomment/:id',component:goodscomment,name:"goodscomment"},
    ],
    linkActiveClass:'mui-active', //知识点:覆盖默认的路由高亮的类
    mode:'history',
    base:'/tuntun/',
})
router.beforeEach((to,from,next)=>{
    if(to.fullPath === '/member'){   //如果要跳转的页面是/app，则强制跳转到/login页面
        next('/home')
    }
})
export default router