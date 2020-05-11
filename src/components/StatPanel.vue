<template>
  <div class="stat-panel">
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="postcss" scoped>
.stat-panel {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply bg-gray-700;
  @apply rounded-lg;
  min-width: 315px;
  max-width: 315px;
  height: 175px;
}
</style>
