<template>

  <body>

  <br>
  <br>

  <div class="Programma">
    <h5 align="left">Deze week in Retro Cinema</h5>
    <b-form inline align="left">
      <b-form-select v-model="selected" :options="options" class="dropdown" size="sm" />
    </b-form>
  </div>

  <!--<div>Selected: <strong>{{ options }} </strong></div>-->


  <!--<b-table  class="tabel" striped hover :items="moviesList" :fields="fields" ></b-table>-->

  <!--<div class="Programma2">-->
    <!--<ul>-->
      <!--<li v-for="(object, id) in gekozenfilms">{{film.titel}}-{{dag}}-{{tijd}}-{{zalen.zaalNummer}}<b-button><router-link to="/newReservering" style="color:white;">Reserveren</router-link></b-button></li>-->
    <!--</ul>-->
  <!--</div>-->
  <table class="table">
    <thead>
    <th>FILM</th>
    <th>DATUM</th>
    <th>TIJD</th>
    <th>ZAAL</th>
    <th></th>
    <th></th>
    </thead>

    <tbody>
    <tr v-for="voorstelling in moviesList">
      <!--<router-link v-bind:to="'/Filminformatie/'+ voorstelling.film.id"><td>{{ voorstelling.film.titel}}</td></router-link>-->
      <td>{{voorstelling.film.titel}}</td>
      <td>{{ voorstelling.dag }}</td>
      <td>{{ voorstelling.tijd }}</td>
      <td>{{ voorstelling.zalen.zaalNummer }}</td>
      <!--<td><button><router-link :to="'/Filminformatie/' + voorstelling.film.id">Meer informatie</router-link></button></td>-->
      <td><button class="btn btn-danger btn-sm" @click="Meerinfo(voorstelling.film.id)">Meer informatie</button></td>
      <td><b-button @click="Reserveer(voorstelling.id)">reserveren</b-button></td>
    </tr>
    </tbody>
  </table>

  <br>
  <h2 align="center">Binnenkort in Retro Cinema</h2>

  <!-- CAROUSEL CODE HIERONDER -->
  <div align="center">
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333; width: 280px; height: 160px; margin-bottom: 50px;"
                controls
                indicators
                background="#ababab"
                :interval="5000"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"

    >

      <!-- Text slides with image -->
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100"
             src="../assets/creed2.jpg" alt="image slot"
             style="width: 280px; height: 160px;"/>
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100"
             src="../assets/dunkirk.jpg" alt="image slot"
             style="width: 280px; height: 160px;">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100"
             src="../assets/fantasticbeasts.jpg" alt="image slot"
             style="width: 280px; height: 160px;">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100"
             src="../assets/firstman.jpg" alt="image slot"
             style="width: 280px; height: 160px;">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100"
             src="../assets/halloween.jpg" alt="image slot"
             style="width: 280px; height: 160px;">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100"
             src="../assets/hunterkiller.jpg" alt="image slot"
             style="width: 280px; height: 160px;">
      </b-carousel-slide>
    </b-carousel>
    <!--    <p class="mt-4">
          Slide #: {{ slide }}<br>
          Sliding: {{ sliding }}
        </p>
    -->
  </div>

  </body>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "films",
    data() {
      return {
        slide: 0,
        sliding: true,
        selected: '',
        options: [
          { value: 0, text: 'Zondag' },
          { value: 1, text: 'Maandag' },
          { value: 2, text: 'Dinsdag' },
          { value: 3, text: 'Woensdag', },
          { value: 4, text: 'Donderdag' },
          { value: 5, text: 'Vrijdag' },
          { value: 6, text: 'Zaterdag' },
        ],
        fields: [
          {
            key: 'film.titel',
            label: 'Film'
          },
          {
             key: 'dag',
             label: 'Datum'
           },
           {
            key: 'tijd',
            label: 'Tijd'
          },
          {
            key: 'zalen.zaalNummer',
            label: 'Zaal'
          }
        ],
        films: [],
        vid:'',
        zid:'',
        fid:''
      };
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      calculateWeek(datum) {
        const yearStart = new Date(Date.UTC(datum.getUTCFullYear(),3,1));
        return Math.ceil((((datum - yearStart) / 86400000) + 1)/7);
      },
      Meerinfo(filmid){
        let fid = filmid
        this.$router.push({name:'Filminformatie',params:{id: fid}})
      },
      Reserveer(voorstellingid){
        let vid = voorstellingid
        this.$router.push({name: newReservering, params:{id: vid}})
      }
    },
    computed: {
      moviesList() {
        return this.films.filter((movie) => {
            let movieDate = new Date(movie.dag);
            let movieWeek = this.calculateWeek(movieDate);
            let thisWeek = this.calculateWeek(new Date());
            return (movieWeek === thisWeek) && (this.selected === movieDate.getDay()); //return de films van deze week en koppeling met de dropdown aan de nummers
          }
        )
      }
    },

    created() {
      this.selected = new Date().getDay(); //default dag is vandaag, haal alle films en attributen op.
      axios.get(`http://localhost:8080/voorstelling/getAll`)
        .then(response => {
          this.films = response.data
        })
        .catch(e => {
          this.errors.push(e)
        });
    }
  }
</script>

<style lang="css" >
  body {
    background: #605B56;
  }
  .tabel {
    width: 500px;
    height: 50px;
    text-align: center;
    font-size: 16px;
    font-family: Arial, Helvetica,serif;
    color: black;
    background-color: lightgray;
    line-height: 1.4em;
    border: 5px dimgray;
    margin: 0 auto;
    background-image:  url(../assets/hexagon-background.png);
  }
  .dropdown {
    text-align: center;
    font-size: 13px;
    font-family: Arial, Helvetica;
    color: black;
    background-color: lightgray;
  }
</style>
