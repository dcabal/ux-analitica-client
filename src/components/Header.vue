<template>
    <header class="bg-secondary">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div class="container-fluid">
                    <router-link class="navbar-brand" to="/">Analitica</router-link>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/user">Datos de usuario</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/sites">Sitios registrados</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>