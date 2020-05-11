<template>
  <div class="dashboard">
    <StatPanel>temperature</StatPanel>
    <StatPanel>rain</StatPanel>
    <StatPanel>visibility</StatPanel>
    <StatPanel>webcam</StatPanel>
  </div>
</template>

<script>
import StatPanel from '@/components/StatPanel.vue';

export default {
  components: {
    StatPanel,
  },
};
</script>

<style lang="postcss" scoped>
.dashboard {
  @apply flex;
  @apply flex-row;
  @apply flex-wrap;
  @apply grid-cols-3;
  @apply gap-2;
  @apply bg-gray-900;
}
</style>
