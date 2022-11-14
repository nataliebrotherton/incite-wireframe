<script lang="ts">
import Graph from './Graph.vue'

export default {
    data() {
        return {
            graphDisplayData: {
                "client": {
                    "title": "Client Data",
                    "graphNames": [
                        "client_hours",
                        "client_project_hours"
                    ]
                },
                "timelog": {
                    "title": "Timelog Data",
                    "graphNames": [
                        "month_pto_hours",
                        "month_billable_hours",
                        "employee_billable_hours"
                    ]
                }
            }
        }
    },
    components: {
        Graph
    },
    methods: {
        isDropdown: (graph: string) => {
            return graph == 'client_project_hours';
        }
    }
}
</script>

<template>

    <div class="graph-section" v-for="section in graphDisplayData">
        <h3 class="title">{{section["title"]}}</h3>
        <div class="card" v-for="graphName in section.graphNames">
            
            <Graph :graphName="graphName" :render-dropdown="isDropdown(graphName)" />
        </div>
    </div>

    <!-- <div class="graph-section" id="client">
        <h3>Client Data</h3>
        <div class="card" v-for="data in graphDisplayData["client"]">
            <Graph :graphName="data" :render-dropdown="isDropdown(data)" />
        </div>
    </div>

    <div class="graph-section" id="timelog">
        <h3>Timelog Data</h3>
        <div class="card" v-for="data in graphDisplayData">
            <Graph :graphName="data" :render-dropdown="isDropdown(data)" />
        </div>
    </div> -->
</template>

<style scoped lang="scss">

.graph-section {
    display: flex;
    .card {
        margin-right: 10px;
        padding: 20px;
    }

    .title {
        font-size: 48px;
        color: var(--text-title-2);
    }
}

</style>