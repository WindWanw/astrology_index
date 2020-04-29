/**
 * 
 * @param {*} state 
 */
const menuList = (state) => state.menuList;

const breadcrumb = (state) => state.breadcrumb;

const asideList = (state) => state.asideList;

const userInfo = (state) => state.userInfo;

const path = (state) => state.path


export default {
    menuList,
    asideList,
    breadcrumb,
    userInfo,
    path,
}