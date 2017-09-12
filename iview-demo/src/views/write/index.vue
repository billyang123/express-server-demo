<style lang="less">
	.write {
		padding: 30px;
	}
  .v-note-wrapper {
    z-index: 99 !important;
  }
  .ivu-modal-confirm-footer {
    margin-top: 0 !important;
  }
</style>
<template>
    <div class="write">
    	<Form ref="writeForm" :model="writeForm" :rules="writeRule">
        <Form-item prop="title">
            <Input type="text" v-model="writeForm.title" placeholder="标题:用Markdown方式来写文章"></Input>
        </Form-item>
        <Form-item prop="abstract">
            <Input type="text" v-model="writeForm.abstract" placeholder="摘要：marked负责解析md，highlight负责高亮代码之类"></Input>
        </Form-item>
        <Form-item>
            <Select v-model="writeForm.category" style="width:300px" placeholder="选择类别">
				        <Option v-for="item in category" :value="item.value" :key="item">{{ item.label }}</Option>
				    </Select>
            <Select
                style="width:600px;"
                v-model="writeForm.tags"
                multiple
                filterable
                remote
                placeholder="标签选择"
                not-found-text="无匹配标签，需要的话请添加新标签..."
                @on-change="tagChange"
                :remote-method="getTagRemote"
                :loading="loading">
                <Option v-for="option in tagOptions" :value="option.value" :key="option.value">{{option.label}}</Option>
            </Select>
            <Button type="primary" icon="ios-search" @click="tagModalShow"  v-show="showAddTag">添加新标签</Button>
						<!-- <AutoComplete v-model="tagStr"></AutoComplete> -->
        </Form-item>
        <Form-item>
          <mavonEditor placeholder="用Markdown方式来写文章" :ishljs="false" @imgAdd="imgAdd" v-model="writeForm.content"/>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit()">保存文章</Button>
        </Form-item>
    	</Form>
      <Modal
          v-model="tagModal"
          title="添加标签"
          @on-ok="addtagok"
      >
          <div style="padding:10px 0" ref="tagForm">
              <Form :model="tagForm" :rules="tagRule">
                  <Form-item prop="name">
                      <Input type="text" v-model="tagForm.name" placeholder="标签名称..."></Input>
                  </Form-item>
                  <Form-item prop="describe">
                      <Input type="textarea" v-model="tagForm.describe" placeholder="标签描述..."></Input>
                  </Form-item>
              </Form>
          </div>
      </Modal>
    </div>
</template>
<script>
  import AutoComplete from '../../components/AutoComplete';
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
  	data() {
      return {
        loading: false,
        tagArr:[],
        tagOptions:[],
        tagModal:false,
        showAddTag:false,
        tagForm: {
            name: '',
            describe: ''
        },
        tagRule: {
            name: [
                { required: true, message: '请填写标签名称', trigger: 'blur' }
            ],
            describe: [
                { required: true, message: '请填写标签描述', trigger: 'blur' },
                { type: 'string', min: 15, message: '长度不够', trigger: 'blur' }
            ]
        },
      	category:[
      		{
      			value:1,
      			label:"前端"
      		},{
      			value:2,
      			label:"后端"
      		},{
      			value:3,
      			label:"IOS"
      		},{
      			value:4,
      			label:"Android"
      		}
      	],
        writeForm:{
        	title:'',
          abstract: '',
          content:'',
          tags:[],
          user:'5960be9de96c824070086094',
          category:'5960bef7acdacd4121234b4f'
        },
        writeRule:{
        	title: [
              { required: true, message: '请填写标题', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      };
    },
    components: {
    	AutoComplete,
      mavonEditor
    },
    created(){
      console.log(this.utils)
    },
    watch:{
      tagStr(){
        console.log(this.tagStr)
      }
    },
    methods: {
      tagModalShow(){
        this.tagModal = true;
      },
      addtagok(){
        this.utils.ajax({
          method: 'post',
          url: '/tags/add',
          data: {
            name:this.tagForm.name,
            describe:this.tagForm.describe
          }
        }).then((res)=>{
          this.tagOptions.push(res.tag)
          this.$Message.success(`添加标签(${res.tag.name})成功`);
        })
      },
      tagChange(v){

      },
      getTagRemote(query){
        if (query !== '') {
          this.loading = true;
          this.utils.ajax({
            method: 'get',
            url: '/tags/query',
            params: {
              key: query
            }
          }).then((res)=>{
            this.loading = false;
            if(res.data.length==0){
              this.showAddTag = true;
            }else{
              this.showAddTag = false;
            }
            const list = res.data.map(item => {
                return {
                    value: item._id,
                    label: item.name
                };
            });
            this.tagOptions = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          })
        } else {
          this.showAddTag = false;
          this.tagOptions = [];
        }
      },
      handleSubmit(){
        console.log(this.writeForm)
        this.$refs.writeForm.validate((valid) => {
            if (valid) {
              this.utils.ajax({
                method: 'post',
                url: '/article/add',
                data: {
                  title:this.writeForm.title,
                  abstract: this.writeForm.abstract,
                  content:this.writeForm.content,
                  tags:this.writeForm.tags.join(','),
                  user:'5960be9de96c824070086094',
                  category:'5960bef7acdacd4121234b4f'
                }
              }).then((res)=>{
                this.$Message.success('提交成功!')
                if(res.article){
                  console.log(res)
                  //this.setBaseInfo(res.user)
                }
              })
            } else {
                this.$Message.error('表单验证失败!');
            }
        })
      },
      imgAdd(a,b){
        console.log(a,b)
        console.log(this.writeForm)
      }
    }
  };
</script>
