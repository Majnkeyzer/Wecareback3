<template>
  <div class="container">
    <br>
    <button><router-link to="/Filmbeheer">Filmbeheer</router-link></button>
    <button><router-link to="/Zaalbeheer">Zaalbeheer</router-link></button>
    <button><router-link to="/Kijkwijzerbeheer">Kijkwijzerbeheer</router-link></button>
    <br><br>
    <h1>Voorstellingbeheer</h1>
    <div id="voorstellingController" style="padding-top: 2em">

      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <!--<li v-show="!validation.film">Titel is verplicht.</li>-->
          <li v-show="!validation.dag">Datum is verplicht.</li>
          <li v-show="!validation.tijd">Tijd is verplicht.</li>
          <!--<li v-show="!validation.zalen">Zaal is verplicht.</li>-->
        </ul>
      </div>

      <form @submit.prevent="AddNewVoorstelling">
        <!--<div class="form-group">-->
        <!--<label for="id">ID:</label>-->
        <!--<input v-model="newVoorstelling.id" type="text" id="id" name="id" class="form-control">-->
        <!--</div>-->

        <div class="form-group">
          <label for="titel">Titel:</label>
          <select v-model="newVoorstelling.film"  id="titel" name="titel" class="form-control">
            <option v-for="film in filmsvoor" v-bind:value="film.id">{{film.titel}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="datum">Datum:</label>
          <input v-model="newVoorstelling.dag" type="date" id="datum" name="datum" class="form-control">
        </div>

        <div class="form-group">
          <label for="tijd">Tijd:</label>
          <input v-model="newVoorstelling.tijd" type="time" id="tijd" name="tijd" class="form-control">
        </div>

        <div class="form-group">
          <label for="zalen">Zaal:</label>
          <select v-model="newVoorstelling.zalen" id="zalen" name="zalen" class="form-control">
            <option v-for="zaal in zalenvoor" v-bind:value="zaal.id">{{zaal.zaalNummer}}</option>
          </select>
        </div>

        <div class="form-group">
          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit">Voeg voorstelling toe</button>

          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditVoorstelling(Voorstelling.id)">Verander Voorstelling</button>
        </div>

      </form>

      <div class="alert alert-success" transition="success" v-if="success">Toevoegen nieuwe voorstelling succesvol.</div>

      <hr>

      <table class="table">
        <thead>
        <th>ID</th>
        <th>TITEL</th>
        <th>DATUM</th>
        <th>TIJD</th>
        <th>ZAAL</th>
        </thead>

        <tbody>
        <tr v-for="voorstelling in voorstellingen">
          <td>{{ voorstelling.id }}</td>
          <td>{{ voorstelling.film.titel }}</td>
          <td>{{ voorstelling.dag }}</td>
          <td>{{ voorstelling.tijd }}</td>
          <td>{{ voorstelling.zalen.zaalNummer }}</td>
          <td>
            <button class="btn btn-default btn-sm" @click="ShowVoorstelling(voorstelling.id)">Aanpassen</button>
            <button class="btn btn-danger btn-sm" @click="RemoveVoorstelling(voorstelling.id)">Verwijderen</button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    mounted() {
      this.fetchVoorstelling()
      this.fetchFilm()
      this.fetchZalen()
    },
    name: "Voorstellingbeheer",

    data() {
      return {
        newVoorstelling: {
          id: '',
          film: '',
          dag: '',
          tijd: '',
          zalen: '',
        },
        voorstellingen: [],
        zalenvoor: [],
        filmsvoor: [],

        success: false,

        edit: false
      }
    },
    methods: {
      fetchZalen() {
        axios.get('http://localhost:8080/Zaal/getAll')
          .then(response => {
            this.zalenvoor = response.data;
          });
      }
      ,

      fetchFilm() {
        axios.get('http://localhost:8080/film/getAll')
          .then(response => {
            this.filmsvoor = response.data;
          });
      }
      ,

      fetchVoorstelling() {
        axios.get('http://localhost:8080/voorstelling/getAll')
          .then(response => {
            this.voorstellingen = response.data;
          });
      }
      ,

      RemoveVoorstelling(id) {
        var ConfirmBox = confirm("Weet u zeker dat u deze Voorstelling wilt verwijderen?")

        if (ConfirmBox) axios.delete('http://localhost:8080/voorstelling/delete/'+ id)

        this.fetchVoorstelling()
      }
      ,

      EditVoorstelling(id) {
        var voorstelling = this.newVoorstelling

        this.newVoorstelling = {id: '', film: '', dag: '', tijd: '', zalen: ''}

        axios.put('http://localhost:8080/voorstelling/update/' + id, voorstelling, function (data) {
          console.log(data)
        })

        this.fetchVoorstelling()

        this.edit = false

      }
      ,

      ShowVoorstelling(id) {
        this.edit = true

        axios.get('http://localhost:8080/voorstelling/getById/' + id)
          .then(response => {
            this.newVoorstelling.id = response.data.id
            this.newVoorstelling.films = response.data.film
            this.newVoorstelling.dag = response.data.dag
            this.newVoorstelling.tijd = response. data.tijd
            this.newVoorstelling.zalen = response.data.zalen
          });
      }
      ,

      AddNewVoorstelling() {

        axios.post('http://localhost:8080/voorstelling/save', this.newVoorstelling)
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

        this.newVoorstelling = {film: '', dag: '', tijd: '', zaal: ''}
        this.fetchVoorstelling()

      }

    }
    ,

    computed: {
      validation(){
        return {
          // film: !!this.newVoorstelling.film.trim(),
          dag: !!this.newVoorstelling.dag.trim(),
          tijd: !!this.newVoorstelling.tijd.trim(),
          // zalen: !!this.newVoorstelling.zalen.trim()
        }
      }
      ,

      isValid() {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      }
    }
  }

</script>

<style scoped>

</style>
