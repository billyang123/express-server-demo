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
            <Select v-model="writeForm.cate" style="width:300px" placeholder="选择类别">
				        <Option v-for="item in category" :value="item._id" :key="item._id">{{ item.name }}</Option>
				    </Select>
            <Select
                style="width:600px;"
                v-model="writeForm.tags"
                multiple
                filterable
                remote
								:label="defaultTags.label"
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
          <mavon-editor ref="mavonEditor" placeholder="用Markdown方式来写文章" :ishljs="false" @save="$save" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="writeForm.content"/>
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
  import AutoComplete from './AutoComplete';
	import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
  	data() {
      return {
				defaultTags:{},
        article:{},
				mavonEditor:null,
				img_file:{},
        loading: false,
        tagArr:[],
        tagOptions:[],
        tagModal:false,
        showAddTag:false,
				user:{},
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
      	category:[],
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
      'mavon-editor': mavonEditor.mavonEditor
    },
    created(){
			this.utils.checkLogin(this);
			this.mavonEditor = mavonEditor.mavonEditor
			this.user = this.utils.getCurUser(this);
			this.getCategoryList();
			if(this.type == "update"){
				this.getArticle(this.articleId)
      }
    },
    watch:{
      tagStr(){
        console.log(this.tagStr)
      }
    },

    props:['type','articleId'],
    methods: {
      tagModalShow(){
        this.tagModal = true;
      },
      getArticle(id){
        this.utils.ajax({
          method: 'get',
          url: `/api/article/query`,
          data:{
            _id:id
          }
        }).then((res)=>{
					var art = res.data[0]
          this.article = art;
					this.defaultTags = {
						value:[],
						label:[]
					};
					this.tagOptions = art.tags.map((item)=>{
						this.defaultTags.value.push(item._id);
						this.defaultTags.label.push(item.name);
						return {
							label:item.name,
							value:item._id
						}
					});
          console.log(art);
					this.writeForm = {
						title:art.title,
						abstract:art.abstract,
						cate:art.cate?art.cate._id:null,
						tags:this.defaultTags.value,
						content:art.content
					}
        })
      },
      addtagok(){
        this.utils.ajax({
          method: 'post',
          url: '/api/tags/add',
          data: {
            name:this.tagForm.name,
            describe:this.tagForm.describe
          }
        }).then((res)=>{
          this.tagOptions.push({
            value:res.tag._id,
            label:res.tag.name
          })
          this.writeForm.tags.push(res.tag._id);
          this.defaultTags.label.push(res.tag.name)
          this.$Message.success(`添加标签(${res.tag.name})成功`);
        })
      },
      tagChange(v){
				console.log(v);
      },
			getCategoryList(){
				this.utils.ajax({
					method: 'get',
					url: '/api/category/query'
				}).then((res)=>{
					this.category = res.data;
				})
			},
      getTagRemote(query){
        if (query !== '') {
          this.loading = true;
          this.utils.ajax({
            method: 'get',
            url: '/api/tags/query',
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
						var data = {
							title:this.writeForm.title,
							abstract: this.writeForm.abstract,
							content:this.writeForm.content,
							tags:this.writeForm.tags.join(','),
							user:this.user.id,
							cate:this.writeForm.cate
						}
						if(this.type == "update"){
							data.id = this.article.id;
						}
            if (valid) {
							console.log(data);
              this.utils.ajax({
                method: 'post',
                url: `/api/article/write/${this.type}`,
                data: data
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
			uploadImg(){
				var formdata = new FormData();
        for(var _img in this.img_file){
					console.log(_img,this.img_file[_img]);
            formdata.append(_img, this.img_file[_img]);
        }
				this.utils.ajax({
					method: 'post',
					url: '/api/utils/uploadImg',
					data: formdata
				}).then((res)=>{
					console.log(res);
					this.$Message.success('提交成功!')

				})
			},
      $imgAdd(pos,$file){
				this.img_file[pos] = $file;
				this.uploadImg()
      },
			$imgDel(pos){
      	delete this.img_file[pos];
      },
			$save(a,b,c){
				console.log(this.$refs.mavonEditor.$imgUpdateByUrl);
				// console.log(this.mavonEditor)
				this.$refs.mavonEditor.$imgAddByUrl('./0','https://raw.githubusercontent.com/hinesboy/mavonEditor/HEAD/img/example1.png')
				this.$refs.mavonEditor.$img2Url('./0','https://raw.githubusercontent.com/hinesboy/mavonEditor/HEAD/img/example1.png')
				let abc = this.$refs.mavonEditor.$refs.toolbar_left.$imgAddByFilename('./0','https://raw.githubusercontent.com/hinesboy/mavonEditor/HEAD/img/example1.png')
				console.log(this.$refs.mavonEditor.$refs.toolbar_left.$imgAddByFilename,abc);
				// console.log(a,b,c)
			}
    }
  };
</script>
