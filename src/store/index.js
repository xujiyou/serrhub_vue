import Vue from 'vue'
import Vuex from 'vuex' //状态库，统一状态管理
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user
    }
})