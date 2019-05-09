<template>
    <div class="goodsintroduce">
        <h3>{{introduce.title}}</h3>
        <hr>
        <div class="content" v-html="introduce.content"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id:this.$route.params.id,
                introduce:{}
            }
        },
        created(){
            this.getgoodsintroduce();
        },
        methods:{
            getgoodsintroduce(){
                this.$http.get('api/goods/getdesc/' + this.id).then(result=>{
                    if (result.body.status === 0){
                        this.introduce = result.body.message[0];
                    }
                })
            }
        }
    }
</script>

<style>
    .goodsintroduce h3{
        font-size: 16px;
        color: #007aff;
        text-align: center;
        margin: 15px 0;
    }
    .goodsintroduce{
        padding: 4px;
    }
    .goodsintroduce .content img{
        width: 100%;
    }
</style>