class Http {
    apiUrl = 'http://localhost:3000';
    headers = { 'Content-Type': 'application/json;charset=utf-8' };

    async post(endpoint, payload) {
        const method = 'POST';
        const body = JSON.stringify(payload);
        const headers = this._setHeaders(endpoint);
        
        const res = await fetch(`${this.apiUrl}${endpoint}`, { method, body, headers });

        if (res.ok)
            return res.json();
        else 
            throw { status: res.status, message: res.statusText };
    }

    async get(endpoint, params) {
        const headers = this._setHeaders(endpoint);
        const url = new URL(`${this.apiUrl}${endpoint}`)
        if (!!params)
            url.search = new URLSearchParams(params);

        const res = await fetch(url, {headers});

        if (res.ok)
            return res.json();
        else
            throw { status: res.status, message: res.statusText };
    }

    async patch(endpoint, payload) {
        const method = 'PATCH';
        const headers = this._setHeaders(endpoint);
        const body = JSON.stringify(payload);

        const res = await fetch(`${this.apiUrl}${endpoint}`, { method, body, headers });

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