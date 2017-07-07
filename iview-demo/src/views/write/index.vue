<style lang="less">
	.write {
		padding: 30px;
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
            <Select v-model="writeForm.category" style="width:200px" placeholder="选择类别">
				        <Option v-for="item in category" :value="item.value" :key="item">{{ item.label }}</Option>
				    </Select>
						<AutoComplete></AutoComplete>
        </Form-item>
        <Form-item>
          <mavonEditor :ishljs="false" v-model="writeForm.content"/>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')">保存文章</Button>
        </Form-item>
    	</Form>
    </div>
</template>
<script>
  import AutoComplete from '../../components/AutoComplete';
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
  	data() {
      return {
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
        	tags:''
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
    methods: {
        
    }
  };
</script>