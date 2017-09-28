<style lang="less">
.admin-item {
  margin-bottom: 20px;
  .title {
    margin-bottom: 20px;
  }
  .ivu-btn {
    margin-bottom: 20px;
  }
}
</style>
<template>
  <div class="admin-item">
    <h2 class="title">{{title}}</h2>
    <Button icon="ios-plus-empty" type="dashed" size="small" @click="addCat">添加{{title}}</Button>
    <Table :columns="cateColumns" :data="catList"></Table>
    <Modal
        v-model="show"
        :title="catModalTitle"
        @on-ok="onOk"
        @on-cancel="cancel">
        <Form :model="catModalForm" :ref="type+catOptionType" :rules="rules">
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
                catModalTitle:'',
                catOptionType:'add',
                catList:[],
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
                                        this.updateCat(params.index)
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

                                      this.delCat(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                  }
                ],
                show:false,
                rules:{
                  name:[],
                  describe:[]
                }
            }
        },
        computed: {

        },
        components: {

        },
        created(){
           	this.getCatList(this.type)
            this.rules = {
              name: [
                  { required: true, message: `请填写${this.title}名称`, trigger: 'blur' }
              ],
              describe: [
                  { required: true, message: `请填写${this.title}描述`, trigger: 'blur' },
                  { type: 'string', min: 15, message: '长度不够', trigger: 'blur' }
              ]
            }
        },
        ready(){

        },
        props:["type","title"],
        methods: {
          getCatList(type){
            this.utils.ajax({
      				method: 'get',
      				url: `/api/admin/${type}`
      			}).then((res)=>{
      				this.catList = res.data;
              console.log(this.catList);
          	})
          },
          addCat(){
            this.catModalTitle = `添加${this.title}`
            this.catModalForm  = {
              name:'',
              describe:''
            }
            this.catOptionType = "add";
            this.show = true;
          },
          updateCat(index){
            this.catModalTitle = `更新${this.title}`
            this.catModalForm  = this.catList[index];
            this.catOptionType = "update";
            this.show = true;
          },
          delCat(index){
            this.catModalTitle = `删除${this.title}`
            this.catModalForm  = this.catList[index];
            this.catOptionType = "delete";
            this.$Modal.warning({
                title: '警告',
                content: '是否'+this.catModalTitle,
                onOk:this.onOk.bind(this)
            });
          },
          onOk(){
            const type = this.catCurType;
            let data = {},successTxt="保存成功"
            if(this.catOptionType == "add" || this.catOptionType == "update"){

              this.$refs[this.type+this.catOptionType].validate((valid) => {
                  if (valid) {
                    successTxt = `添加${this.type}成功`

                    data = {
                      name:this.catModalForm.name,
                      describe:this.catModalForm.describe
                    }
                    if(this.catOptionType == "update") {
                      data.id = this.catModalForm.id;
                      successTxt = `修改${this.type}成功`
                    }
                    this.postData(data,successTxt)
                  } else {
                      this.$Message.error('表单验证失败!');
                  }
              })
            }else if(this.catOptionType == "delete"){
              data = {
                id:this.catModalForm.id
              }
              successTxt = `删除${this.type}成功`
              this.postData(data,successTxt)
            }else{}
          },
          postData(data,successTxt){
            this.utils.ajax({
              method: 'post',
              url: `/api/admin/${this.type}/${this.catOptionType}`,
              data:data
            }).then((res)=>{
              if(!res.status.code){
                this.$Message.success(successTxt)
                // this.getCatList(this.type)
              }
            })
          },
          cancel(){

          }
        }
    }
</script>
