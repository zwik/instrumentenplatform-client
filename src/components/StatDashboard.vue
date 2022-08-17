<template>
  <div class="dashboard">
    <DateWidget />
    <MoonWidget />
    <GraphqlWidget />
    <TemperatureWidget />
    <StatPanel>temperature</StatPanel>
    <StatPanel>rain</StatPanel>
    <StatPanel>visibility</StatPanel>
    <StatPanel>webcam</StatPanel>
  </div>
</template>

<script>
import StatPanel from './StatPanel.vue';
import DateWidget from './widgets/DateWidget.vue';
import MoonWidget from './widgets/MoonWidget.vue';
import GraphqlWidget from './widgets/GraphqlWidget.vue';
import TemperatureWidget from './widgets/TemperatureWidget.vue';

export default {
  name: 'StatDashboard',
  components: {
    StatPanel,
    DateWidget,
    MoonWidget,
    GraphqlWidget,
    TemperatureWidget,
  },
};
</script>

<style lang="postcss" scoped>
.dashboard {
  @apply flex;
  @apply grid;
  @apply grid-cols-3;
  @apply gap-4;
  @apply mt-4;
}
</style>
