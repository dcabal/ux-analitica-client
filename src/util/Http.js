import store from '../store';

class Http {
    apiUrl = 'http://localhost:3000';
    headers = { 'Content-Type': 'application/json;charset=utf-8' };
    loader = {
        show: () => store.commit('setLoader', true),
        hide: () => store.commit('setLoader', false)
    }    

    async post(endpoint, payload) {
        this.loader.show();

        const method = 'POST';
        const body = JSON.stringify(payload);
        const headers = this._setHeaders(endpoint);
        
        const res = await fetch(`${this.apiUrl}${endpoint}`, { method, body, headers });
        
        this.loader.hide();
        
        if (res.ok)
            return res.json();
        else 
            throw { status: res.status, message: res.statusText };
    }

    async get(endpoint, params) {
        this.loader.show();
        
        const headers = this._setHeaders(endpoint);
        const url = new URL(`${this.apiUrl}${endpoint}`)
        if (!!params)
            url.search = new URLSearchParams(params);

        const res = await fetch(url, {headers});

        this.loader.hide();

        if (res.ok)
            return res.json();
        else
            throw { status: res.status, message: res.statusText };
    }

    async patch(endpoint, payload) {
        this.loader.show();

        const method = 'PATCH';
        const headers = this._setHeaders(endpoint);
        const body = JSON.stringify(payload);

        const res = await fetch(`${this.apiUrl}${endpoint}`, { method, body, headers });

        this.loader.hide();

        if (res.ok)
            return res.json();
        else 
            throw { status: res.status, message: res.statusText };
    }

    _setHeaders(endpoint) {
        const addJwt = endpoint !== '/login' && endpoint !== '/signup';
        return addJwt ? 
            { ...this.headers, 'Authorization': `Bearer ${sessionStorage.getItem('uxa-jwt')}` } : 
            { ...this.headers };
    }
}

const http = new Http();
export default http;