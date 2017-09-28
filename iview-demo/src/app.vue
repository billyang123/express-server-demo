<template>
    <router-view></router-view>
</template>
<script>
if (window.innerWidth)
  window.winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
  window.winWidth = document.body.clientWidth;
// 获取窗口高度
if (window.innerHeight)
  window.winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
  window.winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
{
  window.winHeight = document.documentElement.clientHeight;
  window.winWidth = document.documentElement.clientWidth;
}
console.log(window.winHeight);
    export default {
        data() {
            return {

            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>
