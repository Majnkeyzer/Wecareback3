<template>

  <body>

  <br>
  <br>

  <div class="Reserveren">
    <h5 align="left">Tijden en Tickets &nbsp; {{selected}}</h5>
    <b-form>
      <div>
        <b-button-group>
          <b-button v-bind:value="moment.getDay()">Vandaag</b-button>
          <b-button v-bind:value="morgen">Morgen</b-button>
          <b-button>{{dag3}}</b-button>
          <b-button>{{dag4}}</b-button>
          <b-button>{{dag5}}</b-button>
          <b-button>{{dag6}}</b-button>
          <b-button>{{dag7}}</b-button>
        </b-button-group>
      </div>

    </b-form>
  </div>

  </body>
    
</template>

<script>
  import axios from 'axios';
  var moment = require('moment');
    export default {

      mounted() {
        this.getVoorstellingen()
        this.getFilms()
        this.vandaag = Date.getDay();
        this.morgen = Date(today.getDate() + 1);
        this.dag3 = Date(today.getDate()+ (2));
        this.dag4 = Date(today.getDate()+ (3));
        this.dag5 = Date(today.getTime()+ (4));
        this.dag6 = Date(today.getTime()+ (5));
        this.dag7 = Date(today.getTime()+ (6));
      },
        name: "Reserveren",

      data:{

        moment:moment,
        selected: '',
        vandaag: '',
        morgen: '',
        voorstellingen: [],
        films: [],

      },
      methods: {
        getVoorstellingen() {
          axios.get('http://localhost:8080/voorstelling/getAll')
            .then(function (response) {
              this.Voorstellingen = response.data;
            });
        },
        getFilms() {
          axios.get('http://localhost:8080/voorstelling/getAll')
            .then(function (response) {
              this.Voorstellingen = response.data;
            });
        },

      },
      computed: {

      }



    }
</script>

<style scoped>
  body {
    background-color: slategray;
  }

</style>
