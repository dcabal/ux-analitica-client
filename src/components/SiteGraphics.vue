<template>
    <div>
        <div v-for="(site, index) in Object.entries(groupedElements)" :key="index"  class="row mt-3">
            <h1>Ruta: {{site[0]}}</h1>
            <usage-chart chart-type="interactions" :chart-data="site[1]" />
            <usage-chart chart-type="mouse" :chart-data="site[1]" />
            <usage-chart chart-type="tab" :chart-data="site[1]" />
            <usage-chart chart-type="untracked" :chart-data="site[1]" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UsageChart from './UsageChart.vue';

export default {
    name: 'SiteGraphics',
    components: { UsageChart },
    computed: mapGetters(['site']),
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
                if (!this.interactions[visit.path])
                    this.interactions[visit.path] = visit.interactions;
                else
                    this.interactions[visit.path] = [...this.interactions[visit.path], ...visit.interactions];
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
        },

        getUsage(usage, data) {

        }
    },
    data() {
        return {
            interactions: {},
            groupedElements: {}
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
