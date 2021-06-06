<template>
    <div>
        <div class="row mt-3">
            <div class ="col-12 col-lg-6">
                <h1>Ruta: {{selectedRoute}}</h1>
            </div>
            <div class="col-6 col-lg-3 dropdown">
                <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{watchPeriod}}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click="setTime('w')">Últimos 7 días</a></li>
                    <li><a class="dropdown-item" href="#" @click="setTime('m')">Últimos 30 días</a></li>
                    <li><a class="dropdown-item" href="#" @click="setTime('t')">Últimos 90 días</a></li>
                    <li><a class="dropdown-item" href="#" @click="setTime('s')">Últimos 180 días</a></li>
                    <li><a class="dropdown-item" href="#" @click="setTime('y')">Último año</a></li>
                    <li><a class="dropdown-item" href="#" @click="setTime('a')">Todo el periodo</a></li>
                </ul>
            </div>
        </div>
        <div class="row" v-if="groupedElements[selectedRoute]">
            <usage-chart chart-type="interactions" :chart-data="groupedElements[selectedRoute]" :key="`${selectedRoute}${dates.start}`" />
            <usage-chart chart-type="mouse" :chart-data="groupedElements[selectedRoute]" :key="`${selectedRoute}${dates.start}`" />
            <usage-chart chart-type="tab" :chart-data="groupedElements[selectedRoute]" :key="`${selectedRoute}${dates.start}`" />
            <usage-chart chart-type="untracked" :chart-data="groupedElements[selectedRoute]" :key="`${selectedRoute}${dates.start}`" />
        </div>
        <div class="alert alert-danger mt-3" v-else>
            No existen datos para el periodo seleccionado
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UsageChart from './UsageChart.vue';

export default {
    name: 'SiteGraphics',
    components: { UsageChart },
    computed: mapGetters(['site', 'selectedRoute']),
    created () {
        this.extract();
        this.group();
        this.calculateAverage();
    },
    methods: {
        
        /**
         * Extrae las interacciones por ruta y elemento.
         */
        extract() {
            for (const visit of this.site) {
                const visitDate = new Date(visit.date);
                if (visitDate > this.dates.start && visitDate < this.dates.end) {
                    if (!this.interactions[visit.path])
                        this.interactions[visit.path] = visit.interactions;
                    else
                        this.interactions[visit.path] = [...this.interactions[visit.path], ...visit.interactions];
                }
            }
        },
        /**
         * Agrupa las interacciones de cada elemento en la ruta
         */
        group() {
            Object.entries(this.interactions).forEach(([key, value]) => {
                if (!this.groupedElements[key]) this.groupedElements[key] = {};
                let route = this.groupedElements[key];

                for (let element of value) {
                    route = !element.trackedElement ? this._addUntracked(route, element) : this._addTracked(route, element);
                }
            });
        },

        /**
         * Calcula la media de píxeles recorridos y pulsaciones de tablulador de
         * cada elemento contabilizado.
         */
        calculateAverage() {
            Object.values(this.groupedElements).forEach(value => {
                for (let v in value) {
                    if (!value[v].length) {
                        value[v].mouseMovementBefore = Math.round(value[v].mouseMovementBefore / value[v].interactions);
                        value[v].tabPressesBefore = Math.round(value[v].tabPressesBefore / value[v].interactions);
                    }
                }
            });
        },

        setTime(period, endDate = new Date()) {
            const today = new Date();
            const periods = {
                'w': { startDate: today.setDate(today.getDate() - 7), watch: 'Últimos 7 días' },
                'm': { startDate: today.setDate(today.getDate() - 30), watch: 'Últimos 30 días' },
                't': { startDate: today.setDate(today.getDate() - 90), watch: 'Últimos 90 días' },
                's': { startDate: today.setDate(today.getDate() - 180), watch: 'Últimos 180 días' },
                'y': { startDate: today.setYear(today.getFullYear() - 1), watch: 'Último año' },
                'a': { startDate: new Date(0), watch: 'Todo el periodo'}
            };
            this.dates.start = periods[period].startDate;
            this.dates.end = endDate;
            this.watchPeriod = periods[period].watch;
            this.interactions = {};
            this.groupedElements = {};
            this.extract();
            this.group();
            this.calculateAverage();
        },

        /**
         * Contabiliza un elemento no interactuable (párrafo, títulos, imágenes, etc)
         * @param {Object} route Grupo de interacciones para una ruta concreta.
         * @param {Object} element Elemento a contabilizar.
         * @returns {Object} Grupo de interacciones para una ruta con el nuevo elemento contabilizado.
         */
        _addUntracked(route, element) {
            const newElement = { html: element.html, interactions: 1 };

            if (!route['untracked']) {
                route['untracked'] = [newElement];
            } else {
                const interacted = route.untracked.find(e => e.html === element.html);
                if (!interacted) {
                    route.untracked.push(newElement);
                } else {
                    interacted.interactions++;
                }
            }

            return route;
        },

        /**
         * Contabiliza un elemento interactuable (elementos de formulario, enlaces...)
         * @param {Object} route Grupo de interacciones para una ruta concreta.
         * @param {Object} element Elemento a contabilizar.
         * @returns {Object} Grupo de interacciones para una ruta con el nuevo elemento contabilizado.
         */
        _addTracked(route, element) {
            let trackedElement = route[element.trackedElement];

            if (!trackedElement) {
                route[element.trackedElement] = {
                    interactions: 1,
                    mouseMovementBefore: element.mouseMovementBefore,
                    tabPressesBefore: element.tabPressesBefore,
                    html: element.html
                };
            } else {
                trackedElement.interactions++;
                trackedElement.mouseMovementBefore += element.mouseMovementBefore;
                trackedElement.tabPressesBefore += element.tabPressesBefore;
            }

            return route;
        }
    },
    data() {
        return {
            interactions: {},
            groupedElements: {},
            dates: { start: new Date(0), end: new Date() },
            watchPeriod: 'Todo el periodo'
        }
    }
}
/*
Estructuras:
--------------------
interactions: {
    "ruta": [
        {
            mouseMovementBefore: number,
            tabPressesBefore: number,
            trackedElement: string, (data-uxa del elemento)
            html: string
        },
        ...
    ],
    ...
}

groupedElements: {
    "ruta": {
        "elemento(data-uxa)": {
            interactions,
            mouseMovementBefore,
            tabPressesBefore,
            html
        }
    }
    ]
}
*/
</script>
<style lang="scss" scoped>
h1 {
    font-size: 1.8rem;
}
</style>
