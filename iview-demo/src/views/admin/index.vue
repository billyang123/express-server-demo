<style lang="less" scoped>
  .admin-box {
    margin: 30px;
  }
</style>
<template>
  <div class="admin-box">
    <Cate type="category" title="分类"/>
    <Cate type="tags" title="标签"/>
    <ArticleCate/>
  </div>
</template>
<script>
    import Cate from './cate'
    import ArticleCate from './article'
    export default {
        data () {
            return {

            }
        },
        computed: {

        },
        components: {
          Cate,
          ArticleCate
        },
        created(){

        },
        ready(){

        },
        methods: {

        }
    }
</script>
