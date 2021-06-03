<template>
    <div>
        <site-data />
    </div>
</template>

<script>

import SiteData from '../components/SiteData.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    components: { SiteData },
    computed: mapGetters(['site'])
}
</script>