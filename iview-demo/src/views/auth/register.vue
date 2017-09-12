<style lang="less">
	.register-box {
    width: 550px;
    margin: 50px auto;
  }
</style>
<template>
    <div class="register-box">
      <h1 class="login-title">个人笔记-注册账号</h1>
      <Form ref="formInline" :model="loginForm" :rules="rules" :label-width="80">
          <Form-item prop="account" label="用户名">
              <Input type="text" v-model="loginForm.account" placeholder="用户名" />
          </Form-item>
          <Form-item prop="password" label="密码">
              <Input type="password" v-model="loginForm.password" placeholder="密码" />
          </Form-item>
          <Form-item prop="name" label="姓名">
              <Input type="text" v-model="loginForm.name" placeholder="姓名" />
          </Form-item>
          <Form-item prop="email" label="邮箱">
              <Input type="text" v-model="loginForm.email" placeholder="邮箱" />
          </Form-item>
          <Form-item label="头像">
            <Upload action="http://127.0.0.1:3000/utils/upload" :on-remove="removeAvator" :on-success="handleSuccess">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </Form-item>
          <Form-item>
              <Button type="primary" @click="handleLogin">注册账号</Button>
          </Form-item>
      </Form>
    </div>
</template>
<script>
  export default {
  	data() {
      return {
        loginForm:{
          account: '',
          password: '',
          name:'',
          email:'',
          avator:''
        },
        avator:'',
        rules:{
          account: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ],
          name:{ required: true, message: '请填写姓名', trigger: 'blur' },
  	 			email:{ required: true, message: '请填写邮箱', trigger: 'blur' }
        }
      };
    },
    methods: {
        handleSuccess(v){
          this.avator = v.path
          console.log(v)
        },
        removeAvator(v){
          this.utils.ajax({
            method: 'post',
            url: '/utils/deletefile',
            data: {
              keys:v.response.key
            }
          }).then((res)=>{
            if(!res.status.code){
              this.$Message.success('删除成功!')
            }
          })
        },
        handleLogin() {
          this.utils.ajax({
            method: 'post',
            url: '/users/auth/add',
            data: {
              account: this.loginForm.account,
              password: this.loginForm.password,
              name:this.loginForm.name,
              email:this.loginForm.email,
              avator:this.loginForm.avator
            }
          }).then((res)=>{
            if(!res.status.code){
              this.$Message.success('注册成功!')
              setTimeOut(()=>{
                this.$router.push("/login")
              },3000)
            }
          })
        }
    }
  };
</script>
