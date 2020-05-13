<template>
  <div class="stat-panel">
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatPanel',
};
</script>

<style lang="postcss" scoped>
.stat-panel {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply bg-gray-800;
  @apply bg-opacity-60;
  min-width: 315px;
  max-width: 315px;
}

.inner {
  @apply text-gray-100;
  @apply m-2;
  width: 100%;
  height: 175px;
}
</style>
