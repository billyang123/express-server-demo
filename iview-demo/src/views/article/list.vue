<style lang="less">
    .arttime-list {
        padding-left: 120px;
        // border-top: 1px solid #ddd;
        margin-top: 20px;
        .list-item {
            position: relative;
            min-height: 40px;
            padding: 10px 10px;
            &:hover {
                &:after {
                    transform:scale(1.2);
                    -webkit-transform:scale(1.2);
                    border-color: #2d8cf0;
                }
                .ptime {
                    -webkit-transform: translateX(-10px);
                    -moz-transform:translateX(-10px);
                    transform: translateX(-10px);
                }
            }
            &:before {
                content: "";
                position: absolute;
                width: 5px;
                height: 100%;
                background-color: #ccc;
                top: 14px;
                left: -10px;
            }
            .title {
                color: #333;
                line-height: 24px;
                display: block;
                font-size: 14px;
                &:hover {
                    color: #2d8cf0;
                }
            }
            &:after {
                content: "";
                position: absolute;
                width: 15px;
                height: 15px;
                background-color: #ccc;
                border:2px solid #fff;
                border-radius: 50%;
                left: -15px;
                top: 14px;
                transition:all 0.4s ease-in-out;
            }
            .ptime {
                position: absolute;
                left: -100px;
                top: 12px;
                color: #333;
                font-size: 14px;
                transition:all 0.4s ease-in-out;
            }
            &.list-item-m {
                .ptime {
                    top: 7px;
                    color: #111;
                    font-size: 20px;
                    font-weight: bold;
                }
                &:after {

                    width: 20px;
                    height: 20px;
                    left: -18px;
                    top: 11px;
                }
            }
        }
    }
</style>
<template>
    <LoayOut menu="2">
    	<Date-picker  @on-change="pickerChange"  type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 430px"></Date-picker>
        <ul class="arttime-list">
            <li v-for="item in list" key="_id">
                <div class="list-item list-item-m" v-if="item.month">
                    <span class="ptime">{{item.month}}</span>
                </div>
                <div class="list-item">
                    <span class="ptime">{{moment(item.createTime).format('YYYY-MM-DD')}}</span>
                    <a class="title" :href="'/article/'+item._id">{{item.title}}</a>
                </div>
            </li>
        </ul>
        <!-- <ul class="arttime-list">
            <li v-for="item in list" key="_id">
                <span class="ptime">{{moment(item.createTime).format('YYYY-MM-DD')}}</span>
                <a class="title" :href="'/article/'+item._id">{{item.title}}</a>
            </li>
        </ul> -->
    	<!-- <Card class="article-item" v-for="item in list" key="_id">
            <p slot="title">{{item.title}}</p>
            <p slot="extra" class="article-meta">
                {{moment(item.createTime).fromNow()}} by {{item.user.name}}
            </p>
            <p>摘要：{{item.abstract}} <a :href="'/article/'+item._id">查看详情</a></p>
            <div class="cart-foot">
                <Tag v-for="tag in item.tags" key="_id"><Icon type="pricetag"></Icon> {{tag.name}}</Tag>
            </div>
        </Card> -->
    </LoayOut>
</template>
<script>
    import LoayOut from '../../components/loayout'
    import moment from 'moment'
    export default {
        data () {
            return {
            	list:[],
                timeArr:[],

                // pickDate:[new Date(),new Date()],
            	moment:moment
            }
        },
        computed: {

        },
        components: {
            LoayOut
        },
        created(){
            // let now =this.moment().format("YYYY-MM-DD");
           	// this.searchByDay({
            //     start:now,
            //     end:now
            // })
            this.utils.ajax({
                method: 'get',
                url: '/api/article/query'
            }).then((res)=>{
                this.list = this.timelineDo(res.data);
            })
        },
        ready(){

        },
        methods: {
            timelineDo(data){
                let result = {};
                let t = null;
                data.map((item,i)=>{
                    let _t = moment(item.createTime).format('YYYY-MM');
                    if(t!=_t){
                        item.month = _t;
                    }
                    t = _t;
                    return item;
                })
                return data;
            },
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
					url: '/api/article/day/query',
					params: {
					  startDay:start,
					  endDay:end
					}
				}).then((res)=>{
					this.list = this.timelineDo(res.data);
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
