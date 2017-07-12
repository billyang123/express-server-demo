<style lang="less">
    
</style>
<template>
    <LoayOut menu="2">
    	<Date-picker @on-change="pickerChange" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 430px"></Date-picker>
    	<Card class="article-item" v-for="item in list" key="_id">
            <p slot="title">{{item.title}}</p>
            <p slot="extra" class="article-meta">
                {{moment(item.createTime).fromNow()}} by {{item.user.name}}
            </p>
            <p>摘要：{{item.abstract}} <a :href="'/article/'+item._id">查看详情</a></p>
            <div class="cart-foot">
                <Tag v-for="tag in item.tags" key="_id"><Icon type="pricetag"></Icon> {{tag.name}}</Tag>
            </div>
        </Card>
    </LoayOut>
</template>
<script>
    import LoayOut from '../../components/loayout'
    import moment from 'moment'
    export default {
        data () {
            return {
            	list:[],
            	moment:moment
            }
        },
        computed: {
           
        },
        components: {
            LoayOut
        },
        created(){
           	
        },
        ready(){
        	
        },
        methods: {
        	searchByDay(_Day){
        		let start,end;;
        		if(typeof(_Day) == "string"){
        			start = end = _Day;
        		}else if(typeof(_Day) == "object"){
        			start = _Day.start;
        			end = _Day.end;
        		}else{
        			start = end = Date.now();
        		}	
        		this.utils.ajax({
					method: 'get',
					url: '/article/day/query',
					params: {
					  start:start,
					  end:end
					}
				}).then((res)=>{
					this.list = res.data;
	          	})
        	},
            pickerChange(tm){
            	this.searchByDay({
            		start:tm[0],
            		end:tm[1]
            	})
            }
        }
    }
</script>