<style lang="less" scoped>
    
</style>
<template>
    <LoayOut menu="－1">
        <ArticleBox :content="content"></ArticleBox>
    </LoayOut>
</template>
<script>
    import LoayOut from '../../components/loayout'
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
            LoayOut,
            ArticleBox
        },
        created(){
           	this.utils.ajax({
				method: 'get',
				url: '/article/query',
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