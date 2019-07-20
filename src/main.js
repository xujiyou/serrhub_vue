import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store/index'
import iView from 'iview';
import VueMaterial from 'vue-material'
import 'iview/dist/styles/iview.css';
import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueMaterial);
Vue.use(VueResource);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
