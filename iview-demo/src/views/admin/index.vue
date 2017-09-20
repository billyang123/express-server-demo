<style lang="less" scoped>
  .admin-box {
    width: 1024px;
    margin: 30px auto;
  }
</style>
<template>
  <div class="admin-box">
    <Cate type="category" title="分类"/>
    <Cate type="tags" title="标签"/>
  </div>
</template>
<script>
    import Cate from './cate'
    export default {
        data () {
            return {

            }
        },
        computed: {

        },
        components: {
          Cate
        },
        created(){

        },
        ready(){

        },
        methods: {

        }
    }
</script>
