// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import 'vue-resize/dist/vue-resize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'



import Login from './components/Login'
import Logout from '@/components/Logout'
import Beheer from './components/Beheer'
import Programma from './components/Programma'
import Home from './components/Home'
import newReservering from './components/newReservering'
import Filmbeheer from './components/Filmbeheer'
import Voorstellingbeheer from './components/Voorstellingbeheer'
import Zaalbeheer from './components/Zaalbeheer'
import Kijkwijzerbeheer from './components/Kijkwijzerbeheer'
import Filminformatie from './components/Filminformatie'
import axios from 'axios'


import VueCarousel from 'vue-carousel';
import VueResize from 'vue-resize'
import { Dropdown } from 'bootstrap-vue/es/components';
import bDropdown from  'bootstrap-vue/es/components/dropdown/dropdown';
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
import { Carousel } from 'bootstrap-vue/es/components';
import bTable from 'bootstrap-vue/es/components/table/table';
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';
import { Form } from 'bootstrap-vue/es/components';




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
Vue.use(Form);

Vue.config.productionTip = false;


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Home},
    {path: '/Login', component: Login},
    {path: '/Logout', component: Logout},
    {
      path: '/admin/Beheer', component: Beheer// meta: {
      //   requiresAuth:true,
      //     adminAuth:true
      //   },
      //   beforeEnter: requireAuth}
    } ,
    {path: '/Programma', component: Programma},
    {path: '/admin/Filmbeheer', component: Filmbeheer},
    {path: '/admin/Voorstellingbeheer', component: Voorstellingbeheer},
    {path: '/admin/Zaalbeheer', component: Zaalbeheer},
    {path: '/admin/Kijkwijzerbeheer', component: Kijkwijzerbeheer},
    {path: '/Filminformatie/:id', name:'Filminformatie', component: Filminformatie },
    {path: '/newReservering/:id', name:'newReservering',  component: newReservering},
  ]
});

axios.defaults.baseURL= 'http://localhost:8080'
axios.defaults.headers.common['Authorization'] = 'RetroCinema'
axios.defaults.headers.get['Accepts'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  router,
  axios,
  store,
  template: `
  <body style=" min-height: 100%; margin: 0; padding: 0; background-color: slategray;" >
    <div id="app" style="margin-left: 50px; margin-right: 50px; height: 100%; background-color: slategray">
      <br>
        <h1 align="center" style="text-shadow: 2px 2px white; color: darkslategray">Welkom bij Retro Cinema</h1><span></span>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8pa1FjycikINvILwSirlHdSnfPvs6NZaJ79lUNcJqbfcVodD5"  
        align="right" style="height: 150px; width: 150px; box-shadow: 10px 10px 5px black;" alt="Logo">
       <div> 
        <b-button-group>
        <b-button><router-link to="/" style="color:white;">Home</router-link></b-button>
        <b-button><router-link to="/Login" style="color:white;">Login</router-link></b-button>        
        <b-button><router-link to="/Programma" style="color:white;">Programma</router-link></b-button> 
        <b-button><router-link to="/admin/Beheer" style="color:white;">Beheer</router-link></b-button>
        </b-button-group>
        </div>
      <router-view></router-view>
    </div>
    <br><br><br>
    <footer style="border-top: 1px solid ;margin: 40px auto 0px; width: 100%; padding: 30px 0px; text-align: center;">
            &copy; RetroCinema 2018 
        </footer>
  </body>

  `,
}).$mount('#app')

