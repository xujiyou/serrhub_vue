import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource' //http请求库
import store from './store/index' //状态库
import router from './router' //路由

import iView from 'iview'; //样式库
import 'iview/dist/styles/iview.css';

import VueMaterial from 'vue-material' //样式库
import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueMaterial);
Vue.use(VueResource);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
