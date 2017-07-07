<style lang="less" scoped>
.auto-complete {

	  display: inline-block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dddee1;
    transition: all .2s ease-in-out;
    padding-left: 8px;
    padding-right: 24px;
		.input {
			height: 22px;
			min-width: 250px;
			border: 0;
			outline: 0;	
		}
		.auto-complete-dropdown {

		}
}
</style>

<template>
  <div class="auto-complete">
  	<Tag closable color="blue" v-for="(item,index) in tags" key="id" @on-close="tagRemove(index)">{{item.name}}</Tag>
  	<Dropdown class="auto-complete-dropdown" placement="bottom-start" trigger="custom" :visible="visible">
        <input class="input" v-model="inputKey" type="text" placeholder="标签，如：php 可使用逗号,分号;分隔" 
        		@blur="blur" 
        		@keyup="keyup"
        		@focus="focus"
        >
        <Dropdown-menu slot="list">
        	<li class="ivu-dropdown-item" :class="{'ivu-dropdown-item-focus':selectIndex == index}" v-for="(item,index) in tagsList" key="_id"  @mouseenter="selectIndex=index"  @click="tagSelect(item)">{{item.name}}</li>
        </Dropdown-menu>
    </Dropdown>
  </div>
</template>

<script>
import tagForm from './tagForm'
export default {
	name:"AutoComplete",
  data () {
    return {
    	selectIndex:0,
    	newTag:{
    		name:'',
    		describe:''
    	},
    	inputKey:'',
    	tags:[],
    	tagsList:[
    		{
      		_id:false,
      		name:"添加标签..."
      	}
    	],
    	visible: false
    }
  },
  watch:{
  	visible(){
  		if(this.visible){
  			this.selectIndex = 0;
  		}
  	}
  },
  methods: {
  	tagRemove(index){
  		console.log(index)
  		this.tags.splice(index,1)
  	},
  	searchTag(name){
  		///queryTags?key=java
  		this.searchTagTm && clearTimeout(this.searchTagTm);
  		this.searchTagTm = setTimeout(()=>{
  			this.utils.ajax({
	        method: 'get',
	        url: '/tags/query',
	        params: {
	          key: name
	        }
	      }).then((res)=>{
	   			
	        this.visible = true;
	        if(res.data.length==0){
	        	this.tagsList = [{
	        		_id:false,
	        		name:"添加标签..."
	        	}]
	        }else{
	        	this.tagsList = res.data;
	        }
	      })
  		},1000)
  	},
  	keyup(e) {
  		if(e.keyCode==186){
  			//;
  			this.tagSelect(this.tagsList[0])
  		}else if(e.keyCode==13){
  			//回车
  			this.tagSelect(this.tagsList[0])
  		}else{
  			this.searchTag(e.target.value)
  		}
  	},
  	tagSelect(o){
  		if(!o._id){
  			return this.$Modal.confirm({
  				onOk:() => {
  					this.utils.ajax({
			        method: 'post',
			        url: '/tags/add',
			        data: {
				    		name:this.newTag.name,
				    		describe:this.newTag.describe
				    	}
			      }).then((res)=>{
			      	this.tags.push({
				  			id:res.tag._id,
				  			name:res.tag.name
				  		})
				  		this.newTag = {
				    		name:'',
				    		describe:''
				    	}
				  		this.visible = false;
			      })
  				},
  				title:"添加标签",
  				render:h => h(tagForm)
        })
  		}
  		this.tags.push({
  			id:o._id,
  			name:o.name
  		})
  		this.visible = false;
  		this.inputKey = "";
  	},
  	focus(e){
  		console.log(e)
  	},
  	blur(e) {
  		console.log(e)
  	},
    handleOpen () {
      this.visible = true;
    },
    handleClose () {
      this.visible = false;
    }
  }
}
</script>