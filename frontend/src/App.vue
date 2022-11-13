<script lang="ts">
import Card from './components/Card.vue';
import Overview from './components/Overview.vue';

export default {
  data() {
    return {
      graphNames: [
        'client_hours',
        'client_project_hours',
        'employee_billable_hours',
        'month_pto_hours',
        'month_billable_hours'
      ]
    }
  },
  methods: {
    isDropdown: (graph: string) => {
      return graph == 'client_project_hours';
    }
  },
  components: {
    Card,
    Overview
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

  </header>

  <main>
    <!-- <TheWelcome /> -->
    <div class="container" id="overview" v-for="graph in graphNames">
      <OverviewCard :graphName="graph" />
    </div>

    <Overview />

    <div class="container" id="graph" v-for="graph in graphNames">
      <Card :graphName="graph" :renderDropdown="isDropdown(graph)" />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
