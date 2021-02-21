<template>
  <div class="date-widget" @click="toggleModal = !toggleModal">
    <div class="title">Datum en tijd</div>
    <div class="inner">
      <div class="inner-wrapper">
        <div class="left">
          <div class="time">
            {{ time }}<br />
          </div>
          <div class="date">
            {{ day }} {{ date }}
          </div>
        </div>
        <div class="right">
          <AnalogClock :time="currentDate" />
        </div>
      </div>
      <div class="footer">
        <div class="label">
          UT:<br />
          JD:<br />
          LST:
        </div>
        <div class="value">
          {{ ut }}<br />
          {{ currentJulian.toFixed(5)}}<br />
          {{ currentSidereal }}
        </div>
      </div>
    </div>
    <ModalWindow v-if="toggleModal">
        <p> Tijd en datum</p>
        <p>
          Een dag duurt 24h, per definitie. De zon staat dus na
          exact 24uur, op de hoogste punt opnieuw in het zuiden.
          Deze tijd wordt ook wel een zonnedag genoemd.
          Hierop is onze kalender gebaseerd. Zo is het nu [tijd].
          Dit is gelijk aan [UT], de tijd bij Sterrenwacht
          Greenwich in Londen zonder zomer- of wintertijd.
        </p>
        <p>
          Om dit om te rekenen naar onze plek op aarde, is de
          hele wereld verdeeld in [tijdszones]. De meridiaan bij
          de Greenwich sterrenwacht is het nulpunt. Zo leven wij
          in [UT+1h/2h] omdat wij wat oostelijker leven en nog
          een uur vanwege de [zomertijd/wintertijd].
        </p>
        <p>
          Om sterrenkundige waarnemingen over de hele wereld
          aan elkaar te kunnen vergelijken, wordt echter gebruik
          gemaakt van de Juliaanse Datum. Dit zijn dagen
          gerekend vanaf 24 november 4714 v.d.g.j., 12 uur UT.
          Een dag is niet meer verdeeld in uren, minuten en
          seconden, maar wordt gerekend als een decimale fractie.
        </p>
        <p>
          Echter, doordat de aarde om de zon draait, verschuift de
          sterrenhemel van dag tot dag een heel klein beetje.
          Hierdoor komt bijvoorbeeld Regulus elke dag 3m56s
          eerder op. Hierdoor staat een ster elke 23h56m04s op
          dezelfde plek. Deze tijd wordt ook wel een siderische
          dag genoemd.
        </p>
    </ModalWindow>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindow.vue';
import AnalogClock from '@/components/AnalogClock.vue';

export default {
  name: 'DateWidget',
  components: {
    ModalWindow,
    AnalogClock,
  },
  data() {
    return {
      currentDate: null,
      currentJulian: null,
      currentSidereal: null,
      toggleModal: false,
    };
  },
  computed: {
    ut() {
      let ut = `${this.currentDate.getUTCHours()}:`;
      if (this.currentDate.getUTCMinutes() >= 10) {
        ut += `${this.currentDate.getUTCMinutes()}:`;
      } else {
        ut += `0${this.currentDate.getUTCMinutes()}:`;
      }
      if (this.currentDate.getUTCSeconds() >= 10) {
        ut += this.currentDate.getUTCSeconds();
      } else {
        ut += `0${this.currentDate.getUTCSeconds()}`;
      }
      return ut;
    },
    time() {
      let time = `${this.currentDate.getHours()}:`;
      if (this.currentDate.getMinutes() >= 10) {
        time += `${this.currentDate.getMinutes()}:`;
      } else {
        time += `0${this.currentDate.getMinutes()}:`;
      }
      if (this.currentDate.getSeconds() >= 10) {
        time += this.currentDate.getSeconds();
      } else {
        time += `0${this.currentDate.getSeconds()}`;
      }
      return time;
    },
    day() {
      const days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
      return days[this.currentDate.getDay()];
    },
    date() {
      return `${this.currentDate.getDate()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getFullYear()}`;
    },
  },
  created() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
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
};
</script>

<style lang="postcss" scoped>
.date-widget {
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
