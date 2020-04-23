const login = () =>
	import( /* webpackChunkName: "login" */ '../views/login.vue')
const notFound = () =>
	import( /* webpackChunkName: "notFound" */ '../views/notFound.vue')
const layout = () =>
	import( /* webpackChunkName: "layout" */ '../views/layout.vue')
const home = () =>
	import( /* webpackChunkName: "home" */ '../views/home.vue')


/**************************认证管理**************************/
//认证管理
const authManage = () =>
	import( /* webpackChunkName: "authManage" */ '../views/authManage')
//企业认证
const enterpriseAuth = () =>
	import( /* webpackChunkName: "enterpriseAuth" */ '../views/authManage/enterpriseAuth.vue')
//个人认证
const userAuth = () =>
	import( /* webpackChunkName: "userAuth" */ '../views/authManage/userAuth.vue')


export default {
	login,
	notFound,
	layout,
	home,
	
	authManage,
	enterpriseAuth,
	userAuth
}
