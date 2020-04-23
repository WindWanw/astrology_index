/**
 * 
 */
const ADD_TAB = (state, data) => {
    if (state.menuType == 1) {
        if (state.menuList.some(item => item.path === data.path)) return;
        state.menuList.push({
            name: data.meta.name,
            path: data.path,
            meta: data.meta
        });

    } else if (state.menuType == 2) {
        state.breadcrumb = [];
        if (data.meta.parent) {
            state.breadcrumb.push(data.meta.parent)
        }
        state.breadcrumb.push(data.meta.name)
    }
}

const DEL_TAB = (state, data) => {
    state.menuList.forEach(item => {
        if (item.path === data.path) {
            state.menuList.splice(state.menuList.indexOf(item), 1);
        }
    })
}

const SET_MENUTYPE = (state, data) => state.menuType = data

const ADD_USER_INFO = (state, data) => state.userInfo = data

export default {
    ADD_TAB,
    DEL_TAB,
    SET_MENUTYPE,
    ADD_USER_INFO
}