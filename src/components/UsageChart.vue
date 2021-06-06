<template>
    <div class="col-12 col-lg-6">
        <h2>{{chartSeries[0].name}}</h2>
        <apexchart width="95%" height="450" type="bar" :options="chartOptions" :series="chartSeries" />
    </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
    name: 'UsageChart',
    components: { apexchart: VueApexCharts },
    props: {
        chartType: String,
        chartData: Object
    },
    
    mounted() {
        if (this.chartData) {
            this.getCategories();
            this.getSeries();
        }
    },

    methods: {
        getCategories() {
            if (this.chartType !== 'untracked')
                this.chartOptions.xaxis.categories = Object.keys(this.chartData).filter(e => e !== 'untracked');
            else
                this.chartOptions.xaxis.categories = this._getUntrackedCategories();
        },

        getSeries() {
            let prop;
            switch (this.chartType) {
                case 'mouse':
                    prop = 'mouseMovementBefore';
                    this.chartSeries[0].name = 'Movimiento de ratón antes del foco';
                    break;
                case 'tab':
                    prop = 'tabPressesBefore';
                    this.chartSeries[0].name = 'Pulsaciones del tabulador antes del foco';
                    break;
                case 'interactions':
                    prop = 'interactions';
                    this.chartSeries[0].name = 'Interacciones con el elemento';
                    break;
                case 'untracked':
                    this.chartSeries[0].name = 'Elementos no interactivos';
            }
            if (this.chartType !== 'untracked') {
                for (const category of this.chartOptions.xaxis.categories) {
                    this.chartSeries[0].data.push(this.chartData[category][prop]);
                }
            } else {
                this.chartSeries[0].data = this._getUntrackedSeries();
            }
        },

        _getUntrackedCategories() {
            const untrackedElements = this.chartData['untracked'];
            let categories = [];

            for (const e of untrackedElements) {
                categories.push(e.html.substring(0, e.html.indexOf('>') + 1));
            }
            return categories;
        },

        _getUntrackedSeries() {
            const untrackedElements = this.chartData['untracked'];
            let series = [];
            
            for (const e of untrackedElements) {
                series.push(e.interactions);
            }
            return series;
        }
    },

    data() {
        return {
            chartOptions: {
                xaxis: {
                    categories: []
                }
            },
            chartSeries: [{
                name: '',
                data: []
            }]
        }
    }
}

</script>

<style lang="scss" scoped>
h2 {
    font-size: 1.25rem;
}
</style>