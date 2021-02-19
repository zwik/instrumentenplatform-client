<template>
  <div class="outer">
    <div class="wrapper">
      <div class="inner">
        <apexchart width="1000" height="500" type="line"
          :options="chartOptions" :series="chartSeries">
        </apexchart>
        <button class="close">sluiten</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

export default {
  data() {
    return {
      chartOptions: null,
      chartSeries: null,
    };
  },
  async created() {
    const resp = await fetch(
      'https://api.jsonbin.io/b/60292cf53b303d3d96508264/1', {
      // 'https://api.jsonbin.io/b/602955f287173a3d2f5d1739/2', {
        headers: {
          'secret-key': '$2b$10$va8vvcs6BN3oUSCHprem3unLlXThIIdQVk1xp2xKcbkmHrytdsFwW',
        },
      },
    );
    const data = await resp.json();
    this.tempdata = data.temperatuur;

    this.chartOptions = {
      xaxis: {
        // categories: [],
        type: 'datetime',
        // labels: {
        //   show: true,
        //   // format: 'HH:mm',
        // },
        // tickAmount: 1,
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
        show: true,
      },
      chart: {
        toolbar: {
          show: true,
        },
      },
    };
    this.chartSeries = [
      {
        name: 'werkelijk',
        data: [],
      },
      // {
      //   name: 'gevoel',
      //   data: [],
      // },
      // {
      //   name: 'dauwpunt',
      //   data: [],
      // },
    ];
    this.tempdata.forEach((td) => {
      // this.chartOptions.xaxis.categories.push(td.datetime);
      this.chartSeries[0].data.push([td.datetime, td.tempvalue]);
      // this.chartSeries[1].data.push([td.datetime, td.tempgevoel]);
      // this.chartSeries[2].data.push([td.datetime, td.dauwpunt]);
    });
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
  /* @apply max-w-2xl; */
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
