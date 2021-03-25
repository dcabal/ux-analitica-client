<template>
    <div>

    {{site}}
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SiteData',
    computed: mapGetters(['site'])
}
</script>