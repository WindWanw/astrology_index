import route from './route-lazy.js'
const asyRoute = [{
        path: '/home',
        name: 'home',
        component: route.home,
        meta: {
            parent: '',
            name: '首页',
            iconfont: 'iconfont iconhome_icon',
            needLogin: true, //需要登录
        },
        children: []
    },
    {
        path: '/userManage',
        name: 'userManage',
        component: route.userManage,
        meta: {
            parent: '',
            name: '用户管理',
            iconfont: 'iconfont iconyonghu2',
            needLogin: true, //需要登录
        },
        children: [{
            path: '/userList',
            name: 'userList',
            component: route.userList,
            meta: {
                parent: '',
                name: '用户列表',
                iconfont: 'iconfont iconyonghu2',
                needLogin: true, //需要登录
            },
        }]
    },
    {
        path: '/authorityManage',
        name: 'authorityManage',
        component: route.authorityManage,
        meta: {
            parent: '',
            name: '权限管理',
            iconfont: 'iconfont iconquanxianshezhi',
            needLogin: true, //需要登录
        },
        children: [{
                path: '/adminUser',
                name: 'adminUser',
                component: route.adminUser,
                meta: {
                    parent: '权限管理',
                    name: '用户管理',
                    iconfont: 'iconfont iconquanxianshenyue',
                    needLogin: true, //需要登录
                },
            },
            {
                path: '/adminRole',
                name: 'adminRole',
                component: route.adminRole,
                meta: {
                    parent: '权限管理',
                    name: '角色管理',
                    iconfont: 'iconfont iconquanxian1',
                    needLogin: true, //需要登录
                },
            }, {
                path: '/adminMenu',
                name: 'adminMenu',
                component: route.adminMenu,
                meta: {
                    parent: '权限管理',
                    name: '菜单管理',
                    iconfont: 'iconfont iconcaidan1',
                    needLogin: true, //需要登录
                },
            },
        ]
    },
    {
        path: '/checkManage',
        name: 'checkManage',
        component: route.checkManage,
        meta: {
            parent: '',
            name: '认证管理',
            iconfont: 'iconfont iconrenzheng',
            needLogin: true, //需要登录
        },
        children: [{
                path: '/enterpriseAuth',
                name: 'enterpriseAuth',
                component: route.enterpriseAuth,
                meta: {
                    parent: '认证管理',
                    name: '企业认证',
                    iconfont: 'iconfont iconqiyejianjie',
                    needLogin: true, //需要登录
                },
            },
            {
                path: '/userAuth',
                name: 'userAuth',
                component: route.userAuth,
                meta: {
                    parent: '认证管理',
                    name: '个人认证',
                    iconfont: 'iconfont icongeren9',
                    needLogin: true, //需要登录
                },
            }
        ]
    },
    {
        path: '/serviceManage',
        name: 'serviceManage',
        component: route.serviceManage,
        meta: {
            parent: '',
            name: '服务管理',
            iconfont: 'iconfont iconfuwu1',
            needLogin: true, //需要登录
        },
        children: [{
            path: '/education',
            name: 'education',
            component: route.education,
            meta: {
                parent: '服务管理',
                name: '学历提升',
                iconfont: 'iconfont iconxueli',
                needLogin: true, //需要登录
            },
        }]
    },
    {
        path: '/postManage',
        name: 'postManage',
        component: route.postManage,
        meta: {
            parent: '',
            name: '发布管理',
            iconfont: 'iconfont iconfabu-',
            needLogin: true, //需要登录
        },
        children: [{
                path: '/recruitments',
                name: 'recruitments',
                component: route.recruitments,
                meta: {
                    parent: '发布管理',
                    name: '人才招聘',
                    iconfont: 'iconfont iconzhaopin',
                    needLogin: true, //需要登录
                },
            },
            {
                path: '/jobs',
                name: 'jobs',
                component: route.jobs,
                meta: {
                    parent: '发布管理',
                    name: '人才求职',
                    iconfont: 'iconfont iconqiuzhizhuangtai',
                    needLogin: true, //需要登录
                },
            }
        ]
    },
    {
        path: '/systemManage',
        name: 'systemManage',
        component: route.systemManage,
        meta: {
            parent: '',
            name: '系统设置',
            iconfont: 'iconfont iconicon-test',
            needLogin: true, //需要登录
        },
        children: []
    }

];


export default asyRoute;