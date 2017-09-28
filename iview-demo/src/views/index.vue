<style lang="less">
    .article-meta {
        text-align: right;
    }
    .article-item {
        margin: 10px 0;
    }
    .cart-foot {
        margin-top: 10px;
    }
</style>
<template>
    <LayOut :current="0">
      <Card class="article-item" v-for="item in list" key="_id">
          <p slot="title">{{item.title}}</p>
          <p slot="extra" class="article-meta">
              {{moment(item.createTime).fromNow()}} by <router-link v-if="item.user" :to="'/user/'+item.user._id">{{item.user.name}}</router-link>
          </p>
          <p>摘要：{{item.abstract}} <router-link :to="'/article/'+item._id">查看详情</router-link></p>
          <div class="cart-foot">
              <Tag v-for="tag in item.tags" key="_id"><Icon type="pricetag"></Icon> {{tag.name}}</Tag>
          </div>
      </Card>
    </LayOut>
</template>
<script>
    //import LoayOut from '../components/loayout'
    import LayOut from '../components/layout'
    import moment from 'moment'
    export default {
        data () {
            return {
               list:[],
               moment:moment
            }
        },
        computed: {

        },
        components: {
            LayOut
        },
        created(){
            console.log(this.setCookie)
            console.log(this.$store.state.user)
           this.utils.ajax({
                method: 'get',
                url: '/api/article/query',
                params: {
                    //updateTime:-1
                  // _id: this.$route.params.id
                }
            }).then((res)=>{
                this.list = res.data;
            })
        },
        methods: {

        }
    }
</script>
