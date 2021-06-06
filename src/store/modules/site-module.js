import http from '../../util/Http';

const state = {
    site: null,
    selectedRoute: ''
};

const getters = {
    site: state => state.site,
    selectedRoute: state => state.selectedRoute
};

const actions = {
    async getSite({ commit }, token) {
        commit('setError', null);
        await http.get('/site/data', { token })
        .then(site => commit('setSite', site))
        .catch(er => (commit('setError', er.message), commit('setSite', [])));
    }
};

const mutations = {
    setSite: (state, site) => state.site = site,
    setRoute: (state, route) => state.selectedRoute = route
};

export default {
    state,
    getters,
    actions,
    mutations
}