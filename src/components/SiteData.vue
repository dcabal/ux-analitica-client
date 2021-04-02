<template>
    <div class="row mt-3">
        <div class="col-12">
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
                        <th rowspan="2">Ruta</th>
                        <th rowspan="2">Visitas</th>
                        <th colspan="3">Tiempo de estancia (ms)</th>
                        <th colspan="3">Píxeles recorridos</th>
                        <th colspan="3">Número de clicks</th>
                        <th colspan="3">Número de pulsaciones de teclado</th>
                    </tr>
                    <tr>
                        <th>Máximo</th>
                        <th>Mínimo</th>
                        <th>Medio</th>
                        <th>Máximo</th>
                        <th>Mínimo</th>
                        <th>Medio</th>
                        <th>Máximo</th>
                        <th>Mínimo</th>
                        <th>Medio</th>
                        <th>Máximo</th>
                        <th>Mínimo</th>
                        <th>Medio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="path in Object.entries(globalMetrics)" :key="path[0]">
                        <td>{{path[0]}}</td>
                        <td>{{path[1].visits}}</td>
                        <td>{{path[1].time.max}}</td>
                        <td>{{path[1].time.min}}</td>
                        <td>{{path[1].time.avg}}</td>
                        <td>{{path[1].pixels.max}}</td>
                        <td>{{path[1].pixels.min}}</td>
                        <td>{{path[1].pixels.avg}}</td>
                        <td>{{path[1].clicks.max}}</td>
                        <td>{{path[1].clicks.min}}</td>
                        <td>{{path[1].clicks.avg}}</td>
                        <td>{{path[1].keyStrokes.max}}</td>
                        <td>{{path[1].keyStrokes.min}}</td>
                        <td>{{path[1].keyStrokes.avg}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SiteData',
    computed: mapGetters(['site']),
    mounted() {
        this.getGlobalData();
    },
    methods: {
        getGlobalData() {
            let siteData = this._getSitePaths();
            for (const siteVisits of this.site) {
                const { time, pixels, clicks, keyStrokes } = siteData[siteVisits.path];
                
                time.max = siteVisits.timeTotal > time.max ? siteVisits.timeTotal : time.max;
                time.min = time.min === 0 ? siteVisits.timeTotal : siteVisits.timeTotal < time.min ? siteVisits.timeTotal : time.min;
                time.sum += siteVisits.timeTotal;

                pixels.max = siteVisits.mouseMovements.length > pixels.max ? siteVisits.mouseMovements.length : pixels.max;
                pixels.min = pixels.min === 0 ? siteVisits.mouseMovements.length : siteVisits.mouseMovements.length < pixels.min ? siteVisits.mouseMovements.length : pixels.min;
                pixels.sum += siteVisits.mouseMovements.length;

                clicks.max = siteVisits.totalClicks > clicks.max ? siteVisits.totalClicks : clicks.max;
                clicks.min = clicks.min === 0 ? siteVisits.totalClicks : siteVisits.totalClicks < clicks.min ? siteVisits.totalClicks : clicks.min;
                clicks.sum += siteVisits.totalClicks;

                keyStrokes.max = siteVisits.totalKeyStrokes > keyStrokes.max ? siteVisits.totalKeyStrokes : keyStrokes.max;
                keyStrokes.min = keyStrokes.min === 0 ? siteVisits.totalKeyStrokes : siteVisits.totalKeyStrokes < keyStrokes.min ? siteVisits.totalKeyStrokes : keyStrokes.min;
                keyStrokes.sum += siteVisits.totalKeyStrokes;

                siteData[siteVisits.path].visits++;
            }

            Object.values(siteData).forEach(path => {
                Object.values(path).forEach(data => {
                    if (data.hasOwnProperty('avg'))
                        data.avg = Math.floor(data.sum / path.visits);
                });
            });
            this.globalMetrics = siteData;
        },

        _getSitePaths() {
            const sitePaths = {};
            const paths = this.site.reduce((paths, el) => {
                if (!paths.find(e => e === el.path))
                    paths.push(el.path)
                
                return paths;
            }, []);

            for (const path of paths) {
                sitePaths[path] = {
                    time: { max: 0, min: 0, avg: 0, sum: 0 },
                    pixels: { max: 0, min: 0, avg: 0, sum: 0 },
                    clicks: { max: 0, min: 0, avg: 0, sum: 0 },
                    keyStrokes: { max: 0, min: 0, avg: 0, sum: 0 },
                    visits: 0
                };
            }
            return sitePaths;
        },
    },
    data() {
        return {
            globalMetrics: {}
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