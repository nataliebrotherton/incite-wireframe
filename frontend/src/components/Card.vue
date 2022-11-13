<script lang="ts">
import Graph from './Graph.vue'

export default {
    props: {
        graphName: String,
        overview: Boolean,
        renderDropdown: Boolean
    },
    components: {
        Graph
    }
}
</script>

<template>
    <div class="card">
        <Graph :graphName="graphName" overview render-dropdown />
    </div>
</template>

<style scoped lang="scss">
.card {
    border-radius: 25px;
}
</style>