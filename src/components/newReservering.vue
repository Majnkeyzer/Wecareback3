<template>

  <div class="form-group">
    <label for="aantalKaartjes">Aantal Kaartjes:</label>
    <select v-model="selected">
      <option v-for="n in 20" :value="n">{{ newReservering.aantalKaartjes }}</option>
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
    <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit">Voeg Reservering toe</button>

    <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditFilm(newReservering.id)">Pas Reservering aan</button>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "newReservering",
    data() {
      return {
        newReservering: {
          voorstellingid: '',
          emailAdres: '',
          aantalKaartjes: ''

        },
        Reserveringen:[

        ],
        Film:'',
        Voorstelling:'',
        Zaal:'',
        gekozenStoelen: [],
      }
    },
    methods: {
      haalFilm() {
        axios.get('http://localhost:8080/film/getById'+ fid)
          .then(response => {
            this.Film = response.data;
            console.log(response)
          });
      },
      haalVoorstelling() {
        axios.get('http://localhost:8080/voorstelling/getById'+ vid)
          .then(response => {
            this.Voorstelling = response.data;
            console.log(response)
          });
      },
      haalZaal() {
        axios.get('http://localhost:8080/Zaal/getById'+zid)
          .then(response => {
            this.Zaal = response.data;
            console.log(response)
          });
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
      }
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
