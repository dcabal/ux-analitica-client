import http from '../../util/Http';

const state = {
    owner: {
        userName: '',
        email: '',
        sites: []
    }
};

const getters = {
    owner: state => state.owner,
    loggedIn: state => !!state.owner.userName && !!state.owner.email
};

const actions = {
    async login({ commit }, loginData) {
        commit('setError', null);
        const payload = { userName: loginData.userName, password: loginData.password };
        await http.post('/login', payload)
        .then(res => {
            sessionStorage.setItem('uxa-jwt', res.data.token);
            commit('setOwner', res.data.owner)
        })
        .catch(er => commit('setError', er.message));
    },

    async signup({ commit }, signupData) {
        commit('setError', null);
        const payload = { userName: signupData.userName, password: signupData.password, email: signupData.email };
        await http.post('/signup', payload)
        .then(res => res)
        .catch(er => commit('setError', er.message));
    },

    async updateOwner({ commit }, ownerData) {
        commit('setError', null);
        const payload = { userName: ownerData.userName, password: ownerData.password, email: ownerData.email };
        await http.patch('/owner', payload)
        .then(owner => commit('setOwner', owner))
        .catch(er => commit('setError', er.message));
    },

    async addSite({ commit }, host) {
        commit('setError', null);
        await http.patch('/site', { host })
        .then(res => commit('setSites', res.sites))
        .catch(er => commit('setError', er.message));
    }
};

const mutations = {
    setOwner: (state, owner) => state.owner = owner,
    setSites: (state, sites) => state.owner.sites = sites
};

export default {
    state,
    getters,
    actions,
    mutations
}