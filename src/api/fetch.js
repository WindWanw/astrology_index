/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-13 10:36:32
 */
import Vue from 'vue';
import axios from 'axios';
import router from '../router';

import {
	Message
} from 'element-ui'

//axios 设置
Vue.prototype.axios = axios;

axios.defaults.timeout = 10000; //响应时间

const h = window.location.href;

if (h.indexOf('localhost') !== -1 || h.indexOf('192.168.0.104') !== -1) {
	axios.defaults.baseURL = "/dev/admin/"; //默认请求域名
} else {
	axios.defaults.baseURL = "/api/admin/"; //默认请求域名
}

// axios.defaults.baseURL = "/api/admin/"; //默认请求域名


//请求拦截器(在发送请求之前做些什么)
axios.interceptors.request.use(request => {
	let token = localStorage.getItem('token'); //从缓存中获取用户令牌token
	request.headers['Accept-key'] = 'astrology';
	request.headers['Accept-From'] = 'admin';

	//如果存在token
	if (token) {
		request.headers['Authorization'] = token; //将token在请求头中设置，便于服务器端获取相关数据
	}

	return request;
}, error => {
	//发生错误
	Message.error('请求错误,请重试');
	return Promise.reject(error);
});


//响应拦截器
axios.interceptors.response.use(response => {
	//从头部获取token
	let token = response.config.headers['Authorization'];

	//如果响应头存在token
	if (token) {
		localStorage.setItem('token', token); //将token保存到缓存中
	}
	if (response.data.code == '4003' || localStorage.getItem('token') == '') {
		Message.error('您的登录已失效，请重新登录');
		console.log('您的登录已失效，请重新登录');
		router.push("/");
		localStorage.clear('token');
	} else {
		return response.data;
	}

}, error => {
	if (!error.response) {
		Message.error(`后端接口响应失败，请刷新浏览器重试。错误原因${error}`);
	} else if (error.message.includes('timeout')) {
		Message.error('网络超时，请刷新页面重试');
	} else {
		Message.error('服务器响应错误，请重试');
	}

	return Promise.reject(error)
});

//post请求
const fetchPost = (url, params, config) => {
	return new Promise((resolve, reject) => {
		axios.post(url, params, config).then(res => {
			resolve(res);
		}).catch(error => reject(error))
	})
}

//get请求
const fetchGet = (url, params) => {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res)
		}).catch(error => reject(error))
	})
}

export {
	fetchPost,
	fetchGet,
}