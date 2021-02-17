<template>
  <div class="temperature-widget" @click="toggleModal = !toggleModal">
    <div class="title">Temperatuur</div>
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

export default {
  name: 'TemperatureWidget3',
  components: {
    ModalWindow,
  },
  data() {
    return {
      werkelijk: 0,
      gevoel: 0,
      dauwpunt: 0,
      min: 0,
      max: 0,
      toggleModal: false,
    };
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
    this.min = 100;
    this.max = -100;
    this.tempdata.forEach((td) => {
      this.chartOptions.xaxis.categories.push(td.datetime);
      this.chartSeries[0].data.push(td.tempvalue);
      this.chartSeries[1].data.push(td.tempgevoel);
      this.chartSeries[2].data.push(td.dauwpunt);
      if (td.tempvalue < this.min) {
        this.min = td.tempvalue;
      }
      if (td.tempvalue > this.max) {
        this.max = td.tempvalue;
      }
    });
    this.werkelijk = this.tempdata[18].tempvalue;
    this.gevoel = this.tempdata[18].tempgevoel;
    this.dauwpunt = this.tempdata[18].dauwpunt;

    this.loaded = true;
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
