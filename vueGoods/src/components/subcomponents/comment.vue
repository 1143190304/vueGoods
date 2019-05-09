<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入内容...(最多不超过120个字)" maxlength="120"
        v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postcomments">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i + 1}}楼&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                   {{item.content === 'undefined' ? '此用户无评论':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>
<!--加载更多思路：为按钮绑定点击事件，请求下一页数据
    pageindex++,重新调用getComments()，重新获取最新一页的数据
    this.comments = this.comments.concat(result.body.message)进行新老数据拼接
    -->
<!--发表评论思路：
为文本框双向绑定，
再绑定一个事件
校验评论内容是否为空，提示用户评论内容不能为空
通过vue-resourec发送请求，把评论内容交给服务器
当发表评论后，通过unshift方法把最新的评论追加到comments最前面-->
<script>
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                pageindex:1, //默认展示第一页数据
                comments:[], //所有评论数据
                msg:''// 评论输入内容
            }
        },
        created(){
            this.getComments();
        },
        methods:{
            getComments(){
                this.$http.get("api/getcomments/"+this.id+"?pageindex=this.pageindex").then(result=>{
                    if (result.body.status === 0){
                         // this.comments = result.body.message;
                         this.comments = this.comments.concat(result.body.message)
                        //以上数据拼接的操作是为了防止加载更多以后清空了之前的数据
                    } else{
                        Toast('加载失败')
                    }
                })
            },
            getmore(){
                this.pageindex ++;
                this.getComments();
            },
            postcomments(){
                //校验内容是否为空
                if (this.msg.trim().length === 0){
                    return Toast("评论内容不能为空");
                }
                //参数一：url
                //参数二：提交给服务器的数据对象
                //参数三：定义提交时表单中数据格式（emulateJSON:true）
                this.$http.post("api/postcomment/" + this.id,{content:this.msg.trim()
                }).then(function(result){
                    if (result.body.status === 0){
                        var cmt = {user_name:"匿名用户",add_time:Date.now(),content:this.msg.trim()};
                        this.comments.unshift(cmt);
                        this.msg = ""
                    }
                })
            }
        },
        props:["id"]
    }
</script>

<style scoped>
    .cmt-container h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
    }
    .cmt-list .cmt-item{
        font-size: 13px;
        height: 60px;
    }
    .cmt-list .cmt-item .cmt-title{
        background-color: #ccc;
        line-height: 30px;
    }
    .cmt-list .cmt-item .cmt-body{
        line-height: 30px;
        text-indent: 2em;
    }
</style>