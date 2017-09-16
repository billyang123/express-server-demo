<style lang="less" scoped>
  .admin-box {
    width: 1024px;
    margin: 30px auto;
  }
  .title {
    margin-bottom: 20px;
  }
  .addCategory {
    margin-bottom: 20px;
    .ivu-btn {
      margin-bottom: 20px;
    }
  }
</style>
<template>
  <div class="admin-box">
    <div class="addCategory">
      <h2 class="title">Category</h2>
      <Button icon="ios-plus-empty" type="dashed" size="small" @click="addCat('category')">添加{{cfg.category.name}}</Button>
      <Table :columns="cateColumns" :data="catList['category']"></Table>
    </div>
    <div class="addCategory">
      <h2 class="title">tags</h2>
      <Button icon="ios-plus-empty" type="dashed" size="small" @click="addCat('tags')">添加{{cfg.tags.name}}</Button>
      <Table :columns="cateColumns" :data="catList['tags']"></Table>
    </div>
    <Modal
        v-model="catModalShow"
        :title="catModalTitle"
        @on-ok="onOk"
        @on-cancel="cancel">
        <Form :model="catModalForm" :rules="catModalFormRule">
            <Form-item prop="name">
                <Input type="text" v-model="catModalForm.name" placeholder="标签名称..."></Input>
            </Form-item>
            <Form-item prop="describe">
                <Input type="textarea" v-model="catModalForm.describe" placeholder="标签描述..."></Input>
            </Form-item>
        </Form>
    </Modal>
  </div>
</template>
<script>

    export default {
        data () {
            return {
                cfg:{
                  category:{
                    name:'分类'
                  },
                  tags:{
                    name:'标签'
                  }
                },
                catModalTitle:'添加类别',
                catOptionType:'add',
                catList:{
                  category:[],
                  tags:[]
                },
                catCurType:'category',
                catModalForm:{
                  name:'',
                  describe:''
                },
                cateColumns:[
                  {
                    title: 'ID',
                    key: '_id',
                  },
                  {
                    title: '类名',
                    key: 'name',
                  },{
                    title:'描述',
                    key:'describe'
                  },
                  {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updateCat(this.catCurType,params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {

                                      this.delCat(this.catCurType,params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                  }
                ],
                catModalShow:false,
               catModalFormRule:{
                 name: [
                     { required: true, message: '请填写分类名称', trigger: 'blur' }
                 ],
                 describe: [
                     { required: true, message: '请填写分类描述', trigger: 'blur' },
                     { type: 'string', min: 15, message: '长度不够', trigger: 'blur' }
                 ]
               }
            }
        },
        computed: {

        },
        components: {

        },
        created(){
           	this.getCatList('category')
            this.getCatList('tags')
        },
        ready(){

        },
        methods: {
          getCatList(type){
            this.utils.ajax({
      				method: 'get',
      				url: `/api/admin/${type}`
      			}).then((res)=>{
      				this.catList[type] = res.data;
              console.log(this.catList);
          	})
          },
          addCat(type){
            this.catModalTitle = `添加${this.cfg[type].name}`
            this.catCurType = type;
            this.catModalForm  = {
              name:'',
              describe:''
            }
            this.catOptionType = "add";
            this.catModalShow = true;
          },
          updateCat(type,index){
            this.catModalTitle = `更新${this.cfg[type].name}`
            this.catCurType = type;
            this.catModalForm  = this.catList[type][index];
            this.catOptionType = "update";
            this.catModalShow = true;
          },
          delCat(type,index){
            this.catModalTitle = `删除${this.cfg[type].name}`
            this.catCurType = type;
            this.catModalForm  = this.catList[type][index];
            this.catOptionType = "delete";
            this.catModalShow = true;
          },
          onOk(){
            let data = {},successTxt="保存成功"
            if(this.catOptionType == "add"){
              data = {
                name:this.catModalForm.name,
                describe:this.catModalForm.describe
              }
              successTxt = `添加${this.cfg[type].name}成功`
            }else if(this.catOptionType == "delete"){
              data = {
                id:this.catModalForm._id
              }
              successTxt = `删除${this.cfg[type].name}成功`
            }else if(this.catOptionType == "update"){
              data = {
                id:this.catModalForm._id,
                name:this.catModalForm.name,
                describe:this.catModalForm.describe
              }
              successTxt = `修改${this.cfg[type].name}成功`
            }
            this.utils.ajax({
              method: 'post',
              url: `/api/admin/${this.catCurType}/${this.catOptionType}`,
              data:data
            }).then((res)=>{
              if(!res.status.code){
                this.$Message.success(successTxt)
                this.getCatList(this.catCurType)
              }
            })
          },
          cancel(){

          }
        }
    }
</script>
