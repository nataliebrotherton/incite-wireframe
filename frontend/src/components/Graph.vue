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
            graphData: new GraphData(this.graphName),
            clientData: [],
            selectedClient: ''
        }
    },
    methods: {
        getClients() {
            return this.graphData.getClients();
        }
    },
    created: function() { 
        this.graphData.getAPIData()
        .then(() => {
            if (this.renderDropdown) {
                this.clientData = this.getClients();
                this.selectedClient = this.clientData[0];
            }
        })
    },

    components: {
        BarChart,
        LineChart,
        PieChart
    }
}
</script>

<template>
    <div class="dropdown" v-if="renderDropdown">
        <label for="client">View projects by client</label>       
        <select v-model="selectedClient" class="card" name="client" id="client">
            <option v-for="client in clientData" :label="client">
                {{ client }}
            </option>
        </select>
    </div>
    <div :id="graphName" class="graph card">
        <p class="label">
            {{graphData.getLabel()}}<span v-if="renderDropdown">: {{ selectedClient }}</span>
        </p>
        <BarChart v-if="graphData.isBar()" :graph-data="graphData" />
        <LineChart v-else-if="graphData.isLine()" :graph-data="graphData" />
        <PieChart v-else-if="graphData.isPie()" :graph-data="graphData" :client="selectedClient" />
    </div>

</template>

<style lang="scss">
    .dropdown {
        margin: 11px;

        label {
            color: var(--text-label-1);
        }

        select {
            color: var(--text-title-2);
            font-weight: var(--font-weight);
            margin-left: 10px;
            padding: 5px;
            width: auto;
            border: none;
            font-family: var(--system-font);
        }
    }

    .graph {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        margin-right: 10px;
        padding: 20px;

        overflow-y: auto;
        overflow-x: hidden;
        width: 600px;
        height: 400px;

        .label {
            // font-size: 25px;
            font-size: clamp(20px, 25px, 30px);
            margin: 5px;
        }

        &#client_project_hours {
            height: 350px;
        }
    }
</style>
