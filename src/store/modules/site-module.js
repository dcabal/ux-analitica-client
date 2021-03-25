import http from '../../util/Http';

const state = {
    site: null
};

const getters = {
    site: state => state.site
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
    setSite: (state, site) => state.site = site
};

export default {
    state,
    getters,
    actions,
    mutations
}