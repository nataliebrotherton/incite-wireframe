<script lang="ts">
// Controls rendering and styling Bar graphs with Chart.js
import GraphData from '../GraphData';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(ChartDataLabels);

export default {
    props: {
        graphData: GraphData,
        width: {
            type: Number,
            default: 550
        },
        height: {
            type: Number,
            default: 600
        }
    },
    components: {
        Bar
    },
    mounted() {
        let ctx = document.getElementById(this.getChartId()).getContext('2d');
        this.chartOptions.plugins.datalabels.anchor = (ctx : any) => {
            const val = ctx.parsed;
            const idx = ctx.dataIndex;
            return 'end';
        }
    },
    methods: {
        getChartId() {
            return this.graphData?.getName()+'-chart';
        }
    },
    data() {
        return {
            chartOptions: {
                indexAxis: 'y',
                elements: {
                    bar: {
                        borderRadius: 20,
                        barThickness: 20
                    }
                },
                scales: {
                    x: {
                        display: false
                    }
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        clamp: false,
                        align: 'start',
                        color: '#fff',
                        formatter: Math.round,
                        font: {
                            size: 10,
                            weight: 500
                        }
                    }
                }
            },
            width: this.graphData?.getName() == 'employee_billable_hours' ? 1150 : 500
        }
    }
}

</script>

<template>
    <Bar 
        v-if="graphData?.isLoaded()"
        :chart-data="graphData?.getData()"
        :chart-id="getChartId()"
        :id="graphData?.getName()"
        class="chart-container bar"
        :chart-options="chartOptions"
        :width="width"
        :height="height"
    ></Bar>
</template>
