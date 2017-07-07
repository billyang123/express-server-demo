<style lang="less" scoped>
    .layout{
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
        width: 76px;
        height: 100%;
        position: fixed;
        left: 0;
        transition: width .3s ease-in-out;
        &.active {
            width: 120px;
        }
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        text-align: center;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .layout-main-right {
        width: 100%;
        margin-left: 76px;
        transition: margin .3s ease-in-out;
        &.active {
            margin-left: 120px;
        }
    }
    .toggle-btn {
        position: absolute;
        right: -42px;
        top: 0;
        background-color: #495060;
        opacity: 0;
        transition: opacity .5s ease-in-out;
        &.hidden {
            opacity: 1;
        }
        .ivu-icon {
            color: #fff;
        }
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': !menuToggle}">
        <Row type="flex">
            <div class="layout-menu-left" :class="{active:menuToggle}" @mouseenter="menuShow" @mouseleave="menuHide">
                <Menu :active-name="menu" theme="dark" width="auto">
                    <div class="layout-logo-left">
                        <img style="height:30px;" src="http://yangbinbin.duapp.com/images/logo_2016.png" alt="">
                    </div>
                    <Menu-item name="1">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">文章</span>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">归档</span>
                    </Menu-item>
                    <Menu-item name="3">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">关于</span>
                    </Menu-item>
                </Menu>
                <div class="toggle-btn" :class="{hidden:toggleBtnShow}">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="16"></Icon>
                    </i-button>
                </div>
            </div>
            <div class="layout-main-right" :class="{active:menuToggle}">
                <div class="layout-content">
                    <div class="layout-content-main"><slot></slot></div>
                </div>
                <!-- <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div> -->
            </div>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                toggleBtnShow:false,
                menuToggle:false,
                spanLeft:76
            }
        },
        computed: {
            iconSize () {
                return this.menuToggle ? 14 : 24;
            }
        },
        props:['menu'],
        created(){
           
        },
        methods: {
            menuShow () {
                this.toggleBtnShow = true;
            },
            menuHide () {
                this.toggleBtnShow = false;
            },
            toggleClick () {
                this.menuToggle = !this.menuToggle;
            }
        }
    }
</script>