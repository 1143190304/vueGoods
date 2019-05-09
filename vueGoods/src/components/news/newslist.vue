<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                       <h1>{{item.title}}</h1>
                        <p class="mui-ellipais">
                            <span>发表时间：{{item.add_time | dateFormat('YYY-MM-DD HH:mm:ss')}}</span>
                            <span>访问：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                newslist:[] //新闻列表
            }
        },
        created(){
            this.getnewslist()
        },
        methods:{
            getnewslist(){
                this.$http.get("api/getnewslist").then(result=>{
                    if (result.body.status === 0){
                          this.newslist = result.body.message
                          Toast("获取新闻咨询")
                    } else{
                          Toast("获取新闻列表失败")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .mui-media-body h1{
        font-size: 14px;
    }
    .mui-media-body p{
        color: #007aff;
        font-size: 10px;
        display: flex;
        justify-content: space-between;
    }
</style>