<template>
  <div class="temperature-widget">
    <div class="inner">
      <div class="title">Temperatuur</div>
      <div class="content">
        <div class="chart">
          <apexchart width="335" height="120" type="line"
            :options="chartOptions" :series="chartSeries">
          </apexchart>
        </div>
        <div class="values">
          <div class="box red">werkelijk <br/> {{ werkelijk.toFixed(2) }}</div>
          <div class="box blue">gevoel <br/> {{ gevoel.toFixed(2) }}</div>
          <div class="box green">dauwpunt <br/> {{ dauwpunt.toFixed(2) }}</div>
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
  name: 'TemperatureWidget2',
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
      stroke: {
        width: 3,
      },
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
  @apply items-start;
  @apply justify-center;
  @apply bg-gray-800;
  @apply bg-opacity-60;
  min-width: 350px;
  max-width: 350px;
}

.inner {
  @apply flex;
  @apply flex-col;
  @apply text-gray-400;
  @apply m-2;
  height: 175px;
}

.title {
  @apply text-gray-400;
}

.content {
  @apply flex-initial;
  width: 350px;
}

.chart {
  width: 350px;
  @apply flex-initial;
}

.values {
  width: 350px;
  @apply flex-initial;
}

.box {
  display: inline-block;
  width: 90px;
  height: 37px;
  margin: 0px 5px;
  border-radius: 10px;
}

.box.red {
  border: solid 3px rgb(255,0,0);
  background-color: rgba(255,0,0,0.3);
}

.box.green {
  border: solid 3px rgb(0,255,0);
  background-color: rgba(0,255,0,0.3);
}

.box.blue {
  border: solid 3px rgb(0,0,255);
  background-color: rgba(0,0,255,0.3);
}

</style>
