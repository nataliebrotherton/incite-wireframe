<script lang="ts">
import GraphData from '../GraphData';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { ref, onMounted } from 'vue'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

onMounted(() => {
    let chart = ChartJS.getChart('month_billable_hours');
    console.log(chart);
})

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
    updated: function() {
        let chart = ChartJS.getChart(this.graphData?.getName());
        console.log(chart);
    },
    mounted() {
        let gradient = this.generateLineGradient();
        let data = this.graphData?.getData();
        data['datasets'][0]['borderColor'] = gradient;
        this.chartData = data;
    },
    data() {
        return {
            chartData: this.graphData?.getData()
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
        :ref="getChartId()"
        :chart-data="chartData"
        :chart-id="getChartId()"
        :id="graphData?.getName()"
        class="chart-container line"
        :width="width"
        :height="height"
    ></Line>
</template>