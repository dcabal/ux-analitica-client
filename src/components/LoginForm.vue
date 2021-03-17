<template>
    <form novalidate>
        <fieldset>
            <legend>{{title}}</legend>
            <div class="mb-3 position-relative">
                <label class="form-label" for="userName">Nombre de usuario:</label>
                <input v-model="userName" type="text" id="userName" class="form-control" :class="{'border-danger': error.userName}">
                <i class="bi bi-person"></i>
                <p class="text-danger" v-if="error.userName">Introduce un nombre de usuario</p>
            </div>
            <div class="mb-3 position-relative" v-if="!isLogin">
                <label for="email" class="form-label">Email:</label>
                <input v-model="email" type="email" id="email" class="form-control" :class="{'border-danger': error.email}">
                <i class="bi bi-at"></i>
                <p class="text-danger" v-if="error.email">Introduce un email válido</p>
            </div>
            <div class="mb-3 position-relative">
                <label for="password" class="form-label">Contraseña:</label>
                <input v-model="password" type="password" id="password" class="form-control" :class="{'border-danger': error.password}">
                <p class="text-danger" v-if="error.password">Introduce una contraseña</p>
                <i class="bi bi-lock"></i>
            </div>
            <div class="d-grid mb-3">
                <button class="btn btn-success" @click="onClick($event)">Enviar</button>
            </div>
            <p v-if="isLogin">¿No tienes una cuenta? <router-link to="/signup">Regístrate.</router-link></p>
            <p v-if="!isLogin">¿Ya estás registrado? <router-link to="/login">Accede.</router-link></p>
        </fieldset>
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
        async submitForm(e) {
            const endpoint = this.isLogin ? '/login' : '/signup';
            const body = {
                userName: this.userName,
                password: this.password,
                email: !this.isLogin ? email : null
            };
           
            try {
                const res = await http.post(endpoint, body);
                console.log('res', res);
            } catch (er) {
                console.error('er', er);
            }
        },

        onClick(e) {
            e.preventDefault();
            this.error.userName = !this.userName;
            this.error.email = !this.isLogin && !this.email;
            this.error.password = !this.password;

            if (!Object.values(this.error).some(v => v))
                this.submitForm();
        }
    },
    data() {
        return {
            userName: '',
            email: '',
            password: '',
            isLogin: this.type === 'login',
            title: this.type === 'login' ? 'Identificación' : 'Registro',
            error: {
                userName: false,
                email: false,
                password: false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.bi {
    position: absolute;
    top: 2.2rem;
    left: .5rem;
    font-size: 1.3rem;
    opacity: .5;
}

.form-control {
    padding-left: 2rem;
}
</style>