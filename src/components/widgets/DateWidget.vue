<template>
  <div class="date-widget">
    Current date: {{ currentDate }}
    Julian date: {{ currentJulian.toFixed(4) }}
  </div>
</template>

<script>
export default {
  name: 'DateWidget',
  data() {
    return {
      currentDate: null,
      currentJulian: null,
    };
  },
  methods: {
    updateTime() {
      this.currentDate = new Date();
      this.julianDate();
    },
    julianDate() {
      const DAYS_IN_MS = 1000 * 60 * 60 * 24;
      const JULIAN_1970 = 2440588;
      const currentDate = new Date(new Date().toUTCString());
      this.currentJulian = currentDate.valueOf() / DAYS_IN_MS - 0.5 + JULIAN_1970;
    },
  },
  created() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  },
};
</script>

<style lang="postcss" scoped>
.date-widget {
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
