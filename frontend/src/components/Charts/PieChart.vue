<script lang="ts">
// Controls rendering and styling Pie chart
import GraphData from '../GraphData';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement)
ChartJS.register(ChartDataLabels);

export default {
    props: {
        graphData: GraphData,
        client: String,
        width: {
            type: Number,
            default: 250
        },
        height: {
            type: Number,
            default: 250
        }
    },
    components: {
        Doughnut
    },
    data() {
        return {
            chartOptions: {
                plugins: {
                    datalabels: {
                        anchor: 'center',
                        clamp: true,
                        align: 'start',
                        visibility: true,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            chartData: this.getClientData()
        }
    },
    mounted() {
        this.chartData = this.getClientData();
    },
    watch: {
        client: {
            handler(newVal, oldVal) {
                if (newVal.length > 0) {
                    this.chartData = this.getClientData();
                }
                
            }
        }
    },
    methods: {
        getClientData() {
            return this.graphData?.getClientData(this.client)
        }
    }
}

</script>

<template>
    <Doughnut 
        v-if="graphData?.isLoaded()"
        :ref="graphData?.getName()"
        :chart-data="chartData"
        :chart-id="graphData?.getName()"
        class="chart-container pie"
        :id="graphData?.getName()"
        :width="width"
        :height="height"
    ></Doughnut>
</template>