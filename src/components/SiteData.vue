<template>
    <article v-if="site">
        <div class="row mt-3">
            <div class="col-12">
                <h1 class="border-bottom pb-2 mb-3 fs-2">Datos de {{currentSite.host}}</h1>
            </div>
        </div>
        <section class="row">
            <div class="col-12">
                <global-data/>
            </div>
        </section>
        <section class="row">
           <div class="col-12">
                <site-graphics/>
            </div>
        </section>

    </article>
</template>

<script>
import GlobalData from './GlobalData.vue';
import SiteGraphics from './SiteGraphics.vue';
import { mapActions, mapGetters } from 'vuex';
import router from '../router';

export default {
    components: { SiteGraphics, GlobalData },
    name: 'SiteData',
    methods: {
        ...mapActions(['getSite', 'getOwner'])
    },
    computed: mapGetters(['site']),
    
    data() {
        return {
            currentSite: null
        }
    },
    
    async created() {
        const jwt = sessionStorage.getItem('uxa-jwt');
        this.currentSite = JSON.parse(sessionStorage.getItem('currentSite'));
        
        if (!this.owner?.userName && jwt)
            await this.getOwner();
        else if (!jwt)
            router.push({ path: '/login'});

        if (this.currentSite)
            await this.getSite(this.currentSite.token);
        else
            router.push({ path: '/sites' });
    }
}
</script>
