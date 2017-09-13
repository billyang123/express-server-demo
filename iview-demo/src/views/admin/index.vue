<style lang="less" scoped>

</style>
<template>
  <div>
    <div class="addCategory">
      <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd('cat')">添加类别</Button>
      <Table :columns="cateColumns" :data="categoryList"></Table>
    </div>
    <Modal
        v-model="catModalShow"
        title="添加类别"
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
                curCatModal:'cat',
                cateColumns:[
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
                                        this.handleEdit('cat',params.index)
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

                                      this.handleDel('cat',params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                  }
                ],
               categoryList:[],
               catModalShow:false,
               catModalForm:{
                 name:'',
                 describe:''
               },
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
           	this.getCatList()
        },
        ready(){

        },
        methods: {
          getCatList(){
            this.utils.ajax({
      				method: 'get',
      				url: '/api/admin/category'
      			}).then((res)=>{
      				this.categoryList = res.data;
          	})
          },
          onOk(){
            this.utils.ajax({
      				method: 'post',
      				url: '/api/admin/category/add',
              data:{
                name:this.catModalForm.name,
                describe:this.catModalForm.describe
              }
      			}).then((res)=>{
              if(!res.status.code){
                this.$Message.success('保存成功!')
                this.getCatList()
              }
          	})
          },
          cancel(){

          },
          handleDel(t,index){
            this.$Modal.warning({
                title: '警告',
                content: '确定删除！',
                onOk:()=>{
                  this.utils.ajax({
            				method: 'post',
            				url: '/api/admin/category/delete',
                    data:{
                      id:this.catModalForm._id
                    }
            			}).then((res)=>{
                    if(!res.status.code){
                      this.$Message.success('删除成功!')
                      this.getCatList()
                    }
                	})
                }
            });
          },
          handleEdit(t,index){
            this.curCatModal = t;
            this.catModalForm = this.categoryList[index];
            if(t == 'cat'){
              this.catModalShow = true;
            }
          },
          handleAdd(e){
            console.log(e);
            this.curCatModal = e;
            if(e == 'cat'){
              this.catModalShow = true;
            }
          }
        }
    }
</script>
