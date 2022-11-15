<script lang="ts">
// Controls rendering graphs
import GraphData from './GraphData';

import BarChart from './Charts/BarChart.vue';
import LineChart from './Charts/LineChart.vue';
import PieChart from './Charts/PieChart.vue';

export default {
    props: {
        graphName: String,
        renderDropdown: Boolean
    },
    data() {
        return {
            label: '',
            graphData: new GraphData(this.graphName)
        }
    },
    created: function() { this.graphData.getAPIData(); },
    components: {
        BarChart,
        LineChart,
        PieChart
    }
}
</script>

<template>
    <div :id="graphName" class="graph">
        <p class="label">{{ graphData.getLabel() }}</p>
        {{graphName}}
        <BarChart v-if="graphData.isBar()" :graph-data="graphData" />
        <LineChart v-else-if="graphData.isLine()" :graph-data="graphData" />
        <PieChart v-else-if="graphData.isPie()" :graph-data="graphData" />
    </div>

</template>

<style lang="scss">
    .graph {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        .label {
            font-size: 32;
        }
    }
</style>
