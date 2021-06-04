import { createStore } from 'vuex';
import OwnerModule from './modules/owner-module';
import SiteModule from './modules/site-module';

export default createStore({
  state: {
    error: null,
    showLoader: false
  },
  getters: {
    error: state => state.error,
    showLoader: state => state.showLoader
  },
  mutations: {
    setError: (state, error) => state.error = error,
    setLoader: (state, show) => state.showLoader = show
  },
  actions: {
  },
  modules: {
      OwnerModule,
      SiteModule
  }
});