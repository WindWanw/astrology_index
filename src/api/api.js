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

    //公共接口
    //资质类别，企业类别
    getQualificationCategory(params) {
        return fetchGet('common/get/qualification/category', params);
    },
    //学历类别
    getExamCategory(params) {
        return fetchGet('common/get/exam/category', params);
    },
    getEmailSuffix(params) {
        return fetchGet('common/get/email/suffix', params);
    },
    //发布  招聘/求职  相关数据配置信息（证书类别，注册情况，证书用途，薪资范畴，学历）
    getAllConfig(params) {
        return fetchGet('common/get/all/config', params);
    },


    //企业认证审核列表
    getEnterpriseAuth(params) {
        return fetchGet('audit/enterprise/certification/list', params);
    },
    //审核企业认证
    auditEnterpriseCertification(params) {
        return fetchPost('audit/audit/enterprise/certification', params);
    },
    //个人认证审核列表
    getUserAuth(params) {
        return fetchGet('audit/user/certification/list', params);
    },
    //学历提升列表
    getEducationList(params) {
        return fetchGet('education/education/list', params);
    },
    //招聘列表
    getRecruitmentsList(params) {
        return fetchGet('post/post/recruitments/list', params);
    },
    //添加招聘信息
    addRecruitments(params) {
        return fetchPost('post/add/recruitments', params);
    },
    //修改招聘信息
    editRecruitments(params) {
        return fetchPost('post/edit/recruitments', params);
    },
    //置顶
    setTop(params) {
        return fetchGet('post/set/top', params);
    },
    //上线
    setStatus(params) {
        return fetchGet('post/set/status', params);
    },
    //求职列表
    getJobsList(params) {
        return fetchGet('post/post/jobs/list', params);
    },
    //求职列表
    addJobs(params) {
        return fetchPost('post/add/jobs', params);
    },
    //求职列表
    editJobs(params) {
        return fetchPost('post/edit/jobs', params);
    },
    //建筑圈列表
    getBuildingList(params) {
        return fetchGet('post/get/building/list', params);
    },
    //添加建筑圈
    addBuilding(params) {
        return fetchPost('post/add/building', params);
    },
    //修改建筑圈
    editBuilding(params) {
        return fetchPost('post/edit/building', params);
    },
    //后台权限角色列表
    getRoleList(params) {
        return fetchGet('authority/get/role/list', params);
    },
    //添加角色
    addRole(params) {
        return fetchPost('authority/add/role', params);
    },
    //修改角色
    editRole(params) {
        return fetchPost('authority/edit/role', params);
    },
    //启用/禁用角色
    setRoleStatus(params) {
        return fetchGet('authority/set/role/status', params);
    },
    //获取菜单列表
    getMenuList(params) {
        return fetchGet('authority/get/menu/list', params);
    },
    //获取菜单id
    getMenuId(params) {
        return fetchGet('authority/get/menu/id', params);
    },
    //添加菜单信息
    addMenuInfo(params) {
        return fetchPost('authority/add/menu/info', params);
    },
    //修改菜单信息
    editMenuInfo(params) {
        return fetchPost('authority/edit/menu/info', params);
    },
    //获取后台用户信息
    getAdminUserList(params) {
        return fetchGet('authority/get/admin/user/list', params);
    },
    //注册/添加后台用户信息
    addUserInfo(params) {
        return fetchPost('authority/add/user/info', params);
    },
    //修改用户信息
    editUserInfo(params) {
        return fetchPost('authority/edit/user/info', params);
    },
    //锁定/解锁用户
    blockUser(params) {
        return fetchGet('authority/block/user', params);
    },
    //获取角色相关信息
    getRoleSelect(params) {
        return fetchGet('authority/get/role/select', params);
    },
    //根据menu_id获取操作
    getMenuAction(params) {
        return fetchGet('authority/get/menu/action', params);
    },
    //生成菜单
    getJsonMenu(params) {
        return fetchPost('authority/get/json/menu', params);
    },
    //招工招班组
    getProjectList(params) {
        return fetchGet('post/get/project/list', params);
    }
}