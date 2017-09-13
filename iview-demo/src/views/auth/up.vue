<style lang="less">
	.register-box {
    width: 550px;
    margin: 50px auto;
  }
	.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <div class="register-box">
      <h1 class="login-title">{{type=="register"?"点滴-账号注册":"点滴-账号设置"}}</h1>
      <Form ref="formInline" :model="user" :rules="rules" :label-width="80">
          <Form-item prop="account" label="用户名">
              <Input type="text" disabled v-model="user.account" placeholder="用户名" />
          </Form-item>
          <Form-item prop="name" label="姓名">
              <Input type="text" v-model="user.name" placeholder="姓名" />
          </Form-item>
          <Form-item prop="email" label="邮箱">
              <Input type="text" v-model="user.email" placeholder="邮箱" />
          </Form-item>
          <Form-item label="头像">
						<div class="demo-upload-list" v-for="item in uploadList">
				        <template v-if="item.status === 'finished'">
				            <img :src="item.url">
				            <div class="demo-upload-list-cover">
				                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
				                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
				            </div>
				        </template>
				        <template v-else>
				            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
				        </template>
				    </div>
				    <Upload
				        ref="upload"
				        :show-upload-list="false"
				        :default-file-list="defaultList"
				        :on-success="handleSuccess"
				        :format="['jpg','jpeg','png']"
				        :max-size="2048"
				        :on-format-error="handleFormatError"
				        :on-exceeded-size="handleMaxSize"
				        :before-upload="handleBeforeUpload"
				        multiple
				        type="drag"
				        action="http://127.0.0.1:3000/utils/upload"
				        style="display: inline-block;width:58px;">
				        <div style="width: 58px;height:58px;line-height: 58px;">
				            <Icon type="camera" size="20"></Icon>
				        </div>
				    </Upload>
				    <Modal title="查看图片" v-model="visible">
				        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
				    </Modal>
            <!-- <Upload action="http://127.0.0.1:3000/utils/upload" :on-remove="removeAvator" :on-success="handleSuccess">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload> -->
          </Form-item>
          <Form-item label="职业">
              <Input type="text" v-model="user.profession" placeholder="爱好" />
          </Form-item>
          <Form-item label="QQ">
              <Input type="text" v-model="user.QQ" placeholder="爱好" />
          </Form-item>
					<Form-item prop="hobby" label="爱好">
              <Input type="text" v-model="user.hobby" placeholder="爱好" />
          </Form-item>
					<Form-item prop="motto" label="人生格言">
              <Input type="textarea" v-model="user.motto" placeholder="人生格言" />
          </Form-item>
					<Form-item prop="selfAssessment" label="自我评价">
              <Input type="textarea" v-model="user.selfAssessment" placeholder="自我评价" />
          </Form-item>
          <Form-item>
              <Button type="primary" @click="handleLogin">{{type=="register"?"账号注册":"账号设置"}}</Button>
          </Form-item>
      </Form>
    </div>
</template>
<script>
  export default {
  	data() {
      return {
				defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],

				user:null,
        avator:'',
        rules:{
					account: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          name:{ required: true, message: '请填写姓名', trigger: 'blur' },
  	 			email:{ required: true, message: '请填写邮箱', trigger: 'blur' }
        }
      };
    },
    props: ['type'],
		created(){
      if (this.type == "register") {
        this.user = {
          account: '',
          password: '',
          name:'',
          email:'',
          avator:'',
          hobby:'',
          motto:'',
          selfAssessment:'',
          profession:'',
          QQ:''
        };
      }else{
        this.utils.checkLogin(this)
        this.user = this.utils.getCurUser();
  			if(this.user && this.user.avator){
  				this.defaultList = [{name:this.user.name,url:this.user.avator}]
  			}
      }
		},
    methods: {

			handleView (name) {
					this.imgName = name;
					this.visible = true;
			},
			handleRemove (file) {
					// 从 upload 实例删除数据
					this.utils.ajax({
            method: 'post',
            url: '/api/utils/deletefile',
            data: {
              keys:file.name
            }
          }).then((res)=>{
            if(!res.status.code){
							const fileList = this.$refs.upload.fileList;
							this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            }
          })
					console.log(file)
			},
			handleSuccess (res, file) {
					console.log(res,this.uploadList);
					file.url = res.path;
          file.name = res.key;
					// this.avator = res.path;
					// this.uploadList.push({
					// 	name:res.key,
					// 	url:res.path
					// })
			},
			handleFormatError (file) {
					this.$Notice.warning({
							title: '文件格式不正确',
							desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
					});
			},
			handleMaxSize (file) {
					this.$Notice.warning({
							title: '超出文件大小限制',
							desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
					});
			},
			handleBeforeUpload () {
					const check = this.uploadList.length < 1;
					if (!check) {
							this.$Notice.warning({
									title: '只能上传 1 张图片，可以先删除'
							});
					}
					return check;
			},
        handleLogin() {
          let post = {
            account:this.user.account,
            name:this.user.name,
            email:this.user.email,
            avator:this.uploadList[0].url,
            hobby:this.user.hobby,
            motto:this.user.motto,
            selfAssessment:this.user.selfAssessment,
            profession:this.user.profession,
            QQ:this.user.QQ
          }
          if(this.type!="register"){
            post.id = this.user.id
          }
          this.utils.ajax({
            method: 'post',
            url: '/api/users/auth/update',
            data: post
          }).then((res)=>{
            if(!res.status.code){
              this.$Message.success('保存成功!')
							this.utils.storage.update({'user':res.user});
            }
          })
        }
    },
		mounted () {
        this.uploadList = this.$refs.upload.fileList;
    }
  };
</script>
