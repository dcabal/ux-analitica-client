<template>
    <form novalidate>
        <button v-if="!updating" class="btn btn-success" @click="onToggleForm($event)">Modificar datos</button>
        <fieldset v-if="updating">
            <div class="mb-3 alert alert-info">
                Deja en blanco los campos que no quieras modificar
            </div>
            <div class="mb-3 alert alert-danger" v-if="error">
                {{error}}
            </div>
            <div class="mb-3 position-relative">
                <label class="form-label" for="userName">Nombre de usuario:</label>
                <input v-model="userName" type="text" id="userName" class="form-control">
                <i class="bi bi-person"></i>
            </div>
            <div class="mb-3 position-relative">
                <label for="email" class="form-label">Email:</label>
                <input v-model="email" type="email" id="email" class="form-control">
                <i class="bi bi-at"></i>
            </div>
            <div class="mb-3 position-relative">
                <label for="password" class="form-label">Contraseña:</label>
                <input v-model="password" type="password" id="password" class="form-control">
                <i class="bi bi-lock"></i>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-success" type="button" :disabled="!userName && !email && !password" @click="onSubmit">Modificar datos</button>
                <button class="btn btn-secondary" type="button" @click="onToggleForm($event)">Cancelar</button>
            </div>
        </fieldset>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'UserUpdate',
    methods: {
        ...mapActions(['updateOwner']),
        async onSubmit(e) {
            e.preventDefault();
            await this.updateOwner({
                userName: this.userName,
                password: this.password,
                email: this.email
            });
            if (!this.error)
                this.onToggleForm();
        },
        onToggleForm(e) {
            e?.preventDefault();
            this.updating = !this.updating;
            this.userName = '';
            this.email = '';
            this.password = '';
        }
    },
    data() {
        return {
            updating: false,
            userName: '',
            email: '',
            password: ''
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