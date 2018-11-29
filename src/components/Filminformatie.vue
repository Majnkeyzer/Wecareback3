<template>
  <div class="hero-body" :style="{ 'background-image': movies.poster }">
    <div class="container description-container">
      <div class="columns">
        <div class="column is-three-quarters">
          <h1 class="title">
            {{ movies.titel }}
          </h1>
          <h4 class="subtitle">
            <p class="subtitle-tag">{{ movies.kijkwijzer }} |</p>
          </h4>
          <p class="description">{{ movies.samenvatting }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      mounted() {
        this.fetchFilm()
      },
      name: "Filminformatie",
      data(){
        return {
          selectedMovie: '',
          movies: []
        }
      },
      methods:{

        fetchFilm() {
          axios.get('http://localhost:8080/film/getAll')
            .then(response => {
              this.movies = response.data;
            });
        }

      }
    }

</script>

<style scoped>

</style>



