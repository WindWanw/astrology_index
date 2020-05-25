/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-12 17:04:23
 */
import {
    fetchPost,
    fetchGet
} from './fetch';

export default {
    login(params) {
        return fetchPost('login/login', params);
    },
    getUserInfo(params) {
        return fetchGet('auth/home/getUserInfo', params);
    },

    //关于
    getAboutList(params) {
        return fetchGet('auth/about/getAboutList', params);
    }
}