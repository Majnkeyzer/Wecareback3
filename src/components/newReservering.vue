<template>

  <div class="container">
    <div class="column is-three-quarters" v-for="(reservering, index) in Voorstelling " :key="index">
      <div v-if="vid == reservering.id">
    <br>

    <b-button><router-link to="/Programma" style="color:white;">Terug</router-link></b-button>
    <br> <br>

    <img :src=reservering.film.poster>

    <br> <br>

    <label> U Reserveert: {{ reservering.film.titel }} om: {{ reservering.tijd }} op: {{ reservering.dag }} in zaal: {{ reservering.zalen.zaalNummer }}</label>
    <br> <br>

    <form @submit.prevent="AddNewReservering">

    <div class="form-group">
      <label >Aantal Kaartjes:</label>
      <select v-model="selected">
        <option v-for="n in 15" :value="n" v-bind="newReservering.aantalKaartjes">{{ n }}</option>
      </select>
    </div>

    <div class="form-group">
    <label for="emailAdres">Voer uw Emailadres in:</label>
    <input v-model="newReservering.emailAdres" type="text" id="emailAdres" name="emailAdres" class="form-control">
    </div>

  <!--<div class="form-group">-->
    <!--<label>Kies uw Stoelen</label>-->
    <!--<option v-for="n in zaal.aantalStoelen" :value="n"><input type="checkbox" v-model="gekozenStoelen"></option>-->

  <!--</div>-->

    <div class="form-group">
      <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit" @click="AddNewReservering(this.newReservering)">Voeg Reservering toe</button>

      <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditFilm(newReservering.id)">Pas Reservering aan</button>
    </div>

    </form>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    mounted() {
      this.haalVoorstelling()
    },
    name: "newReservering",
    data() {
      return {
        edit: false,
        selected: '',
        vid: this.$route.params.id,
        newReservering: {
          voorstellingid: '',
          emailAdres: '',
          aantalKaartjes: ''

        },
        Reserveringen:[

        ],
        Voorstelling:[],
        gekozenStoelen: [],
      }
    },
    methods: {
      haalVoorstelling() {
        axios.get('http://localhost:8080/voorstelling/getAll')
          .then(response => {
            this.Voorstelling = response.data;
            console.log(response)
          });
      },
    },

      AddNewReservering(){
        axios.post('http://localhost:8080/reservering/save', this.newReservering)
          .then(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
        self = this
        this.success = true
        setTimeout(function () {
          self.success = false
        }, 5000)
        this.newReservering = {reserveringid: '', voorstelling:'', emailAdres:'', aantalKaartjes:''}
        this.fetchFilm()
      },
    validation() {
      return {
        titel: !!this.newFilm.titel.trim(),
        datumBeschikbaar: !!this.newFilm.datumBeschikbaar.trim(),
        afloopDatum: !!this.newFilm.afloopDatum.trim(),
      }
    },
        isValid() {
          var validation = this.validation
          return Object.keys(validation).every(function (key) {
            return validation[key]
          })
        }
  }
</script>

<style scoped>
  .img1{
    position: relative;
    top: 100px;
    right: 100px;
    height: 450px;
    width: 350px;
    box-shadow: 10px 10px 5px black;
  }

  .title{
    position: relative;
    bottom: 360px;
    margin-left: 350px;
    font-size: 45px;
    font-weight: 600;
    text-shadow:2px 2px 5px darkgrey;
  }

  .subtitle{
    position: relative;
    bottom: 340px;
    margin-left: 350px;
  }

  .description{
    position: relative;
    bottom: 260px;
    margin-left: 350px;
  }

  .icon1{
    height: 40px;
    width: 40px;
  }
  .icon2{
    height: 40px;
    width: 40px;
  }
  .icon3{
    height: 40px;
    width: 40px;
  }
</style>
