<script lang="ts">
import GraphView from './components/GraphView.vue';
import Overview from './components/Overview.vue';

export default {
  components: {
    GraphView,
    Overview
  }
}
</script>

<template>
  <main>
    <Overview />
    <GraphView />
  </main>
</template>
