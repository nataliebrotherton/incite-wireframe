<script lang="ts">
// Controls rendering graph sections and cards
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
        <div class="graph-cards-container">
            <div v-for="graphName in section.graphNames" class="card" :class="isDropdown(graphName)">
                <Graph :graphName="graphName" :render-dropdown="isDropdown(graphName)" />
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">

.graph-section {

    .graph-cards-container {
        display: flex;
        flex-direction: row;
    }
    .card {
        margin-right: 10px;
        padding: 20px;

        overflow-y: scroll;
        width: 600px;
        height: 400px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        font-size: 48px;
        color: var(--text-title-2);
    }
}

</style>