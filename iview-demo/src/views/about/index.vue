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
      <p>姓名：杨鑫</p>
      <p>职业：前端工程师</p>
      <p>Q Q：289755081</p>
      <p>Email：yangbinbin_1226@126.com</p>
      <p>爱好：旅游、运动</p>
      <p>人生格言：成功并非重要的事，重要的是努力。——泰尔多尔</p>
      <p class="intro">自我评价：一个在前端领域打拼了几年，从开始的不懂到对前端技术有所研究，熟悉前端一些技术栈，本人喜欢追求独一无二的生活，个人主义还是有一点的，但对人友善，喜欢与人交心。</p>

    </div>
</LoayOut>
</template>
<script>
import LoayOut from '../../components/loayout'
  export default {
  	data() {
      return {
        
      };
    },
    components: {
        LoayOut
    },
    methods: {
       
    }
  };
</script>