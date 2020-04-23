import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//全局路由守卫
router.beforeEach((to, from, next) => {
    let isLogin = localStorage.getItem('token'); //获取缓存中的token

    //判断该路由是否是必须登录
    if (to.meta.needLogin) {
        if (isLogin) {
            next();
        } else {
            //不存在token，表示未登录，将回到登录页面
            next({
                path: '/login',
                query: { redirect: to.fullPath } //登录成功后跳转到该路由
            });
        }
    } else {
        next();
    }
})

export default router