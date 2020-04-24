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
	    path: '/authManage',
	    name: 'authManage',
	    component: route.authManage,
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
    // {
    //     path: '/userManage',
    //     name: 'userManage',
    //     component: route.userManage,
    //     meta: {
    //         parent: '',
    //         name: '用户管理',
    //         iconfont: 'iconfont iconyonghu1',
    //         needLogin: true, //需要登录
    //     },
    //     children: [{
    //         path: '/userList',
    //         name: 'userList',
    //         component: route.userList,
    //         meta: {
    //             parent: '用户管理',
    //             name: '用户列表',
    //             iconfont: 'iconfont iconyonghu2',
    //             needLogin: true, //需要登录
    //         },
    //     }]
    // },
    // {
    //     path: '/websiteManage',
    //     name: 'websiteManage',
    //     component: route.websiteManage,
    //     meta: {
    //         parent: '',
    //         name: '官方首页',
    //         iconfont: 'iconfont iconguanwang1',
    //         needLogin: true, //需要登录
    //     },
    //     children: [{
    //         path: '/navigation',
    //         name: 'navigation',
    //         component: route.navigation,
    //         meta: {
    //             parent: '官方首页',
    //             name: '首页导航',
    //             iconfont: 'iconfont icongengduo',
    //             needLogin: true, //需要登录
    //         },
    //         children: [{
    //                 path: '/naviSetting',
    //                 name: 'naviSetting',
    //                 component: route.naviSetting,
    //                 meta: {
    //                     parent: '首页导航',
    //                     name: '导航设置',
    //                     iconfont: 'iconfont icondaohang',
    //                     needLogin: true, //需要登录
    //                 },
    //             },
    //             // {
    //             //     path: '/articleList',
    //             //     name: 'articleList',
    //             //     component: route.articleList,
    //             //     meta: {
    //             //         parent: '文章管理',
    //             //         name: '文章列表',
    //             //         iconfont: 'iconfont iconboke4',
    //             //         needLogin: true, //需要登录
    //             //     },
    //             // }
    //         ]
    //     }]
    // },
    // {
    //     path: '/blogManage',
    //     name: 'blogManage',
    //     component: route.blogManage,
    //     meta: {
    //         parent: '',
    //         name: '博客管理',
    //         iconfont: 'iconfont iconboke',
    //         needLogin: true, //需要登录
    //     },
    //     children: [{
    //         path: '/article',
    //         name: 'article',
    //         component: route.article,
    //         meta: {
    //             parent: '博客管理',
    //             name: '文章管理',
    //             iconfont: 'iconfont iconwenzhang1',
    //             needLogin: true, //需要登录
    //         },
    //         children: [{
    //                 path: '/articleAdd',
    //                 name: 'articleAdd',
    //                 component: route.articleAdd,
    //                 meta: {
    //                     parent: '文章管理',
    //                     name: '添加文章',
    //                     iconfont: 'iconfont iconboke1',
    //                     needLogin: true, //需要登录
    //                 },
    //             },
    //             {
    //                 path: '/articleList',
    //                 name: 'articleList',
    //                 component: route.articleList,
    //                 meta: {
    //                     parent: '文章管理',
    //                     name: '文章列表',
    //                     iconfont: 'iconfont iconboke4',
    //                     needLogin: true, //需要登录
    //                 },
    //             }
    //         ]
    //     }]
    // },
    // {
    //     path: '/settingManage',
    //     name: 'settingManage',
    //     component: route.settingManage,
    //     meta: {
    //         parent: '',
    //         name: '系统设置',
    //         iconfont: 'iconfont iconicon-test1',
    //         needLogin: true, //需要登录
    //     },
    //     children: [{
    //             path: '/authList',
    //             name: 'authList',
    //             component: route.authList,
    //             meta: {
    //                 parent: '系统设置',
    //                 name: '权限设置',
    //                 iconfont: 'iconfont iconicon--quanxian',
    //                 needLogin: true, //需要登录
    //             },
    //         },
    //         {
    //             path: '/setting',
    //             name: 'setting',
    //             component: route.setting,
    //             meta: {
    //                 parent: '系统设置',
    //                 name: '相关设置',
    //                 iconfont: 'iconfont iconshezhi2',
    //                 needLogin: true, //需要登录
    //             },
    //         }
    //     ]
    // },
];


export default asyRoute;