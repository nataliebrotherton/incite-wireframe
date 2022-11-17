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
    <div id="logo"><img src="/src/assets/logo_full.png"  /></div>
    <p class="main title">Analysis of 2016-17 TSheets Data</p>
    <Overview />
    <GraphView />
    <div id="logo-bottom"><img src="/src/assets/logo.png" /></div>
  </main>
</template>
