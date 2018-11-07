<template>
  <body style="background-color: slategray;">

    <br>
    <br>
    <b-dropdown text="Kies een dag:" class="m-2">
      <b-dropdown-item-button>Maandag</b-dropdown-item-button>
      <b-dropdown-item-button>Dinsdag</b-dropdown-item-button>
      <b-dropdown-item-button>Woensdag</b-dropdown-item-button>
      <b-dropdown-item-button>Donderdag</b-dropdown-item-button>
      <b-dropdown-item-button>Vrijdag</b-dropdown-item-button>
      <b-dropdown-item-button>Zaterdag</b-dropdown-item-button>
      <b-dropdown-item-button>Zondag</b-dropdown-item-button>
    </b-dropdown>

    <div style="margin-left: 160px;">
    <b-table class="tabel" striped hover :items="films" :fields="fields"></b-table>
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
          fields: [
            {
              key: 'Film.title',
              label: 'Film'
            },
            {
              key: 'Tijd.begintijd',
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
            Tijd: '',
            Zaal: '',
            Dag: ''
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

<style scoped>
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
