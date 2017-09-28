<style lang="less">
	.about-box {
    width: 600px;
		padding: 20px;
    text-align: center;
    margin: 0 auto;
  }
</style>
<template>
<LayOut :current="2">
    <div class="about-box" v-if="user">

      <h3>作者档案</h3>
			<br/>
			<img v-if="user.avator" :src="user.avator" style="width:180px;height180px;border-radius:50%;">
			<br/>
			<br/>
      <p v-if="user.name">姓名：{{user.name}}</p>
      <p v-if="user.profession">职业：{{user.profession}}</p>
      <p v-if="user.QQ">Q Q：{{user.QQ}}</p>
      <p v-if="user.email">Email：{{user.email}}</p>
      <p v-if="user.hobby">爱好：{{user.hobby}}</p>
      <p v-if="user.motto">人生格言：{{user.motto}}</p>
      <p class="intro" v-if="user.selfAssessment">自我评价：{{user.selfAssessment}}</p>

    </div>
</LayOut>
</template>
<script>
	import LayOut from '../../components/layout'
  export default {
  	data() {
      return {
				who:'me',
				user:{}
      };
    },
    components: {
        LayOut
    },
		created(){
			this.utils.checkLogin(this);
			this.who = this.$route.params.who;

			if(!this.who || this.who == 'me'){
				this.user = this.utils.getCurUser(this,true);
        console.log(this.user);
			}else{
				this.getUser()
			}
		},
    methods: {
			getUser(){
				this.utils.ajax({
					method: 'get',
					url: `/api/users/about/${this.who}`
				}).then((res)=>{
					this.user = res.user
				})
			}
    }
  };
</script>
