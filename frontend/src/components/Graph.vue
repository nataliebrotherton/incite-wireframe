<script lang="ts">
export default {
    props: {
        graphName: String,
        renderDropdown: Boolean
    },
    data() {
        return {
            label: '',
            graphData: [],
            renderDropdown: false
        }
    },
    created: function() { this.getData(); },
    computed: {
        renderedGraph() {
            // return graph
            return 'graph data';
        }
    },
    methods: {
        async getData() {
            fetch(import.meta.env.VITE_API_URL + this.graphName)
            .then((response) => { return response.json() })
            .then((data) => { this.graphData = data })
            .catch((err) => console.error(err))
        }
    }
}
</script>

<template>
    <div :id="graphName" class="graph">
        <p class="label">{{ graphData['label'] }}</p>
        {{graphName}}
        {{renderedGraph}}
    </div>

</template>

<style>
    .graph .label {
        font-size: 32;
    }
</style>
