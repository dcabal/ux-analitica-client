import { createStore } from 'vuex';
import OwnerModule from './modules/owner-module';
import SiteModule from './modules/site-module';

export default createStore({
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError: (state, error) => state.error = error
  },
  actions: {
  },
  modules: {
      OwnerModule,
      SiteModule
  }
});