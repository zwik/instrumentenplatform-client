<template>
  <div class="temperature-widget">
    <div class="title">Temperatuur</div>
    <div class="inner">
      <div class="header">
        <apexchart width="220" height="100" type="line"
          :options="chartOptions" :series="chartSeries">
        </apexchart>
      </div>
      <div class="footer">
        <div class="label">
          <span class="box red"></span>Werkelijk:<br />
          <span class="box blue"></span>Gevoel:<br />
          <span class="box green"></span>Dauwpunt:
        </div>
        <div class="value">
          {{ werkelijk.toFixed(2) }}<br />
          {{ gevoel.toFixed(2) }}<br />
          {{ dauwpunt.toFixed(2) }}
        </div>
      </div>
    </div>
    <ModalWindow v-if="toggleModal">
        <p> Temperatuur</p>
        <p> </p>
        <p> </p>
    </ModalWindow>
  </div>
</template>

<script>
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

export default {
  name: 'TemperatureWidget1',
  data() {
    return {
      werkelijk: 0,
      gevoel: 0,
      dauwpunt: 0,
      toggleModal: false,
      loaded: false,
      chartOptions: null,
      chartSeries: null,
    };
  },
  computed: {
  },
  async created() {
    const resp = await fetch(
      // 'https://api.jsonbin.io/b/60292cf53b303d3d96508264', {
      'https://api.jsonbin.io/b/602955f287173a3d2f5d1739/1', {
        headers: {
          'secret-key': '$2b$10$va8vvcs6BN3oUSCHprem3unLlXThIIdQVk1xp2xKcbkmHrytdsFwW',
        },
      },
    );
    const data = await resp.json();
    this.tempdata = data.temperatuur;

    this.chartOptions = {
      xaxis: {
        categories: [],
        labels: {
          show: false,
        },
        tickAmount: 4,
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#CBD5E0'],
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      colors: ['#FF0000', '#0000FF', '#00FF00'],
      legend: {
        show: false,
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
    };
    this.chartSeries = [
      {
        name: 'werkelijk',
        data: [],
      },
      {
        name: 'gevoel',
        data: [],
      },
      {
        name: 'dauwpunt',
        data: [],
      },
    ];
    this.tempdata.forEach((td) => {
      this.chartOptions.xaxis.categories.push(td.datetime);
      this.chartSeries[0].data.push(td.tempvalue);
      this.chartSeries[1].data.push(td.tempgevoel);
      this.chartSeries[2].data.push(td.dauwpunt);
    });
    this.werkelijk = this.tempdata[18].tempvalue;
    this.gevoel = this.tempdata[18].tempgevoel;
    this.dauwpunt = this.tempdata[18].dauwpunt;

    this.loaded = true;
  },
  methods: {
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

.header {
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
  width: 90%;
}

.label {
  @apply flex-grow;
}

.value {
  @apply flex-grow;
}

.box {
  padding: 0px 10px;
  margin-right: 10px;
}
.box.red {
  background-color: rgb(255,0,0);

}

.box.green {
  background-color: rgb(0,255,0);
}

.box.blue {
  background-color: rgb(0,0,255);

}

</style>
