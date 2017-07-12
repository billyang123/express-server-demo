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
    <LoayOut menu="1">
        <Card class="article-item" v-for="item in list" key="_id">
            <p slot="title">{{item.title}}</p>
            <p slot="extra" class="article-meta">
                {{moment(item.createTime).fromNow()}} by {{item.user.name}}
            </p>
            <p>摘要：{{item.abstract}} <a :href="'/article/'+item._id">查看详情</a></p>
            <div class="cart-foot">
                <Tag v-for="tag in item.tags" key="_id"><Icon type="pricetag"></Icon> {{tag.name}}</Tag>
            </div>
        </Card>
    </LoayOut>
</template>
<script>
    import LoayOut from '../components/loayout'
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
            LoayOut
        },
        created(){
            console.log(this.setCookie)
            console.log(this.$store.state.user)
           this.utils.ajax({
                method: 'get',
                url: '/article/query',
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