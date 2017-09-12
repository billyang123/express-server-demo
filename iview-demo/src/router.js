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
    path: '/register',
    meta: {
        title: '注册账号'
    },
    component: (resolve) => require(['./views/auth/register.vue'], resolve)
},{
    path: '/write',
    meta: {
        title: '写文章'
    },
    component: (resolve) => require(['./views/write/index.vue'], resolve)
},{
    path: '/article/:id',
    meta: {
        title: '文章'
    },
    component: (resolve) => require(['./views/article/index.vue'], resolve)
},{
    path: '/list',
    meta: {
        title: '文章'
    },
    component: (resolve) => require(['./views/article/list.vue'], resolve)
},{
    path: '/about',
    meta: {
        title: '关于'
    },
    component: (resolve) => require(['./views/about/index.vue'], resolve)
}];
export default routers;
