<template>
    <!-- <header class="row bg-light">
        <div class="col-3">
            <h1>
                <router-link class="navbar-brand" to="/">Analitica</router-link>
            </h1>
        </div>
        <nav class="col-9 navbar">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <router-link class="nav-link" to="/stats">Estadísticas</router-link>
                </li>
            </ul>
        </nav>
    </header> -->
    <header class="bg-secondary">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div class="container-fluid">
                    <router-link class="navbar-brand" to="/">Analitica</router-link>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/stats">Estadísticas</router-link>
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