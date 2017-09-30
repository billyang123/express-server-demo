<style lang="less">
.admin-item {
  margin-bottom: 20px;
  .title {
    margin-bottom: 20px;
  }
  .ivu-btn {
    margin: 5px;
  }
  .ivu-page {
    text-align: right;
    padding: 10px 0;
  }
}
</style>
<template>
  <div class="admin-item">
    <h2 class="title">文章</h2>
    <Table :columns="cateColumns" :data="list"></Table>
    <Page :total="total" :page-size="pageSize" show-sizer show-total></Page>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                list:[],
                total:0,
                pageSize:10,
                cateColumns:[
                  {
                    title: 'ID',
                    key: 'id',
                  },
                  {
                    title: '标题',
                    key: 'title',
                  },{
                    title:'副标题',
                    key:'abstract'
                  },
                  {
                    title:'作者',
                    key:'user',
                    render: (h, params) => {
                      return params.row.user.name
                    }
                  },
                  {
                    title:'类别',
                    key:'category',
                    render: (h, params) => {
                      return params.row.cate.name
                    }
                  },
                  {
                    title:'标签',
                    key:'tags',
                    render: (h, params) => {
                      return params.row.tags.map((item)=>{
                        return item.name
                      }).join(',')
                    }
                  },
                  {
                    title:'创建时间',
                    key:'createTime'
                  },
                  {
                    title:'修改时间',
                    key:'updateTime'
                  },
                  {
                    title:'状态',
                    key:'online',
                    render: (h, params) => {
                      return params.row.online?'已上线':'已下线'
                    }
                  },
                  {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                      let arr = [
                        h('Button', {
                            props: {
                                type: params.row.online?'warning':'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                  console.log(params);
                                  if(params.row.online){
                                    this.setLine(params.row,'offline',params.index)
                                  }else{
                                    this.setLine(params.row,'online',params.index)
                                  }

                                }
                            }
                        }, params.row.online?'下线':'上线'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {

                                  this.delItem(params.row,params.index)
                                }
                            }
                        }, '删除')
                      ]

                      return h('div',arr);
                    }
                  }
                ],
            }
        },
        computed: {

        },
        components: {

        },
        created(){
           	this.getList()
        },
        ready(){

        },
        methods: {
          setLine(params,t,index){
            this.$Modal.confirm({
                title: '提示',
                content: `<p>是否设置文章《${params.title}》为${t=='offline'?'下线':'上线'}状态？</p>`,
                onOk: () => {
                  this.utils.ajax({
            				method: 'post',
            				url: `/api/admin/article/${t}`,
                    data:{
                      id:params.id
                    }
            			}).then((res)=>{
                    this.list[index].online = t=='online'?true:false
                    this.$Message.info(`文章《${params.title}》${t=='offline'?'下线':'上线'}`);
                	})
                },
                onCancel: () => {

                }
            });
          },
          delItem(params,index){
            this.$Modal.confirm({
                title: '提示',
                content: `<p>是否删除文章《${params.title}》?<br/>删除后，文章将不复存在</p>`,
                onOk: () => {
                  this.utils.ajax({
            				method: 'post',
            				url: `/api/admin/article/delete`,
                    data:{
                      id:params.id
                    }
            			}).then((res)=>{
                    this.list.splice(index,1)
                    this.$Message.info(`成功删除文章《${params.title}》`);
                	})
                },
                onCancel: () => {

                }
            });
          },
          getList(params){
            let _params = Object.assign({},{
              pageSize:10,
              currentPage:1
            },params)
            this.utils.ajax({
      				method: 'get',
      				url: `/api/admin/article`,
              params:_params
      			}).then((res)=>{
      				this.list = res.data;
              this.total = res.pagin.total;
          	})
          }
        }
    }
</script>
