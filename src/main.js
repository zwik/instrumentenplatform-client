import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
// import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;

Vue.use(VueApexCharts);
Vue.component('Apexchart', VueApexCharts);

new Vue({
  // apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
