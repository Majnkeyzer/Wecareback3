// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import 'vue-resize/dist/vue-resize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



import Users from './components/Users'
import Beheer from './components/Beheer'
import Programma from './components/Programma'
import Home from './components/Home'
import Filmbeheer from './components/Filmbeheer'
import Voorstellingbeheer from './components/Voorstellingbeheer'
import Zaalbeheer from './components/Zaalbeheer'
import Kijkwijzerbeheer from './components/Kijkwijzerbeheer'
import axios from 'axios'

import VueCarousel from 'vue-carousel';
import VueResize from 'vue-resize'
import { Dropdown } from 'bootstrap-vue/es/components';
import bDropdown from  'bootstrap-vue/es/components/dropdown/dropdown';
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
import { Carousel } from 'bootstrap-vue/es/components';
import bTable from 'bootstrap-vue/es/components/table/table';
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';




Vue.component('b-carousel-slide',bCarouselSlide);
Vue.component('b-carousel', bCarousel);
Vue.component('b-dropdown', bDropdown);
Vue.component('b-table', bTable);
Vue.use(VueCarousel);
Vue.use(bCarouselSlide);
Vue.use(VueResize);
Vue.use(Carousel);
Vue.use(Dropdown);
Vue.use(BootstrapVue);
Vue.use(vueResource);
Vue.use(VueRouter);

Vue.config.productionTip = false;


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Home},
    {path: '/Users', component: Users},
    {path: '/Beheer', component: Beheer},
    {path: '/Programma', component: Programma},
    {path: '/Filmbeheer', component: Filmbeheer},
    {path: '/Voorstellingbeheer', component: Voorstellingbeheer},
    {path: '/Zaalbeheer', component: Zaalbeheer},
    {path: '/Kijkwijzerbeheer', component: Kijkwijzerbeheer}
  ]
});

axios.defaults.baseURL= 'http://localhost:8080'
axios.defaults.headers.common['Authorization'] = 'RetroCinema'
axios.defaults.headers.get['Accepts'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  <body style=" min-height: 100%; margin: 0; padding: 0; background-color: slategray;" >
    <div id="app" style="margin-left: 50px; margin-right: 50px; height: 100%; background-color: slategray">
      <br>
        <h1 align="center" style="text-shadow: 2px 2px black; color: darkslategray">Welkom bij Retro Cinema</h1><span></span>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8pa1FjycikINvILwSirlHdSnfPvs6NZaJ79lUNcJqbfcVodD5"  
        align="right" style="height: 150px; width: 150px; box-shadow: 10px 10px 5px black;" alt="Logo">
        <button style=""><router-link to="/">Home</router-link></button>
        <button><router-link to="/Users">Users</router-link></button>        
        <button><router-link to="/Programma">Programma</router-link></button> 
        <button><router-link to="/Beheer">Beheer</router-link></button>
      <router-view></router-view>
    </div>
    <br><br><br>
  </body>
  `,
}).$mount('#app')

