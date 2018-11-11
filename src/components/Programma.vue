<template>
  <body style="background-color: slategray;">

    <br>
    <br>
    <b-dropdown text="Kies een dag:" class="m-2">
      <b-dropdown-item-button value="1">Maandag</b-dropdown-item-button>
      <b-dropdown-item-button value="2">Dinsdag</b-dropdown-item-button>
      <b-dropdown-item-button value="3">Woensdag</b-dropdown-item-button>
      <b-dropdown-item-button value="4">Donderdag</b-dropdown-item-button>
      <b-dropdown-item-button value="5">Vrijdag</b-dropdown-item-button>
      <b-dropdown-item-button value="6">Zaterdag</b-dropdown-item-button>
      <b-dropdown-item-button value="7">Zondag</b-dropdown-item-button>
    </b-dropdown>

    <div>
      <b-form inline>
        <b-form-select id="kiesdag" required v-model="selected" :options="options" class="m-2"> </b-form-select>
      </b-form>
    </div>
    <div>Selected: <strong>{{ selected }}</strong></div>

    <div style="margin-left: 160px;">
    <b-table  class="tabel" striped hover :items="films" :fields="fields"></b-table> //v-for="calculateWeek() == calculateWeek(new Date()) "
    </div>

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
            { value: 1, text: 'Maandag' },
            { value: 2, text: 'Dinsdag' },
            { value: 3, text: 'Woensdag' },
            { value: 4, text: 'Donderdag' },
            { value: 5, text: 'Vrijdag' },
            { value: 6, text: 'Zaterdag' },
            { value: 7, text: 'Zondag' }
          ],
          fields: [
            {
              key: 'Film.title',
              label: 'Film'
            },
            {
              key: 'Datum',
              label: 'Datum'
            },
            {
              key: 'Tijd',
              label: 'Tijd'
            },
            {
              key: 'Zaal.zaalNummer',
              label: 'Zaal'
            }
          ],
          film: {
            Film: '',
            Samenvatting: '',
            Datum: '',
            Tijd: '',
            Zaal: ''
          },
          films: []
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
          console.log("ik kom hier binnen");

            const yearStart = new Date(Date.UTC(datum.getUTCFullYear(),0,1));
            const week = Math.ceil(( ( (datum - yearStart) / 86400000) + 1)/7);
            return week;
        },
        fetchData() {
          axios.get('http://localhost:8080/voorstelling/filmstijdenzalen')
            .then(response => {
              this.films = response.data;

            });
        }
      },
      created() {
      axios.get(`http://localhost:8080/voorstelling/filmstijdenzalen`)
      .then(response => {
        this.films = response.data    })
        .catch(e => {
          this.errors.push(e)    })
      }
    }

</script>

<style >
  .tabel {
    width: 800px;
    height: 150px;
    font-size: 15px;
    color: black;
    background-color: lightgray;
    line-height: 1.4em;
    border: 5px dimgray;
    margin: 0 auto;
  }

</style>
