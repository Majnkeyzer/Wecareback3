<template>
  <div class="container">
    <br>
    <button><router-link to="/Voorstellingbeheer">Voorstellingbeheer</router-link></button>
    <button><router-link to="/Zaalbeheer">Zaalbeheer</router-link></button>
    <button><router-link to="/Kijkwijzerbeheer">Kijkwijzerbeheer</router-link></button>
    <br><br>
    <h1> {{ msg }}</h1>
    <!--<h1>Filmbeheer</h1>-->
    <div id="filmController" style="padding-top: 2em">

      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <li v-show="!validation.titel">Titel is verplicht.</li>
          <li v-show="!validation.datumBeschikbaar">Datumbeschikbaar is verplicht.</li>
          <li v-show="!validation.afloopDatum">Datumafloop is verplicht.</li>
        </ul>
      </div>

      <form @submit.prevent="AddNewFilm">

        <!--<div class="form-group">-->
        <!--<label for="id">ID:</label>-->
        <!--<input v-model="newFilm.filmid" type="text" id="id" name="id" class="form-control">-->
        <!--</div>-->

        <div class="form-group">
          <label for="titel">Titel:</label>
          <input v-model="newFilm.titel" type="text" id="titel" name="titel" class="form-control">
        </div>

        <div class="form-group">
          <label for="samenvatting">Samenvatting:</label>
          <textarea v-model="newFilm.samenvatting" rows="5" id="samenvatting" name="samenvatting" class="form-control">
          </textarea>
        </div>

        <div class="form-group">
          <label for="poster">Poster:</label>
          <input v-model="newFilm.poster" type="text" id="poster" name="poster" class="form-control">
        </div>

        <div class="form-group">
          <label>Type Film:</label>
          <br>
          <b-form-checkbox id="imax"
                           v-model="newFilm.imax"
                           name="imax"
                           value="true"
                           unchecked-value="false"
          >
            Imax
          </b-form-checkbox>
          <b-form-checkbox id="ddd"
                           v-model="newFilm.ddd"
                           name="ddd"
                           value="true"
                           unchecked-value="false"
          >
            3D
          </b-form-checkbox>
          <b-form-checkbox id="extralang"
                           v-model="newFilm.extralang"
                           name="extralang"
                           value="true"
                           unchecked-value="false"
          >
            ExtraLang
          </b-form-checkbox>

        </div>

        <div class="form-group">
          <label for="kijkwijzers">Kijkwijzer:</label>
          <select v-model="newFilm.kijkwijzers" id="kijkwijzers" name="kijkwijzers" class="form-control" multiple="true">
            <option v-for="kijkwijzer in kijkwijzersget" v-bind:value="kijkwijzer.id">{{kijkwijzer.tekst}}</option>
          </select>

        </div>
        <div class="form-group">
          <label for="datumbeschikbaar">Datumbeschikbaar:</label>
          <input v-model="newFilm.datumBeschikbaar" type="date" id="datumbeschikbaar" name="datumbeschikbaar" class="form-control">
        </div>

        <div class="form-group">
          <label for="afloopdatum">Afloopdatum:</label>
          <input v-model="newFilm.afloopDatum" type="date" id="afloopdatum" name="afloopdatum" class="form-control">
        </div>


        <div class="form-group">
          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit">Voeg film toe</button>

          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditFilm(newFilm.id)">Pas film aan</button>
        </div>

      </form>

      <div class="alert alert-success" transition="success" v-if="success">Toevoegen nieuwe film succesvol.</div>

      <hr>

      <table class="table">
        <thead>
        <th>ID</th>
        <th>TITEL</th>
        <th>IMAX</th>
        <th>DDD</th>
        <th>EXTRALANG</th>
        <th>DATUMBESCHIKBAAR</th>
        <th>AFLOOPDATUM</th>
        </thead>

        <tbody>
        <tr v-for="(film, index) in films" :key="index">
          <td>{{film.id}}</td>
          <td>{{ film.titel }}</td>
          <td>{{ film.imax }}</td>
          <td>{{ film.ddd }}</td>
          <td>{{ film.extralang }}</td>
          <td>{{ film.datumBeschikbaar }}</td>
          <td>{{ film.afloopDatum }}</td>
          <td>
            <button class="btn btn-default btn-sm" @click="ShowFilm(film.id)">Aanpassen</button>
            <button class="btn btn-danger btn-sm" @click="RemoveFilm(film.id)">Verwijderen</button>
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
      this.fetchFilm()
      this.fetchKijkwijzer()
    },
    name: "Filmbeheer",
    data() {
      return {
        msg:'Filmbeheer',
        kijkwijzersget: [],
        newFilm: {
          id: '',
          titel: '',
          samenvatting: '',
          poster: '',
          imax: '',
          ddd: '',
          extralang: '',
          kijkwijzers: [],
          datumBeschikbaar: '',
          afloopDatum: '',
        },
        films: [],
        success: false,
        edit: false,
      }
    },
    methods: {
      fetchFilm() {
        axios.get('http://localhost:8080/film/getAll')
          .then(response => {
            this.films = response.data;
            console.log(response)
          });
      }
      ,

      fetchKijkwijzer() {
        axios.get('http://localhost:8080/kijkwijzer/getAll')
          .then(response => {
            this.kijkwijzersget = response.data;
          });
      }
      ,

      RemoveFilm(id) {
        var ConfirmBox = confirm("Weet u zeker dat u deze Film wilt verwijderen?")
        if (ConfirmBox) axios.delete('http://localhost:8080/film/delete/'+ id)
        this.fetchFilm()
      }
      ,
      EditFilm(id) {
        var film = this.newFilm
        this.newFilm = {id: '', titel: '', samenvatting: '', poster: '', imax: '',ddd: '',extralang: '',kijkwijzer: [], datumBeschikbaar: '',afloopDatum: ''}
        axios.put('http://localhost:8080/film/update/' + id, film, function (data) {
          console.log(data)
        })
        this.fetchFilm()
        this.edit = false
      }
      ,
      ShowFilm(id) {
        this.edit = true
        axios.get('http://localhost:8080/film/getById/'+ id)
          .then(response => {
            this.newFilm.id = response.data.id
            this.newFilm.titel = response.data.titel
            this.newFilm.samenvatting = response.data.samenvatting
            this.newFilm.poster = response.data.poster
            this.newFilm.imax = response.data.imax
            this.newFilm.ddd = response.data.ddd
            this.newFilm.extralang = response.data.extralang
            this.newFilm.kijkwijzers = response.data.kijkwijzers
            this.newFilm.datumBeschikbaar = response.data.datumBeschikbaar
            this.newFilm.afloopDatum = response.data.afloopDatum
          });
      },
      AddNewFilm(){
        axios.post('http://localhost:8080/film/save', this.newFilm)
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
        this.newFilm = {id: '', titel: '', samenvatting: '', poster: '', imax: '',ddd: '',extralang: '',kijkwijzer: [], datumBeschikbaar: '',afloopDatum: ''}
        this.fetchFilm()
      }
    }
    ,
    computed: {
      validation() {
        return {
          titel: !!this.newFilm.titel.trim(),
          datumBeschikbaar: !!this.newFilm.datumBeschikbaar.trim(),
          afloopDatum: !!this.newFilm.afloopDatum.trim(),
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
