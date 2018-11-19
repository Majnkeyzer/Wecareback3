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
import axios from 'axios'

import VueCarousel from 'vue-carousel';
import VueResize from 'vue-resize'
import { Dropdown } from 'bootstrap-vue/es/components';
import bDropdown from  'bootstrap-vue/es/components/dropdown/dropdown';
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
import { Carousel } from 'bootstrap-vue/es/components';
import bTable from 'bootstrap-vue/es/components/table/table';
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';
import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group';




Vue.component('b-button-group', bButtonGroup);
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
    {path: '/Voorstellingbeheer', component: Voorstellingbeheer}
  ]
});

axios.defaults.baseURL= 'http://localhost:8080'
axios.defaults.headers.common['Authorization'] = 'RetroCinema'
axios.defaults.headers.get['Accepts'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  <html>
  <body>
      <div id="app" style="margin-left: 50px; margin-right: 50px; background-color: slategray">
      <br>
      <header>
        <h1 align="center">Welkom bij Retro Cinema</h1> <img src="../src/assets/retrocinema.jpg" align="right" style="height: 150px; width: 150px;" alt="Logo" />
      </header>  
      <div>
      <b-button-group >
        <b-button  ><router-link  to="/"  >Home</router-link></b-button>
        <b-button ><router-link to="/Users" >Users</router-link></b-button>        
        <b-button ><router-link to="/Programma">Programma</router-link></b-button> 
        <b-button ><router-link to="/Beheer">Beheer</router-link></b-button>
       </b-button-group>
       
       </div>
      <router-view></router-view>
       <footer>
            &copy; RetroCinema 2018 
        </footer>
    


 
  `,
}).$mount('#app')
