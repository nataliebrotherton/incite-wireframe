<script lang="ts">
// Controls rendering graphs, global styling
import GraphData from './GraphData';

import BarChart from './Charts/BarChart.vue';
import LineChart from './Charts/LineChart.vue';
import PieChart from './Charts/PieChart.vue';

// set default global chart styles
import { Chart } from 'chart.js';

const setChartDefaults = function() {
    let style = getComputedStyle(document.body);

    let text_label_color = style.getPropertyValue('--text-label-1');
    Chart.defaults.color = text_label_color;

    let font_weight = style.getPropertyValue('--font-weight');
    Chart.defaults.font.weight = font_weight;

    Chart.defaults.font.family = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

    // hide gridlines
    Chart.defaults.scale.grid.display = false;

    // hide legend
    Chart.defaults.plugins.legend.display = false;
    console.log(Chart.defaults);
};

setChartDefaults();

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
