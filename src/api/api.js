/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: 
 * @LastEditTime: 2020-04-23 17:17:57
 */
import { fetchPost, fetchGet } from './fetch';

export default {
    login(params) {
        return fetchPost('user/login', params);
    },
    getUserInfo(params) {
        return fetchGet('user/info', params);
    },

    //公共接口
    getQualificationCategory(params) {
        return fetchGet('common/get/qualification/category', params);
    },


    //企业认证审核列表
    getEnterpriseAuth(params){
        return fetchGet('audit/enterprise/certification/list',params);
    }

}