/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-14 16:23:45
 */
const login = () =>
	import( /* webpackChunkName: "login" */ '../views/login.vue')
const notFound = () =>
	import( /* webpackChunkName: "notFound" */ '../views/notFound.vue')
const layout = () =>
	import( /* webpackChunkName: "layout" */ '../views/layout.vue')
const home = () =>
	import( /* webpackChunkName: "home" */ '../views/home.vue')

/**************************后台管理**************************/
const admin = () =>
	import( /* webpackChunkName: "admin" */ '../views/admin')
const adminUser = () =>
	import( /* webpackChunkName: "adminUser" */ '../views/admin/adminUser')
const adminUserList = () =>
	import( /* webpackChunkName: "adminUserList" */ '../views/admin/adminUser/adminUserList.vue')



/**************************前台管理**************************/
const index = () =>
	import( /* webpackChunkName: "index" */ '../views/index')
const about = () =>
	import( /* webpackChunkName: "about" */ '../views/index/about')
const description = () =>
	import( /* webpackChunkName: "description" */ '../views/index/about/description.vue')

/**************************系统设置**************************/
const system = () =>
	import( /* webpackChunkName: "system" */ '../views/system')
const adminSystem = () =>
	import( /* webpackChunkName: "adminSystem" */ '../views/system/adminSystem')
const wordsList = () =>
	import( /* webpackChunkName: "wordsList" */ '../views/system/adminSystem/wordsList.vue')

const indexSystem = () =>
	import( /* webpackChunkName: "indexSystem" */ '../views/system/indexSystem')
const spanner = () =>
	import( /* webpackChunkName: "spanner" */ '../views/system/indexSystem/spanner.vue')
const config = () =>
	import( /* webpackChunkName: "config" */ '../views/system/indexSystem/config.vue')
export default {
	login,
	notFound,
	layout,
	home,

	admin,
	adminUser,
	adminUserList,


	index,
	about,
	description,

	system,
	adminSystem,
	wordsList,
	indexSystem,
	spanner,
	config
}