<template>
    <div>
        <owner-data />
        <site-data v-if="site?.length" />
    </div>
</template>

<script>
import OwnerData from '../components/OwnerData';
import SiteData from '../components/SiteData.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    components: { OwnerData, SiteData },
    computed: mapGetters(['site'])
}
</script>