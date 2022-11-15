<script lang="ts">
import GraphData from '../GraphData';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    props: {
        graphData: GraphData,
    },
    components: {
        Bar
    },
    data() {
        return {
            chartOptions: {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }              
        }
    }
}

</script>

<template>
    <Bar 
        v-if="graphData?.isLoaded()"
        :chart-data="graphData?.getData()"
        :chart-id="graphData?.getName()"
        :chart-options="chartOptions"
    ></Bar>
</template>
