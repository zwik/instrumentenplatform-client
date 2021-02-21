import Vue from 'vue';
import App from './App.vue';
import { createProvider } from './vue-apollo';
import VueApexCharts from 'vue-apexcharts';

Vue.config.productionTip = false;

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
