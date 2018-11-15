<template>
  <div class="container">
    <br>
    <button><router-link to="/Voorstellingbeheer">Voorstellingbeheer</router-link></button>
    <br><br>
    <h1>Filmbeheer</h1>
    <div id="filmController" style="padding-top: 2em">

      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <li v-show="!validation.Film">Titel is verplicht.</li>
          <li v-show="!validation.Datumbeschikbaar">Datumbeschikbaar is verplicht.</li>
          <li v-show="!validation.Afloopdatum">Datumafloop is verplicht.</li>
        </ul>
      </div>

      <form>

        <div class="form-group">
          <label for="id">ID:</label>
          <input v-model="newFilm.id" type="text" id="id" name="id" class="form-control">
        </div>

        <div class="form-group">
          <label for="film">Titel:</label>
          <input v-model="newFilm.Film" type="text" id="film" name="film" class="form-control">
        </div>

        <div class="form-group">
          <label for="samenvatting">Samenvatting:</label>
          <textarea v-model="newFilm.Samenvatting" rows="5" id="samenvatting" name="samenvatting" class="form-control">
          </textarea>
        </div>

        <div class="form-group">
          <label for="poster">Poster:</label>
          <input v-model="newFilm.Poster" type="text" id="poster" name="poster" class="form-control">
        </div>

        <div class="form-group">
          <label>Type Film:</label>
          <br>
          <b-form-checkbox id="imax"
                           v-model="newFilm.Imax"
                           name="imax"
                           value="true"
                           unchecked-value="false"
                           >
            Imax
          </b-form-checkbox>
          <b-form-checkbox id="ddd"
                           v-model="newFilm.DDD"
                           name="ddd"
                           value="true"
                           unchecked-value="false"
                           >
            DDD
          </b-form-checkbox>
          <b-form-checkbox id="extralang"
                           v-model="newFilm.ExtraLang"
                           name="extralang"
                           value="true"
                           unchecked-value="false"
          >
            ExtraLang
          </b-form-checkbox>

        </div>

          <div class="form-group">
            <label for="kijkwijzer">Kijkwijzer:</label>
            <select v-model="newFilm.Kijkwijzer" id="kijkwijzer" name="kijkwijzer" class="form-control" multiple>
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
        <div class="form-group">
          <label for="datumbeschikbaar">Datumbeschikbaar:</label>
          <input v-model="newFilm.Datumbeschikbaar" type="date" id="datumbeschikbaar" name="datumbeschikbaar" class="form-control">
        </div>

        <div class="form-group">
          <label for="afloopdatum">Afloopdatum:</label>
          <input v-model="newFilm.Afloopdatum" type="date" id="afloopdatum" name="afloopdatum" class="form-control">
        </div>


        <div class="form-group">
          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit"@click="AddNewFilm">Voeg film toe</button>

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
        <tr v-for="film in films">
          <td>{{ film.id }}</td>
          <td>{{ film.Film }}</td>
          <td>{{ film.Imax }}</td>
          <td>{{ film.DDD }}</td>
          <td>{{ film.ExtraLang }}</td>
          <td>{{ film.Datumbeschikbaar }}</td>
          <td>{{ film.Afloopdatum }}</td>
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
    },
    name: "Filmbeheer",

    data() {
      return {
        newFilm: {
          id: '',
          Film: '',
          Samenvatting: '',
          Poster: '',
          Imax: '',
          DDD: '',
          ExtraLang: '',
          Kijkwijzer: [],
          Datumbeschikbaar: '',
          Afloopdatum: '',
        },
        films: [],

        success: false,

        edit: false
      }
    },
    methods: {

      fetchFilm() {
        axios.get('https://localhost:8080/film/getAll')
          .then(response => {
            this.films = response.data;
          });
      }
      ,

      RemoveFilm(id) {
        var ConfirmBox = confirm("Weet u zeker dat u deze Film wilt verwijderen?")

        if (ConfirmBox) axios.delete('https://localhost:8080/film/delete/'+ id)

        this.fetchFilm()
      }
      ,

      EditFilm(id) {
        var film = this.newFilm

        this.newFilm = {id: '', Film: '', Samenvatting: '', Poster: '', Imax: '',DDD: '',ExtraLang: '',Kijkwijzer: [], Datumbeschikbaar: '',Afloopdatum: ''}

        axios.put('https://localhost:8080/film/update/' + id, film, function (data) {
          console.log(data)
        })

        this.fetchFilm()

        this.edit = false

      }
      ,

      ShowFilm(id) {
        this.edit = true

        axios.get('https://localhost:8080/film/getById/' + id, function (data) {
          this.newFilm.id = data.id
          this.newFilm.Film = data.Film
          this.newFilm.Samenvatting = data.Samenvatting
          this.newFilm.Poster = data.Poster
          this.newFilm.Imax = data.Imax
          this.newFilm.DDD = data.DDD
          this.newFilm.ExtraLang = data.ExtraLang
          this.newFilm.Kijkwijzer = data.Kijkwijzer
          this.newFilm.Datumbeschikbaar = data.Datumbeschikbaar
          this.newFilm.Afloopdatum = data.Afloopdatum
        })
      }
      ,

      AddNewFilm(){

        var film = this.newFilm


        this.newFilm = {Film: '', Samenvatting: '', Poster: '', Imax: '',DDD: '',ExtraLang: '',Kijkwijzer: [],Datumbeschikbaar: '',Afloopdatum: ''}


        axios.post('https://localhost:8080/film/save/', film)


        self = this
        this.success = true
        setTimeout(function () {
          self.success = false
        }, 5000)


        this.fetchFilm()

      }

    }
    ,

    computed: {
      validation() {
        return {
          Film: !!this.newFilm.Film.trim(),
          Datumbeschikbaar: !!this.newFilm.Datumbeschikbaar.trim(),
          Afloopdatum: !!this.newFilm.Afloopdatum.trim(),
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
