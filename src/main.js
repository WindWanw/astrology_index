import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//请求axios
import api from './api/api';
Vue.prototype.$api = api;

//公共方法
import common from './common';
Vue.prototype.$func = common;

//注册全局过滤器
import filters from './common/filter';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));


//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')