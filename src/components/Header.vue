<template>
    <header class="bg-secondary">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div class="container-fluid">
                    <router-link class="navbar-brand" to="/">Analitica</router-link>
                    <div class="collapse navbar-collapse d-flex justify-content-between">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/user">Datos de usuario</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/sites">Sitios registrados</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/warnings">Advertencias</router-link>
                            </li>
                        </ul>
                        <button type="button" class="btn btn-danger" @click="onLogOut">Cerrar sesión</button>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import router from '../router';

export default {
    name: 'Header',
    methods: {
        onLogOut() {
            sessionStorage.removeItem('currentSite');
            sessionStorage.removeItem('uxa-jwt');
            router.push({ path: '/login' });
        }
    }
}
</script>