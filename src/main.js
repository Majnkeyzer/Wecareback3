// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import 'vue-resize/dist/vue-resize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DateFilter from './filters/date'
// import VueWebsocket from "vue-websocket"
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";



import Premie from './components/Premie'
import Service from './components/Service'
import Vergoedingen from './components/Vergoedingen'
import Home from './components/Home'
import axios from 'axios'




import VueResize from 'vue-resize'
import { Dropdown } from 'bootstrap-vue/es/components';
import bDropdown from  'bootstrap-vue/es/components/dropdown/dropdown';
import { Carousel } from 'bootstrap-vue/es/components';
import bTable from 'bootstrap-vue/es/components/table/table';
import { Form } from 'bootstrap-vue/es/components';


Vue.component('b-dropdown', bDropdown);
Vue.component('b-table', bTable);
Vue.use(VueResize);
Vue.use(Carousel);
Vue.use(Dropdown);
Vue.use(BootstrapVue);
Vue.use(vueResource);
Vue.use(VueRouter);
Vue.use(Form);
Vue.filter('date', DateFilter );
// Vue.use(VueWebsocket);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Home},
    {path: '/Premie', component: Premie},
    {path: '/Service',component: Service},
    {path: '/Vergoedingen', component: Vergoedingen},
  ]
});

/* eslint-disable no-new */


new Vue({

  router,
  axios,
  mounted: function () {
    this.$nextTick(function () {
      let socket = new SockJS('/Vergoedingen');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic', function (val) {
          console.log(val);
          console.log(JSON.parse(val.body));
          vm.list1 = JSON.parse(val.body);
        });
      });

    });
  },
  data: function () {
    return {
      message: 'Dynamic Content',
      list1: [],
      list2: []
    }
  },
  template: `
  <body style=" min-height: 100%; margin: 0; padding: 0; background-color: whitesmoke;" >
    <div id="app" style="margin-left: 50px; margin-right: 50px; height: 100%; background-color: whitesmoke">
      <br>
        <h1 align="center" style="text-shadow: 2px 2px rosybrown; color: orange">WeC@re uw zorgverzekeraar</h1><span></span>
       
       <div> 
        <b-button-group>
        <b-button variant="success"><router-link to="/" style="color:white;">Home</router-link></b-button>
        <b-button variant="success"><router-link to="/Premie" style="color:white;">Premie</router-link></b-button>        
        <b-button variant="success"><router-link to="/Vergoedingen" style="color:white;">Vergoedingen</router-link></b-button> 
        <b-button variant="success"><router-link to="/Service" style="color:white;">Service&Contact</router-link></b-button>
        </b-button-group>
        </div>
      <router-view></router-view>
    </div>
    <br><br><br><br>
    <footer style="border-top: 1px solid ;margin: 40px auto 0px; width: 100%; padding: 30px 0px; text-align: center;">
            &copy; WeC@re 2019 
        </footer>
  </body>
  

  `,
}).$mount('#app')

