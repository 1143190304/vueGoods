<template>
    <div>
        <h3>商品评论</h3>
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id
            }
        },
        components:{
            comment
        }

    }
</script>

<style scoped>

</style>