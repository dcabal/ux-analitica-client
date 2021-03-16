class Http {
    apiUrl = 'http://localhost:3000';
    headers = { 'Content-Type': 'application/json;charset=utf-8' };

    async post(endpoint, body) {
        const res = await fetch(`${this.apiUrl}${endpoint}`, { method: 'POST', body: JSON.stringify(body), headers: this.headers });

        if (res.ok)
            return res.json();
        else
            throw { status: res.status, message: res.message }
    }
}

const http = new Http();
export default http;