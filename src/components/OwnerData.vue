<template>
    <div class="row" v-if="owner?.userName">
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
                    <tr v-for="site in owner.sites" 
                        :key="site._id" 
                        @click="onRowClick(site)" 
                        :class="{'table-active': currentSite === site }"
                    >
                        <td>{{site.host}}</td>
                        <td>{{site.token}}</td>
                    </tr>
                </tbody>
            </table>
            <new-site/>
        </section>
    </div>
</template>

<script>
import UserUpdate from './UserUpdate.vue';
import NewSite from './NewSite.vue';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';

export default {
    components: { UserUpdate, NewSite },

    methods: {
        ...mapActions(['getSite', 'getOwner']),
        onRowClick(site) {
            this.currentSite = site;
            this.getSite(site.token);
        }
    },

    data() {
        return {
            currentSite: null
        }
    },
    
    computed: mapGetters(['error', 'owner']),

    mounted() {
        const jwt = sessionStorage.getItem('uxa-jwt');
        console.log('owner', this.owner)
        if (!this.owner?.userName && jwt)
        this.getOwner();
        else if (!jwt)
        router.push({ path: '/login'});
    }
}
</script>

<style lang="scss" scoped>
    tr {
        cursor: pointer;
    }
</style>