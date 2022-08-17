<template>
  <div class="outer">
    <div class="wrapper">
      <div class="inner">
        <slot />
        <button
          type="button"
          class="close"
          @click="close"
        >
          sluiten
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('closed', 'closed');
    },
  },
};
</script>

<style lang="postcss" scoped>
.outer {
  @apply fixed;
  @apply overflow-x-hidden;
  @apply overflow-y-auto;
  @apply inset-0;
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply z-50;
}

.wrapper {
  @apply relative;
  @apply mx-auto;
  @apply w-auto;
  @apply max-w-2xl;
}

.inner {
  @apply bg-white;
  @apply w-full;
  @apply rounded;
  @apply shadow-2xl;
  @apply flex;
  @apply flex-col;
}

.close {
  @apply rounded;
  @apply bg-gray-500;
  @apply text-white;
  @apply px-3;
  @apply py-1;
}
</style>
