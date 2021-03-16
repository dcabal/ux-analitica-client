<template>
    <form>
        <fieldset>
            <legend></legend>
            <div class="mb-3">
                <label class="form-label" for="userName">Nombre de usuario:</label>
                <input v-model="userName" type="text" id="userName" class="form-control">
            </div>
            <div class="mb-3" v-if="!isLogin">
                <label for="email" class="form-label">Email:</label>
                <input v-model="email" type="email" id="email" class="form-control">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña:</label>
                <input v-model="password" type="password" id="password" class="form-control">
            </div>
            <div class="d-grid">
                <button class="btn-success" @click="onClick($event)">Enviar</button>
            </div>
        </fieldset>
        {{userName}}
    </form>
</template>

<script>
import http from '../util/Http';

export default {
    name: 'LoginForm',
    props: {
        type: String
    },
    methods: {
        async onClick(e) {
            const endpoint = this.isLogin ? '/login' : '/signup';
            const body = {
                userName: this.userName,
                password: this.password,
                email: !this.isLogin ? email : null
            };

            e.preventDefault();
            
            try {
                const res = await http.post(endpoint, body);
                console.log('res', res);
            } catch (er) {
                console.error('er', er);
            }
        }
    },
    data() {
        return {
            userName: '',
            email: '',
            password: '',
            isLogin: this.type === 'login'
        }
    }
}
</script>