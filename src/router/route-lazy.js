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
}