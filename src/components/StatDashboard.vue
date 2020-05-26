<template>
  <div class="dashboard">
    <DateWidget />
    <MoonWidget />
    <StatPanel>temperature</StatPanel>
    <StatPanel>rain</StatPanel>
    <StatPanel>visibility</StatPanel>
    <StatPanel>webcam</StatPanel>
  </div>
</template>

<script>
import StatPanel from '@/components/StatPanel.vue';
import DateWidget from '@/components/widgets/DateWidget.vue';
import MoonWidget from '@/components/widgets/MoonWidget.vue';

export default {
  name: 'StatDashboard',
  components: {
    StatPanel,
    DateWidget,
    MoonWidget,
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
