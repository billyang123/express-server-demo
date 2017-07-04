const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
},{
    path: '/login',
    meta: {
        title: '登录页面'
    },
    component: (resolve) => require(['./views/login/index.vue'], resolve)
}];
export default routers;