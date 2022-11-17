<script lang="ts">
import GraphData from '../GraphData';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { ref, onMounted } from 'vue'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export default {
    props: {
        graphData: GraphData,
        width: {
            type: Number,
            default: 500
        },
        height: {
            type: Number,
            default: 300
        }
    },
    components: {
        Line
    },
    mounted() {
        let gradient = this.generateLineGradient();
        let data = this.graphData?.getData();
        data['datasets'][0]['borderColor'] = gradient;
        this.chartData = data;
    },
    data() {
        return {
            chartData: this.graphData?.getData(),
            chartOptions: {
                elements: {
                    line: {
                        borderCapStyle: 'round',
                        borderJoinStyle: 'round',
                        tension: 0.2
                    },
                    point: {
                        radius: 0
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                if (!index || !((index + 1) % 6)) return this.getLabelForValue(value);
                            }
                        }
                    },
                    y: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                if (index % 2) return this.getLabelForValue(value);
                            }
                        }
                    }
                }
            }
        }
    },
    methods: {
        getChartId() {
            return this.graphData?.getName()+'-chart';
        },
        generateLineGradient() {
           let ctx = document.getElementById(this.getChartId()).getContext('2d');
           return this.graphData?.generateLineGradient(ctx, this.width, this.height);
        }
    }
}

</script>

<template>
    <Line 
        v-if="graphData?.isLoaded()"
        :chart-data="chartData"
        :chart-options="chartOptions"
        :chart-id="getChartId()"
        :id="graphData?.getName()"
        class="chart-container line"
        :width="width"
        :height="height"
    ></Line>
</template>