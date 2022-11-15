<script lang="ts">
import GraphData from '../GraphData';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export default {
    props: {
        graphData: GraphData
    },
    components: {
        Line
    }
}

</script>

<template>
    <Line 
        v-if="graphData?.isLoaded()"
        :chart-data="graphData?.getData()"
        :chart-id="graphData?.getName()"
    ></Line>
</template>