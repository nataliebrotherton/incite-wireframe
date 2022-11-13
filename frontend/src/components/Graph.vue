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
    here is the graph
    {{graphName}}
    {{renderedGraph}}
</template>
