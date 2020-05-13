<template>
  <div class="date-widget">
    Current date: {{ currentDate }} <br />
    Julian date: {{ currentJulian.toFixed(5) }} <br />
    Sidereal: {{ currentSidereal }}
  </div>
</template>

<script>
export default {
  name: 'DateWidget',
  data() {
    return {
      currentDate: null,
      currentJulian: null,
      currentSidereal: null,
    };
  },
  methods: {
    updateTime() {
      this.currentDate = new Date();
      this.julianDate();
      this.siderealDate();
    },
    julianDate() {
      const DAYS_IN_MS = 1000 * 60 * 60 * 24;
      const JULIAN_1970 = 2440588;
      const currentDate = new Date(new Date().toUTCString());
      this.currentJulian = currentDate.valueOf() / DAYS_IN_MS - 0.5 + JULIAN_1970;
    },
    siderealDate() {
      const LONGITUDE_HALLEY = 5.487398;
      const DEGREES = 15;
      const HOURS = 24;
      const GMST = this.calculateSiderealTimeGM();
      const LMST = 24.0 * this.fractional((GMST + LONGITUDE_HALLEY / DEGREES) / HOURS);
      this.currentSidereal = this.hoursMinutesSeconds(LMST);
    },
    calculateSiderealTimeGM() {
      const MJD = this.currentJulian - 2400000.5;
      const MJD0 = Math.floor(MJD);
      const UT = (MJD - MJD0) * 24.0;
      const T_EPOCH = (MJD0 - 51544.5) / 36525.0;
      const MAGIC = 0.093104 - 0.0000062 * T_EPOCH;
      const TIME_IN_SECONDS = (8640184.812866 + MAGIC * T_EPOCH) * T_EPOCH;
      const TIME_IN_HOURS = TIME_IN_SECONDS / 3600.0;
      return 6.697374558 + 1.0027379093 * UT + TIME_IN_HOURS;
    },
    fractional(fraction) {
      let x = fraction - Math.floor(fraction);
      if (x < 0) {
        x += 1.0;
      }
      return x;
    },
    hoursMinutesSeconds(time) {
      const HOUR = Math.floor(time);
      const MINUTE = Math.floor(60.0 * this.fractional(time));
      const SECOND = Math.round(60.0 * (60.0 * this.fractional(time) - MINUTE));
      let sidereal = '';
      if (MINUTE >= 10) {
        sidereal = `${HOUR}:${MINUTE}`;
      } else {
        sidereal = `${HOUR}:0${MINUTE}`;
      }
      if (SECOND < 10) {
        sidereal = `${sidereal}:0${SECOND}`;
      } else {
        sidereal = `${sidereal}:${SECOND}`;
      }
      return sidereal;
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
  @apply bg-opacity-60;
  @apply rounded-lg;
  min-width: 315px;
  max-width: 315px;
  height: 175px;
}
</style>
