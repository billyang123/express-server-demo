<style lang="less">
	.login-title {
		color: #fff;
		margin-bottom: 30px;
	}
	#particles-js {
	    background-image: url(../../images/login_background.jpg);
	    background-size: cover;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	}
  .auth-box {
      width: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      text-align: center;
  }
  .login-box {
  	width: 300px;
  	position: absolute;
  	left: 50%;
  	margin-left: -150px;
  	z-index: 99;
  	top: 50%;
  	margin-top: -100px;
  }
  .input-item {
  	margin-bottom: 10px;
  }
</style>
<template>
    <div class="auth-box">
    		<div class="login-box">
    			<h1 class="login-title">个人笔记</h1>
          <Form ref="formInline" :model="loginForm" :rules="rules">
              <Form-item prop="account">
                  <Input type="text" v-model="loginForm.account" placeholder="用户名">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item prop="password">
                  <Input type="password" v-model="loginForm.password" placeholder="密码">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item>
                  <Button type="primary" long @click="handleLogin">登录</Button>
              </Form-item>
          </Form>
    		</div>
	  		<vue-particles
	  		        color="#fff"
	  		        :particleOpacity="0.7"
	  		        :particlesNumber="80"
	  		        shapeType="circle"
	  		        :particleSize="5"
	  		        linesColor="#fff"
	  		        :linesWidth="1"
	  		        :lineLinked="true"
	  		        :lineOpacity="0.4"
	  		        :linesDistance="150"
	  		        :moveSpeed="3"
	  		        :hoverEffect="true"
	  		        hoverMode="grab"
	  		        :clickEffect="true"
	  		        clickMode="push"
	  		      >
	  		</vue-particles>
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
        rules:{
          account: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        handleLogin() {
          this.utils.ajax({
            method: 'post',
            url: '/users/auth/in',
            data: {
              account: this.loginForm.account,
              password: this.loginForm.password
            }
          }).then((res)=>{
            if(res.user){
              this.$store.commit('isLogin',res.user);
              this.utils.setCookie("userId",res.user.id);
              //let url = this.$route.params.directUrl;
              this.$router.push({ path: this.$route.params.directUrl||'/' }) 
              //console.log(this.$route.params.directUrl)
              //this.setBaseInfo(res.user)
            }
          })
        }
    }
  };
</script>