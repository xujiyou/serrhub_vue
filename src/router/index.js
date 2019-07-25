import Vue from 'vue'
import Router from 'vue-router'

import ServiceLinkList from '../components/ServiceLinkList'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'ServiceLinkList',
            component: ServiceLinkList,
        }
    ]
})