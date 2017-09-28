<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
        z-index: 99;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
        margin-left: 20px;
    }
    .layout-nav{
      font-size: 14px;
    }
    .layout-main {
      padding: 20px;
      font-size: 14px;
    }
    .layout-user-info {
      padding-left: 9px;
    }
    .layout-user-info img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      position: absolute;
      top: -4px;
      left: 0;
    }
</style>
<template>
    <div class="layout" :style="{minHeight:winHeight+'px'}">
        <div class="layout-ceiling">
            <div class="layout-ceiling-main">
                <router-link key="this" v-for="(item,index) in tinyNavs" :to="item.to">{{item.title}}</router-link>
                <Dropdown style="margin-left: 20px" placement="bottom-end" v-if="user" @on-click="userInfoSelected">
                    <a href="javascript:void(0)" class="layout-user-info">
                        <img :src="user.avator?user.avator:defaultAvator[user.sex]"/>
                        {{user.name}}
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="Submission">投稿</DropdownItem>
                        <DropdownItem name="Account-Settings">账号设置</DropdownItem>
                        <DropdownItem name="Sign-out">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="layout-header">
            <div class="layout-logo"><img style="height:30px;" src="http://yangbinbin.duapp.com/images/logo_2016.png" alt=""></div>
            <div class="layout-nav">
              <Menu mode="horizontal" :active-name="current" @on-select="menuTo">
                <MenuItem :name="index" key="this" v-for="(item,index) in navs">
                    <Icon :type="item.icon"></Icon>
                    {{item.title}}
                </MenuItem>
              </Menu>

            </div>

        </div>
        <div class="layout-main">
          <slot></slot>
        </div>
        <!-- <div class="layout-copy">
            2017 &copy; diandi
        </div> -->
    </div>
</template>
<script>
    export default {
      data () {
          return {
            user:null,
            defaultAvator:{
              '男':'http://7oxjkx.com1.z0.glb.clouddn.com/FqVxtPLdT4jMgl-aMNwUaKfx0XHH',
              '女':'http://7oxjkx.com1.z0.glb.clouddn.com/FkJFtxOIXgAJgJM_pZgw44TTPDIx'
            },
            winHeight:winHeight,
            navs:[{
              to:'/',
              icon:'ios-home',
              title:'首页'
            },{
              to:'/list',
              icon:'ios-keypad',
              title:'文章列表'
            },{
              to:'/user/me',
              icon:'ios-person',
              title:'档案'
            }],
            tinyNavs:[]
          }
      },
      props:['current'],
      created(){
        this.user = this.utils.getCurUser(this);
        if(!this.user){
          this.tinyNavs = this.tinyNavs.concat([{
            to:'/login',
            title:'登录'
          },{
            to:'/register',
            title:'注册'
          }])
        }
        this.current = this.current;
        console.log(this.current);
      },

      methods: {
          logout(){
            this.utils.ajax({
                method: 'post',
                url: '/api/users/auth/out'
            }).then((res)=>{
                this.utils.storage.clear()
                this.$router.push('/login')
            })
          },
          userInfoSelected(v){
            console.log(v);
            if(v == 'Sign-out') this.logout();
            if(v == 'Account-Settings') this.$router.push('/settings');
            if(v == 'Submission') this.$router.push('/write')
          },
          menuTo(name){
              this.$router.push(this.navs[name].to)
              // this.menu = name;
          }
      }
    }
</script>
