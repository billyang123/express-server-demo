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
},,{
    path: '/settings',
    meta: {
        title: '账号设置'
    },
    component: (resolve) => require(['./views/auth/settings.vue'], resolve)
},{
    path: '/write',
    meta: {
        title: '写文章'
    },
    component: (resolve) => require(['./views/article/add.vue'], resolve)
},{
    path: '/write/:articleId',
    meta: {
        title: '修改文章'
    },
    component: (resolve) => require(['./views/article/update.vue'], resolve)
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
},{
    path: '/user/:who',
    meta: {
        title: '作者档案'
    },
    component: (resolve) => require(['./views/user/index.vue'], resolve)
},{
    path: '/admin',
    meta: {
        title: '管理员'
    },
    component: (resolve) => require(['./views/admin/index.vue'], resolve)
}];
export default routers;
