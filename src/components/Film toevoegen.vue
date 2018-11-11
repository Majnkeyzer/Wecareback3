<template>
<div class="container">
  <br>
  <br>
  <br>
  <div class="b-table-stacked-sm">
    <div class="pull-left">
      <h1>Film Toevoegen</h1>
      <div class="form-group">
        <label>Titel:</label>
        <input class="form-control" type="text" v-model="film.Film">
      </div>
    </div>

    <div class="form-group">
      <label>Samenvatting:</label>
      <textarea class="form-control" rows="5" id="comment" v-model="film.Samenvatting"></textarea>
    </div>

    <div class="form-group">
      <label>Poster</label>
      <input class="form-control" type="text" v-model="film.Poster">
    </div>

    <div class="form-group">
      <label>Type film: </label>
      <br>
      <b-form-checkbox id="checkbox1"
                       v-model="film.Imax"
                       value="true"
                       unchecked-value="false">
        Imax
      </b-form-checkbox>


      <b-form-checkbox id="checkbox2"
                       v-model="film.DDD"
                       value="true"
                       unchecked-value="false">
        DDD
      </b-form-checkbox>


      <b-form-checkbox id="checkbox3"
                       v-model="film.ExtraLang"
                       value="true"
                       unchecked-value="false">
        Extra lang
      </b-form-checkbox>
    </div>

    <label>Kijkwijzer</label>
    <div class="form-group">
      <select v-model="film.Kijkwijzer" multiple>
        <option>Alle leeftijden</option>
        <option>6 jaar en ouder</option>
        <option>9 jaar en ouder</option>
        <option>12 jaar en ouder</option>
        <option>16 jaar en ouder</option>
        <option>Geweld</option>
        <option>Seks</option>
        <option>Angst</option>
        <option>Discriminatie</option>
        <option>Drugs</option>
        <option>Grof taal gebruik</option>
      </select>
    </div>
<br>
    <label>Beschikbaarheids datum</label>
    <div class="form-group">
      <date-time-picker
        v-model="film.datumbeschikbaar"
        format="DDDD"
      ></date-time-picker>
    </div>

    <br>
<label>Afloopdatum</label>
    <div class="form-group">
      <date-time-picker
        v-model="film.afloopdatum"
        format="DDDD"
      ></date-time-picker>
    </div>

    <br>
    <button class="button.btn.btn-primary pull-right" @click="submit">Toevoegen</button>
    <br>
    <br>
    <br>
    <br>

  </div>
</div>

</template>

<script>
  import axios from 'axios';
    export default {
        name: "Film_toevoegen",
      data() {
        return {
          film: {
            Film: '',
            Samenvatting: '',
            Poster: '',
            Imax: '',
            DDD: '',
            ExtraLang: '',
            Kijkwijzer: [],
            datumbeschikbaar: '',
            afloopdatum:''
          },
          films: []

        };
      },

      methods: {
        submit() {
          axios.post('http://vuebios.firebaseio.com/', this.film)
            .then(response => {
              console.log(response);
            }, error => {
              console.log(error);
            });
        },
      }
    }
</script>

<style scoped>

</style>
