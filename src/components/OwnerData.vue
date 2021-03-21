<template>
    <div class="row">
        <section class="col-12 col-lg-6">
            <h1 class="border-bottom pb-2 mb-3 fs-2">Datos de usuario</h1>
            <p><strong>Nombre de usuario: </strong>{{owner.userName}}</p>
            <p><strong>Email: </strong>{{owner.email}}</p>
            <user-update/>
        </section>
        <section class="col-12 col-lg-6">
            <h1 class="border-bottom pb-2 mb-3 fs-2">Sitios registrados</h1>
            <p v-if="!owner.sites.length">No tienes ningún sitio registrado</p>
            <table v-if="owner.sites.length" class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre del sitio web</th>
                        <th scope="col">Token de acceso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="site in owner.sites" :key="site._id" @click="onRowClick(site)">
                        <td>{{site.host}}</td>
                        <td>{{site.token}}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
import UserUpdate from './UserUpdate.vue';
import { mapGetters } from 'vuex';

export default {
    components: { UserUpdate },

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
    },
    
    computed: mapGetters(['error', 'owner'])
}
</script>

<style lang="scss" scoped>

</style>