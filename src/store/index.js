import Vue from 'vue'
import Vuex from 'vuex';
// 用户登录验证
import user from './modules/user.js';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
