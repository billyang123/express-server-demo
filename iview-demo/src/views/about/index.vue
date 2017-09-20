<style lang="less">
	.about-box {
    width: 600px;
    text-align: center;
    margin: 0 auto;
  }
</style>
<template>
<LoayOut menu="3">
    <div class="about-box">

      <h3 slot="title">关于我</h3>
      <p v-if="user.name">姓名：{{user.name}}</p>
      <p v-if="user.profession">职业：{{user.profession}}</p>
      <p v-if="user.QQ">Q Q：{{user.QQ}}</p>
      <p v-if="user.email">Email：{{user.email}}</p>
      <p v-if="user.hobby">爱好：{{user.hobby}}</p>
      <p v-if="user.motto">人生格言：{{user.motto}}</p>
      <p class="intro" v-if="user.selfAssessment">自我评价：{{user.selfAssessment}}</p>

    </div>
</LoayOut>
</template>
<script>
import LoayOut from '../../components/loayout'
  export default {
  	data() {
      return {
				who:'me',
				user:{}
      };
    },
    components: {
        LoayOut
    },
		created(){
			this.utils.checkLogin(this);
			this.who = this.$route.params.who;
			if(!this.who || this.who == 'me'){
				this.user = this.utils.getCurUser(this);
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
