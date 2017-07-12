import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import VueParticles from 'vue-particles';
Vue.use(VueParticles);

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);
Util.ajax = Util.ajaxInit();
Util.ajax.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
    if(res.data.status && res.data.status.code){
        iView.Modal.warning({title:"提示",content:res.data.status.msg,width:340});
    }
    return res.data;
},function(err){
  //Do something with response error
  return Promise.reject(err);
})
//console.log(iView.Modal.error({content:"asdasdasdasd"}))
Vue.prototype.utils = Util;
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

import store from './vuex/store'
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});