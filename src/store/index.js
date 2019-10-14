import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
export default new VueX.Store({
  state,
  getters,
  actions,
  mutations
})
