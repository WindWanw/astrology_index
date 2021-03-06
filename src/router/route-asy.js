import route from './route-lazy.js'
const asyRoute = [{
        path: '/home',
        name: 'home',
        component: route.home,
        meta: {
            parent: '',
            name: '首页',
            iconfont: 'iconfont iconshouye',
            needLogin: true, //需要登录
        },
        children: []
    },
    {
        path: '/admin',
        name: 'admin',
        component: route.admin,
        meta: {
            parent: '',
            name: '后台管理',
            iconfont: 'iconfont iconhuaban1',
            needLogin: true, //需要登录
        },
        children: [{
            path: '/adminUser',
            name: 'adminUser',
            component: route.adminUser,
            meta: {
                parent: '后台管理',
                name: '用户管理',
                iconfont: 'iconfont iconyonghu',
                needLogin: true, //需要登录
            },
            children: [{
                path: '/adminUserList',
                name: 'adminUserList',
                component: route.adminUserList,
                meta: {
                    parent: '用户管理',
                    name: '用户列表',
                    iconfont: 'iconfont icondashujukeshihuaico-',
                    needLogin: true, //需要登录
                },
                children: []
            }],

        }, ]
    },
    {
        path: '/index',
        name: 'index',
        component: route.index,
        meta: {
            parent: '',
            name: '前台管理',
            iconfont: 'iconfont iconqiantaicaidan',
            needLogin: true, //需要登录
        },
        children: [{
            path: '/about',
            name: 'about',
            component: route.about,
            meta: {
                parent: '前台管理',
                name: '关于我们',
                iconfont: 'iconfont iconnb-',
                needLogin: true, //需要登录
            },
            children: [{
                path: '/description',
                name: 'description',
                component: route.description,
                meta: {
                    parent: '关于我们',
                    name: '相关描述',
                    iconfont: 'iconfont icon-wenbenmiaoshu',
                    needLogin: true, //需要登录
                },
                children: []
            }]
        }, ]
    },
    {
        path: '/system',
        name: 'system',
        component: route.system,
        meta: {
            parent: '',
            name: '系统设置',
            iconfont: 'iconfont iconicon-',
            needLogin: true, //需要登录
        },
        children: [{
                path: '/adminSystem',
                name: 'adminSystem',
                component: route.adminSystem,
                meta: {
                    parent: '系统设置',
                    name: '后台设置',
                    iconfont: 'iconfont iconhuaban1',
                    needLogin: true, //需要登录
                },
                children: [{
                    path: '/wordsList',
                    name: 'wordsList',
                    component: route.wordsList,
                    meta: {
                        parent: '后台设置',
                        name: '名单管理',
                        iconfont: 'iconfont iconhoutai',
                        needLogin: true, //需要登录
                    },
                    children: []
                }, ]
            },
            {
                path: '/indexSystem',
                name: 'indexSystem',
                component: route.indexSystem,
                meta: {
                    parent: '系统设置',
                    name: '前台设置',
                    iconfont: 'iconfont iconqiantaicaidan',
                    needLogin: true, //需要登录
                },
                children: [{
                    path: '/spanner',
                    name: 'spanner',
                    component: route.spanner,
                    meta: {
                        parent: '前台设置',
                        name: '导航设置',
                        iconfont: 'iconfont iconshouye1',
                        needLogin: true, //需要登录
                    },
                    children: []
                }, {
                    path: '/config',
                    name: 'config',
                    component: route.config,
                    meta: {
                        parent: '前台设置',
                        name: '系统配置',
                        iconfont: 'iconfont iconsetting',
                        needLogin: true, //需要登录
                    },
                    children: []
                }, ]
            },
            {
                path: '/cache',
                name: 'cache',
                component: route.cache,
                meta: {
                    parent: '系统设置',
                    name: '清除缓存',
                    iconfont: 'iconfont iconhuancunguanli',
                    needLogin: true, //需要登录
                },
                children: []
            },
        ]
    },
];


export default asyRoute;