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
        return fetchPost('login', params);
    },
    getUserInfo(params) {
        return fetchGet('auth/home/getUserInfo', params);
    },
    uploadFile(params) {
        return fetchPost('common/uploadFile', params);
    },

    //用户管理
    getUserList(params) {
        return fetchGet('auth/user/getUserList', params);
    },
    addUser(params) {
        return fetchPost('auth/user/addUserInfo', params);
    },
    editUser(params) {
        return fetchPost('auth/user/editUserInfo', params);
    },

    //关于
    getAboutList(params) {
        return fetchGet('auth/about/getAboutList', params);
    },
    addAbout(params) {
        return fetchPost('auth/about/addAboutInfo', params);
    },
    editAbout(params) {
        return fetchPost('auth/about/editAboutInfo', params);
    },

    //系统设置

    //admin
    getWordsList(params) {
        return fetchGet('auth/system/getWordsList', params);
    },
    addWords(params) {
        return fetchPost('auth/system/addWords', params);
    },
    editWords(params) {
        return fetchPost('auth/system/editWords', params);
    },
    delWords(params) {
        return fetchGet('auth/system/delWords', params);
    },


    //index
    getSpannerList(params) {
        return fetchGet('auth/system/getSpannerList', params);
    },
    addSpanner(params) {
        return fetchPost('auth/system/addSpannerInfo', params);
    },
    editSpanner(params) {
        return fetchPost('auth/system/editSpannerInfo', params);
    },
    setIndexLanguage(params) {
        return fetchPost('auth/system/setIndexLanguage', params);
    },
    getIndexLanguage(params) {
        return fetchGet('auth/system/getIndexLanguage', params);
    },


    //
    getImageCacheType(params) {
        return fetchGet('auth/system/getImageCacheType', params);
    },
    clearImageCache(params) {
        return fetchPost('auth/system/clearImageCache', params);
    },
}