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
    <article-write type="add"/>
</template>
<script>
  import ArticleUp from '../../components/articleUp';
  export default {
  	data() {
      return {

      };
    },
    components: {
    	'article-write':ArticleUp
    },
    created(){

    },
    watch:{

    },
    methods: {

    }
  };
</script>
