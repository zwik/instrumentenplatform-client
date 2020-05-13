<template>
  <div class="dashboard">
    <DateWidget />
    <StatPanel>temperature</StatPanel>
    <StatPanel>rain</StatPanel>
    <StatPanel>visibility</StatPanel>
    <StatPanel>webcam</StatPanel>
  </div>
</template>

<script>
import StatPanel from '@/components/StatPanel.vue';
import DateWidget from '@/components/widgets/DateWidget.vue';

export default {
  name: 'StatDashboard',
  components: {
    StatPanel,
    DateWidget,
  },
};
</script>

<style lang="postcss" scoped>
.dashboard {
  @apply flex;
  @apply flex-row;
  @apply flex-wrap;
  @apply grid;
  @apply grid-cols-3;
  @apply gap-4;
  @apply mt-4;
}
</style>
