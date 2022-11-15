<script lang="ts">
// Controls rendering and styling Bar graphs with Chart.js
import GraphData from '../GraphData';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
    data() {
        return {
            chartOptions: {
                indexAxis: 'y',
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
        :width="width"
        :height="height"
    ></Bar>
</template>
