<template>
    <form novalidate>
        <fieldset>
            <legend>{{title}}</legend>
            <div class="mb-3 position-relative">
                <label class="form-label" for="userName">Nombre de usuario:</label>
                <input v-model="userName" type="text" id="userName" class="form-control" :class="{'border-danger': validationError.userName}">
                <i class="bi bi-person"></i>
                <p class="text-danger" v-if="validationError.userName">Introduce un nombre de usuario</p>
            </div>
            <div class="mb-3 position-relative" v-if="!isLogin">
                <label for="email" class="form-label">Email:</label>
                <input v-model="email" type="email" id="email" class="form-control" :class="{'border-danger': validationError.email}">
                <i class="bi bi-at"></i>
                <p class="text-danger" v-if="validationError.email">Introduce un email válido</p>
            </div>
            <div class="mb-3 position-relative">
                <label for="password" class="form-label">Contraseña:</label>
                <input v-model="password" type="password" id="password" class="form-control" :class="{'border-danger': validationError.password}">
                <p class="text-danger" v-if="validationError.password">Introduce una contraseña</p>
                <i class="bi bi-lock"></i>
            </div>
            <div class="mb-3 alert alert-success" v-if="signupSuccess">
                Registro efectuado correctamente. Identifícate en <router-link to="/login">la página de acceso.</router-link>
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
import router from '../router';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'LoginForm',
    props: {
        type: String
    },
    methods: {
        ...mapActions(['login', 'signup']),
        async submitForm() {
            const res = this.isLogin ?
            await this.login({
                userName: this.userName,
                password: this.password
            }) :
            await this.signup({
                userName: this.userName,
                password: this.password,
                email: this.email
            });
            
            if (!this.error) {
                if (this.isLogin)
                    router.push({ path: this.isLogin ? '/dashboard' : '/login'});
                else
                    this.signupSuccess = true;
            }
        },

        onClick(e) {
            e.preventDefault();
            this.validationError.userName = !this.userName;
            this.validationError.email = !this.isLogin && !this.email;
            this.validationError.password = !this.password;
            
            if (!Object.values(this.validationError).some(v => v))
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
            validationError: {
                userName: false,
                email: false,
                password: false
            }, 
            signupSuccess: false
        }
    },
    computed: mapGetters(['error'])
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