import route from './route-lazy.js'
import asyRouter from './route-asy.js'

const routes = [{
        path: '/',
        name: 'login',
        component: route.login
    },
    {
        path:'/login',
        name:'login',
        component:route.login
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: route.notFound
    },
    {
        path: '/yoga',
        name: 'yoga',
        component: route.yoga
    },
    {
        path: '/layout',
        name: 'layout',
        component: route.layout,
        redirect: '/home',
        children: [
            ...asyRouter
        ]
    },
]

export default routes;
