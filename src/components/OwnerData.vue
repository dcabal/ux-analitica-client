<template>
    <div class="row">
        <section class="col-12 col-lg-6">
            <h1 class="border-bottom pb-2 mb-3 fs-2">Datos de usuario</h1>
            <p><strong>Nombre de usuario: </strong>{{userName}}</p>
            <p><strong>Email: </strong>{{email}}</p>
            <user-update/>
        </section>
        <section class="col-12 col-lg-6">
            <h1 class="border-bottom pb-2 mb-3 fs-2">Sitios registrados</h1>
            <p v-if="!sites.length">No tienes ningún sitio registrado</p>
            <table v-if="sites.length" class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre del sitio web</th>
                        <th scope="col">Token de acceso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="site in sites" :key="site._id" @click="onRowClick(site)">
                        <td>{{site.host}}</td>
                        <td>{{site.token}}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
import http from '../util/Http';
import UserUpdate from './UserUpdate.vue';

export default {
    components: { UserUpdate },
    async mounted() {
        await http.get('/owner')
        .then(owner => {
            this.httpError.error = false;
            this.userName = owner.userName,
            this.email = owner.email,
            this.sites = owner.sites
        })
        .catch(er => {
            this.httpError.error = true;
            this.httpError.errorMsg = er.message;
        });
    },
    methods: {
        onRowClick(site) {
            
            console.log(site);
        }
    },
    data() {
        return {
            userName: '',
            email: '',
            sites: [],
            httpError: {
                error: true,
                errorMsg: null
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>