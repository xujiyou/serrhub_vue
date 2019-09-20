import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource' //http请求库
import store from './store/index' //状态库
import router from './router' //路由
import Ads from 'vue-google-adsense'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import iView from 'iview'; //样式库
import 'iview/dist/styles/iview.css';
import '../theme/index.less'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueResource);
Vue.use(BootstrapVue);

Vue.use(require('vue-script2'));
Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

