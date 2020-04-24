/*
 * @Descripttion: 
 * @version: 
 * @Author: ww
 * @date: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-24 11:31:52
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
    },
    //审核企业认证
    auditEnterpriseCertification(params) {
        return fetchPost('audit/audit/enterprise/certification', params);
    },
    //个人认证审核列表
    getUserAuth(params) {
        return fetchGet('audit/user/certification/list', params);
    },

}