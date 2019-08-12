import Vue from 'vue'
import Router from 'vue-router' //路由库

import ServiceLinkList from '../components/ServiceLinkList'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            //因为要获取URL中的参数，所以这里要用路由来实现
            path: '/',
            name: 'ServiceLinkList',
            component: ServiceLinkList,
        }, {
            //因为要获取URL中的参数，所以这里要用路由来实现
            path: '/abc',
            name: 'ServiceLinkList',
            component: ServiceLinkList,
        }
    ]
})