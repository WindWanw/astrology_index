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
            path: '/about',
            name: 'about',
            component: route.about,
            meta: {
                parent: '后台管理',
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
            }, ]
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
            path: '/abouts',
            name: 'abouts',
            component: route.abouts,
            meta: {
                parent: '前台管理',
                name: '关于我们',
                iconfont: 'iconfont iconhome_icon',
                needLogin: true, //需要登录
            },
            children: [{
                path: '/descriptions',
                name: 'descriptions',
                component: route.descriptions,
                meta: {
                    parent: '关于我们',
                    name: '相关描述',
                    iconfont: 'iconfont iconhome_icon',
                    needLogin: true, //需要登录
                },
                children: []
            }, ]
        }, ]
    },
];


export default asyRoute;