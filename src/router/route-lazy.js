/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-24 11:38:46
 */
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

/**************************服务管理**************************/
//认证管理
const serviceManage = () =>
	import( /* webpackChunkName: "serviceManage" */ '../views/serviceManage')
//企业认证
const education = () =>
	import( /* webpackChunkName: "education" */ '../views/serviceManage/education.vue')


export default {
	login,
	notFound,
	layout,
	home,
	
	authManage,
	enterpriseAuth,
	userAuth,

	serviceManage,
	education,
}
