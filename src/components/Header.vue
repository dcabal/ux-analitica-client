<template>
    <header class="row">
        <div class="col-3">
            <h1>
                <router-link to="/">Analitica</router-link>
            </h1>
        </div>
        <nav class="col-9">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <router-link class="nav-link" to="/stats">Estadísticas</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>