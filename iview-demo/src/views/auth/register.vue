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
              <Input type="text" v-model="loginForm.password" placeholder="姓名" />
          </Form-item>
          <Form-item prop="email" label="邮箱">
              <Input type="text" v-model="loginForm.password" placeholder="邮箱" />
          </Form-item>
          <Form-item label="头像">
            <Upload action="http://127.0.0.1:3000/utils/upload">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </Form-item>
          <Form-item>
              <Button type="primary" @click="handleLogin">注册账号</Button>
          </Form-item>
      </Form>
      <form id='editfile' method='post' action='http://127.0.0.1:3000/utils/upload' enctype='multipart/form-data'>
          <input name="text" type="text"/>
          选择图片：<input name="avatar" id='upfile' type='file'/>
          <input type='submit' value='提交'/>
      </form>
    </div>
</template>
<script>
  export default {
  	data() {
      return {
        loginForm:{
          account: '',
          password: ''
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
        handleLogin() {
          this.utils.ajax({
            method: 'post',
            url: '/users/auth/add',
            data: {
              account: this.loginForm.account,
              password: this.loginForm.password,
              name:this.loginForm.name,
              email:this.loginForm.email,
              avator:this.avator
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
