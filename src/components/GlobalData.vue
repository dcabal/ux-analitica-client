<template>
        <table class="table">
        <colgroup>
            <col span="2">
            <col span="3" class="time">
            <col span="3" class="pixels">
            <col span="3" class="clicks">
            <col span="3" class="keystrokes">
        </colgroup>
        <thead>
            <tr>
                <th rowspan="2" @click="dataSort('path')">Ruta</th>
                <th rowspan="2" @click="dataSort('visits')">Visitas</th>
                <th colspan="3">Tiempo de estancia (s)</th>
                <th colspan="3">Píxeles recorridos</th>
                <th colspan="3">Número de clicks</th>
                <th colspan="3">Número de pulsaciones de teclado</th>
            </tr>
            <tr>
                <th @click="dataSort('timeMax')">Máximo</th>
                <th @click="dataSort('timeMin')">Mínimo</th>
                <th @click="dataSort('timeAvg')">Medio</th>
                <th @click="dataSort('pixelsMax')">Máximo</th>
                <th @click="dataSort('pixelsMin')">Mínimo</th>
                <th @click="dataSort('pixelsAvg')">Medio</th>
                <th @click="dataSort('clicksMax')">Máximo</th>
                <th @click="dataSort('clicksMin')">Mínimo</th>
                <th @click="dataSort('clicksAvg')">Medio</th>
                <th @click="dataSort('keysMax')">Máximo</th>
                <th @click="dataSort('keysMin')">Mínimo</th>
                <th @click="dataSort('keysAvg')">Medio</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="m of globalMetrics" :key="m.globalMetrics">
                <td>{{m.path}}</td>
                <td>{{m.visits}}</td>
                <td>{{Math.round(m.timeMax / 1000)}}</td>
                <td>{{Math.round(m.timeMin / 1000)}}</td>
                <td>{{Math.round(m.timeAvg / 1000)}}</td>
                <td>{{m.pixelsMax}}</td>
                <td>{{m.pixelsMin}}</td>
                <td>{{m.pixelsAvg}}</td>
                <td>{{m.clicksMax}}</td>
                <td>{{m.clicksMin}}</td>
                <td>{{m.clicksAvg}}</td>
                <td>{{m.keysMax}}</td>
                <td>{{m.keysMin}}</td>
                <td>{{m.keysAvg}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { mapActions, mapGetters } from 'vuex'


export default {
    name: 'GlobalData',
    computed: mapGetters(['site']),
    created() {
        this.getGlobalData();
    },
    methods: {
        ...mapActions(['getSite']),

        async getGlobalData() {
            let siteData = await this._getSitePaths();

            for (const siteVisits of this.site) {
                const path = siteData.find(e => e.path === siteVisits.path);
                
                path.timeMax = siteVisits.timeTotal > path.timeMax ? siteVisits.timeTotal : path.timeMax;
                path.timeMin = path.timeMin === 0 ? siteVisits.timeTotal : siteVisits.timeTotal < path.timeMin ? siteVisits.timeTotal : path.timeMin;
                path.timeSum += siteVisits.timeTotal;

                path.pixelsMax = siteVisits.mouseMovements.length > path.pixelsMax ? siteVisits.mouseMovements.length : path.pixelsMax;
                path.pixelsMin = path.pixelsMin === 0 ? siteVisits.mouseMovements.length : siteVisits.mouseMovements.length < path.pixelsMin ? siteVisits.mouseMovements.length : path.pixelsMin;
                path.pixelsSum += siteVisits.mouseMovements.length;

                path.clicksMax = siteVisits.totalClicks > path.clicksMax ? siteVisits.totalClicks : path.clicksMax;
                path.clicksMin = path.clicksMin === 0 ? siteVisits.totalClicks : siteVisits.totalClicks < path.clicksMin ? siteVisits.totalClicks : path.clicksMin;
                path.clicksSum += siteVisits.totalClicks;

                path.keysMax = siteVisits.totalKeyStrokes > path.keysMax ? siteVisits.totalKeyStrokes : path.keysMax;
                path.keysMin = path.keysMin === 0 ? siteVisits.totalKeyStrokes : siteVisits.totalKeyStrokes < path.keysMin ? siteVisits.totalKeyStrokes : path.keysMin;
                path.keysSum += siteVisits.totalKeyStrokes;

                path.visits++;
            }

            for (const path of siteData) {
                path.timeAvg = Math.floor(path.timeSum / path.visits);
                path.pixelsAvg = Math.floor(path.pixelsSum / path.visits);
                path.clicksAvg = Math.floor(path.clicksSum / path.visits);
                path.keysAvg = Math.floor(path.keysSum / path.visits);
            }
            this.globalMetricsDefault = siteData;
            this.globalMetrics = siteData;
        },

        async _getSitePaths() {

            if (!this.site) {
                const siteToken = JSON.parse(sessionStorage.getItem('currentSite')).token;
                await this.getSite(siteToken);
            }

            const siteData = this.site.reduce((paths, el) => {
                if (!paths.find(e => e.path === el.path))
                    paths.push({ 
                        path: el.path,
                        visits: 0,
                        timeMax: 0,
                        timeMin: 0,
                        timeSum: 0,
                        timeAvg: 0,
                        pixelsMax: 0,
                        pixelsMin: 0,
                        pixelsSum: 0,
                        pixelsAvg: 0,
                        clicksMax: 0,
                        clicksMin: 0,
                        clicksSum: 0,
                        clicksAvg: 0,
                        keysMax: 0,
                        keysMin: 0,
                        keysSum: 0,
                        keysAvg: 0,
                    });
                
                return paths;
            }, []);

            return siteData;
        },

        dataSort(field) {
            if (this.lastSort.field === field) {
                this.lastSort.asc = !this.lastSort.asc;
            } else {
                this.lastSort.field = field;
                this.lastSort.asc = true;
            }
            
            this.globalMetrics.sort((a, b) => {
                if (typeof a[field] === 'string')
                    return this.lastSort.asc ? (a[field] > b[field]) - (b[field] > a[field]) : (b[field] > a[field]) - (a[field] > b[field]);
                else
                    return this.lastSort.asc ? a[field] - b[field] : b[field] - a[field];
            });
        }
    },
    data() {
        return {
            globalMetricsDefault: [],
            globalMetrics: reactive([]),
            lastSort: { field: '', asc: false }
        }
    }
}
</script>

<style lang="scss" scoped>
.time {
    background: #BCDDBE;
}
.pixels {
    background: #FFFCD6;
}
.clicks {
    background: #F7F2B6;
}
.keystrokes {
    background: #FCDEAC;
}
</style>