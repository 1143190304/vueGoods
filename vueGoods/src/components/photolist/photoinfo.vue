<template>
    <div class="photoinfo-container">
        <h3>{{photoinfolist.title}}</h3>
        <p class="photoinfo-title">
            <span>发表时间：{{photoinfolist.add_time | dateFormat}}</span>
            <span>访问：{{photoinfolist.click}}次</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="slides" @close="handleClose"></vue-preview>
        </div>
        <!--以下为老版本的缩略图已不适用
        <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index,list)" :key="item.src">-->
        <!--图片内容区-->
        <div class="content" v-html="photoinfolist.content"></div>
        <!--评论子组件-->
        <photoinfo :id="this.id"></photoinfo>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,
                photoinfolist:{},  //图片详情
                slides: []//缩略图的数组
            }
        },
        created(){
            this.getphotoinfo();
            this.getthumbs();
        },
        methods:{
            getphotoinfo(){
                this.$http.get("api/getimageInfo/" + this.id).then(result=>{
                    if(result.body.status === 0){
                        this.photoinfolist = result.body.message[0];
                    }
                })
            },
            getthumbs(){ //获取缩略图
                this.$http.get('api/getthumimages/' + this.id).then(result=>{
                    if(result.body.status === 0){
                        result.body.message.forEach(item=> { //遍历接收到的数组每一项,给每个图片增加宽高
                             item.w = 600
                             item.h = 400
                             item.msrc = item.src
                        })
                        this.slides = result.body.message;
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{ //导入评论组件
            "photoinfo":comment
        }
    }
</script>

<style scoped>
    .photoinfo-container{
        padding: 3px;
    }
    .photoinfo-container h3{
        color: #007aff;
        font-size: 15px;
        text-align: center;
        margin: 15px auto;
    }
    .photoinfo-title{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
    .content {
        font-size: 10px;
        line-height: 35px;
    }
</style>