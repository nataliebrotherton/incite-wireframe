<script lang="ts">
import GraphData from '../GraphData';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement)

export default {
    props: {
        graphData: GraphData
    },
    components: {
        Doughnut
    }
}

</script>

<template>
    <Doughnut 
        v-if="graphData.isLoaded()"
        :chart-data="graphData.getData()"
        :chart-id="graphData.getName()"
    ></Doughnut>
</template>