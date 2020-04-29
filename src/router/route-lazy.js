/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-29 11:15:31
 */
const login = () =>
	import( /* webpackChunkName: "login" */ '../views/login.vue')
const notFound = () =>
	import( /* webpackChunkName: "notFound" */ '../views/notFound.vue')
const layout = () =>
	import( /* webpackChunkName: "layout" */ '../views/layout.vue')
const home = () =>
	import( /* webpackChunkName: "home" */ '../views/home.vue')

/**************************用户管理**************************/
//用户管理
const userManage = () =>
	import( /* webpackChunkName: "userManage" */ '../views/userManage')
/**************************权限管理**************************/
//权限管理
const authorityManage = () =>
	import( /* webpackChunkName: "authorityManage" */ '../views/authorityManage')
//用户设置
const adminUser = () =>
	import( /* webpackChunkName: "adminUser" */ '../views/authorityManage/adminUser.vue')
//权限设置
const adminRole = () =>
	import( /* webpackChunkName: "adminRole" */ '../views/authorityManage/adminRole.vue')
//菜单设置
const adminMenu = () =>
	import( /* webpackChunkName: "adminMenu" */ '../views/authorityManage/adminMenu.vue')

/**************************认证管理**************************/
//认证管理
const checkManage = () =>
	import( /* webpackChunkName: "checkManage" */ '../views/checkManage')
//企业认证
const enterpriseAuth = () =>
	import( /* webpackChunkName: "enterpriseAuth" */ '../views/checkManage/enterpriseAuth.vue')
//个人认证
const userAuth = () =>
	import( /* webpackChunkName: "userAuth" */ '../views/checkManage/userAuth.vue')

/**************************服务管理**************************/
//服务管理
const serviceManage = () =>
	import( /* webpackChunkName: "serviceManage" */ '../views/serviceManage')
//学历提升
const education = () =>
	import( /* webpackChunkName: "education" */ '../views/serviceManage/education.vue')
/**************************发布管理**************************/
//发布管理
const postManage = () =>
	import( /* webpackChunkName: "postManage" */ '../views/postManage')
//人才招聘
const recruitments = () =>
	import( /* webpackChunkName: "recruitments" */ '../views/postManage/recruitments.vue')
//人才求职
const jobs = () =>
	import( /* webpackChunkName: "jobs" */ '../views/postManage/jobs.vue')


const systemManage = () =>
	import( /* webpackChunkName: "systemManage" */ '../views/systemManage')

export default {
	login,
	notFound,
	layout,
	home,

	userManage,

	authorityManage,
	adminUser,
	adminRole,
	adminMenu,

	checkManage,
	enterpriseAuth,
	userAuth,

	serviceManage,
	education,

	postManage,
	recruitments,
	jobs,







	systemManage,
}