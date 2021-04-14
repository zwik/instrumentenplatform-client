<template>
  <div class="moon-widget">
    <div class="title">
      Maan
    </div>
    <div class="inner">
      <div class="inner-wrapper">
        <div class="left">
          <div class="time">
            Procentuele bedekking
            <br>
          </div>
          <div class="date">
            naam van bedekking
          </div>
        </div>
        <div class="right">
          moon phase
        </div>
      </div>
      <div class="footer">
        <div class="label">
          richting:
          <br>hoogte:
          <br>
        </div>
        <div class="value">
          <!-- {{ ut }}<br />
          {{ currentJulian.toFixed(5)}}<br />
          {{ currentSidereal }}-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoonWidget',
  data() {
    return {
      currentDate: null,
      currentJulian: null,
      jd: null,
      phases: [
        'nieuwe maan',
        'jonge maansikkel',
        'eerste kwartier',
        'wassende maan',
        'volle maan',
        'afnemende maan',
        'laatste kwartier',
        'asgrauwe maan',
      ],
    };
  },
  created() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
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
      this.jd = 365.25 * 2020 + 30.6 * 6 + 26 - 694039.09;
      console.log('moon', this.moon(2020, 5, 26));
    },
    moon(year, month, day) {
      let localYear = year;
      let localMonth = month;

      let c = 0;
      let e = 0;
      let jd = 0;
      let b = 0;

      if (localMonth < 3) {
        localYear -= 1;
        localMonth += 12;
      }

      localMonth += 1;
      c = 365.25 * localYear;
      e = 30.6 * localMonth;
      jd = c + e + day - 694039.09; // jd is total days elapsed
      jd /= 29.5305882; // divide by the moon cycle
      b = parseInt(jd, 10); // int(jd) -> b, take integer part of jd
      jd -= b; // subtract integer part to leave fractional part of original jd
      b = Math.round(jd * 8); // scale fraction from 0-8 and round

      if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0
      return { phase: b, name: this.phases[b] };
    },
  },
};
</script>

<style lang="postcss" scoped>
.moon-widget {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply bg-gray-800;
  @apply bg-opacity-60;
  min-width: 350px;
  max-width: 350px;
}

.title {
  @apply transform;
  @apply -rotate-90;
  @apply text-gray-400;
  @apply mx-2;
}

.inner {
  @apply flex;
  @apply flex-col;
  @apply text-gray-400;
  @apply m-2;
  width: 100%;
  height: 175px;
}

.inner-wrapper {
  @apply flex;
  @apply flex-grow;
}

.left {
  width: 100%;
}

.right {
  /* @apply bg-blue-400; */
}

.footer {
  @apply flex;
  @apply flex-row;
  @apply text-left;
  width: 100%;
}

.label {
  @apply flex-grow;
}

.value {
  @apply flex-grow;
}

.time {
  @apply text-left;
  @apply text-4xl;
}

.date {
  @apply text-left;
  @apply text-xl;
}
</style>
