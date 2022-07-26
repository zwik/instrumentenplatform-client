<template>
  <div class="temperature-widget">
    <div
      class="outer"
      @click="toggleModal = !toggleModal"
    >
      <div class="title">
        Temperatuur
      </div>
    </div>
    <div
      class="inner"
      @click="toggleChart = !toggleChart"
    >
      <div class="inner-wrapper">
        <div class="now label">
          Nu
        </div>
        <div class="now value">
          {{ werkelijk.toFixed(2) }} °C
        </div>
      </div>
      <div class="footer">
        <div class="label">
          gevoel: <br>
          dauwpunt: <br>
          min: <br>
          max:
        </div>
        <div class="value">
          {{ gevoel.toFixed(2) }} °C<br>
          {{ dauwpunt.toFixed(2) }} °C<br>
          {{ min.toFixed(2) }} °C<br>
          {{ max.toFixed(2) }} °C
        </div>
      </div>
    </div>
    <TemperatureChart
      v-if="toggleChart"
      @closed="onCloseChart"
    />
    <ModalWindow
      v-if="toggleModal"
      @closed="onCloseModal"
    >
      <h3>Werkelijke temperatuur</h3>
      <p>De werkelijke temperatuur is de temperatuur zoals gemeten inhet weerstation</p>
      <h3>Gevoelstemperatuur</h3>
      <p>De gevoelstemperatuur wordt berekend door ....</p>
      <h3>Dauwpunt</h3>
      <p>Het dauwpunt wordt berekend door ....</p>
    </ModalWindow>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindow.vue';
import TemperatureChart from '@/components/charts/TemperatureChart.vue';

export default {
  name: 'TemperatureWidget',
  components: {
    ModalWindow,
    TemperatureChart,
  },
  data() {
    return {
      werkelijk: 0,
      gevoel: 0,
      dauwpunt: 0,
      min: 0,
      max: 0,
      toggleModal: false,
      toggleChart: false,
    };
  },
  async created() {
    const resp = await fetch('https://api.jsonbin.io/b/602f96f7a3e9f25d023c1849', {
      headers: {
        'secret-key': '$2b$10$va8vvcs6BN3oUSCHprem3unLlXThIIdQVk1xp2xKcbkmHrytdsFwW',
      },
    });
    const data = await resp.json();
    this.tempdata = data.temperatuur;

    this.werkelijk = this.tempdata[0].tempvalue;
    this.gevoel = this.tempdata[0].tempgevoel;
    this.dauwpunt = this.tempdata[0].dauwpunt;
    this.min = this.tempdata[0].min;
    this.max = this.tempdata[0].max;

    this.loaded = true;
  },
  methods: {
    onCloseChart() {
      this.toggleChart = false;
    },
    onCloseModal() {
      this.toggleModal = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.temperature-widget {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply bg-gray-800;
  @apply bg-opacity-60;
  min-width: 350px;
  max-width: 350px;
}

.outer {
  @apply text-gray-400;
  @apply mx-2;

}

.title {
  @apply justify-center;
  @apply flex;
  @apply transform;
  @apply -rotate-90;
  width: 30px;
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
  @apply flex-row;
  @apply m-2;
  width: 100%;
}

.footer {
  @apply flex;
  @apply flex-row;
  @apply m-2;
  width: 100%;
}

.label {
  @apply flex-grow;
  @apply text-left;
}

.value {
  @apply flex-grow;
  @apply text-right;
  @apply mr-5;
}

.now {
  @apply text-4xl;
}

</style>
