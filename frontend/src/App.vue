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
    <p class="main title">Analysis of 2016-17 TSheets Data</p>
    <Overview />
    <GraphView />
  </main>
</template>
