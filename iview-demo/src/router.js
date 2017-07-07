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
    component: (resolve) => require(['./views/auth/index.vue'], resolve)
},{
    path: '/write',
    meta: {
        title: '写文章'
    },
    component: (resolve) => require(['./views/write/index.vue'], resolve)
}];
export default routers;