import storeModule from '../src/store'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  namespaced: false,
  modules: {
    storeModule
  }
})
export default store
