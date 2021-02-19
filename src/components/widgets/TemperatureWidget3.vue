<template>
  <div class="temperature-widget">
    <div class="title" @click="toggleChart = !toggleChart">Temperatuur</div>
    <div class="inner">
      <div class="inner-wrapper">
        <div class="now label">
          Nu
        </div>
        <div class="now value">
          {{ werkelijk.toFixed(2) }}
        </div>
      </div>
      <div class="footer">
        <div class="label">
          gevoel: <br />
          dauwpunt: <br />
          min: <br />
          max:
        </div>
        <div class="value">
          {{ gevoel.toFixed(2) }} <br />
          {{ dauwpunt.toFixed(2) }} <br />
          {{ min.toFixed(2) }} <br />
          {{ max.toFixed(2) }}
        </div>
      </div>
    </div>
    <!-- <CloseButton v-if="toggleChart" @click="toggleChart = !toggleChart" /> -->
    <TemperatureChart v-if="toggleChart" @closed="onCloseChart"/>
    <ModalWindow v-if="toggleModal">
      <p>Uitleg</p>
    </ModalWindow>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindow.vue';
import TemperatureChart from '@/components/charts/TemperatureChart.vue';
// import CloseButton from '@/components/charts/CloseButton.vue';

export default {
  name: 'TemperatureWidget3',
  components: {
    ModalWindow,
    TemperatureChart,
    // CloseButton,
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
    const resp = await fetch(
      // 'https://api.jsonbin.io/b/60292cf53b303d3d96508264', {
      // 'https://api.jsonbin.io/b/602955f287173a3d2f5d1739/1', {
      'https://api.jsonbin.io/b/602f96f7a3e9f25d023c1849', {
        headers: {
          'secret-key': '$2b$10$va8vvcs6BN3oUSCHprem3unLlXThIIdQVk1xp2xKcbkmHrytdsFwW',
        },
      },
    );
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

.title {
  writing-mode: sideways-lr;
  text-orientation: sideways;
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
}

.now {
  @apply text-4xl;
}

</style>
