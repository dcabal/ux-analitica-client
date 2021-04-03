<template>
    <article>
        <section class="row mt-3">
            <div class="col-12">
                <global-data/>
            </div>
        </section>
        <section class="row mt-3">
            <div class="col-12">
                <site-graphics/>
            </div>
        </section>
    </article>
</template>

<script>
import GlobalData from './GlobalData.vue';
import SiteGraphics from './SiteGraphics.vue';

export default {
    components: { SiteGraphics, GlobalData },
    name: 'SiteData'
}
</script>
