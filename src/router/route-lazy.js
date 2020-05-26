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
const about = () =>
	import( /* webpackChunkName: "about" */ '../views/admin/about')
const description = () =>
	import( /* webpackChunkName: "description" */ '../views/admin/about/description.vue')



/**************************前台管理**************************/
const index = () =>
	import( /* webpackChunkName: "index" */ '../views/index')
const abouts = () =>
	import( /* webpackChunkName: "about" */ '../views/index/abouts')
const descriptions = () =>
	import( /* webpackChunkName: "description" */ '../views/index/abouts/descriptions.vue')

/**************************系统设置**************************/
const system = () =>
	import( /* webpackChunkName: "system" */ '../views/system')
const adminSystem = () =>
	import( /* webpackChunkName: "adminSystem" */ '../views/system/adminSystem')
const wordsList = () =>
	import( /* webpackChunkName: "wordsList" */ '../views/system/adminSystem/wordsList.vue')

const indexSystem = () =>
	import( /* webpackChunkName: "indexSystem" */ '../views/system/index')
export default {
	login,
	notFound,
	layout,
	home,

	admin,
	about,
	description,

	index,
	abouts,
	descriptions,

	system,
	adminSystem,
	wordsList,
	indexSystem
}