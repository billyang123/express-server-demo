<style lang="less" scoped>

</style>
<template>
    <LayOut menu="－1">
        <ArticleBox :content="content"></ArticleBox>
    </LayOut>
</template>
<script>
    import LayOut from '../../components/layout'
    import ArticleBox from '../../components/article'
    export default {
        data () {
            return {
               content:{}
            }
        },
        computed: {

        },
        components: {
            LayOut,
            ArticleBox
        },
        created(){
           	this.utils.ajax({
				method: 'get',
				url: '/api/article/query',
				params: {
				  _id: this.$route.params.id
				}
			}).then((res)=>{
				this.content = res.data[0];
          	})
        },
        ready(){

        },
        methods: {

        }
    }
</script>
