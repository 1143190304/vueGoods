<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>访问：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <!--导入注册的其他子组件-->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    //导入评论子组件
    import comment from '../subcomponents/comment.vue'
    import Toast from "mint-ui"
    export default {
        data(){
            return{
                newsinfo:{},
                id:this.$route.id//将传来的id挂在到data上方便调用
            }
        },
        created(){
            this.getnewsinfo();
        },
        methods:{
            getnewsinfo(){
                this.$http.get('api/getnew' + this.id).then(result=>{
                    if (result.body.status === 0 ){
                        this.newsinfo = result.body.message[0];
                        Toast('获取新闻成功')
                    } else{
                        Toast('获取新闻失败')
                    }
                })
            }
        },
        components:{//用来注册子组件
            'comment-box':comment
        }
    }
</script>

<style scoped>
     .newsinfo-container{
         padding: 0 5px;
     }
     .newsinfo-container .title{
         font-size: 16px;
         text-align: center;
         margin: 15px 0;
         color: red;
     }
     .newsinfo-container .subtitle{
         font-size: 13px;
         color: #226aff;
         display: flex;
         justify-content: space-between;
     }
     .newsinfo-container .content{

     }
</style>