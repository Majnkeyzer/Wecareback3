<template>
  <div class="container">
    <br>
    <button><router-link to="/Filmbeheer">Filmbeheer</router-link></button>
    <br><br>
    <h1>Voorstellingbeheer</h1>
    <div id="voorstellingController" style="padding-top: 2em">

      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <li v-show="!validation.Film">Titel is verplicht.</li>
          <li v-show="!validation.Datum">Datum is verplicht.</li>
          <li v-show="!validation.Tijd">Tijd is verplicht.</li>
          <li v-show="!validation.Zaal">Zaal is verplicht.</li>
        </ul>
      </div>

      <form>
        <div class="form-group">
          <label for="id">ID:</label>
          <input v-model="newVoorstelling.id" type="text" id="id" name="id" class="form-control">
        </div>

        <div class="form-group">
          <label for="film">Titel:</label>
          <select v-model="newVoorstelling.Film"  id="film" name="film" class="form-control">
            <option v-for="film in films">{{film.Film}}</option>
            <option>James Bond</option>
          </select>
        </div>

        <div class="form-group">
          <label for="datum">Datum:</label>
          <input v-model="newVoorstelling.Datum" type="date" id="datum" name="datum" class="form-control">
        </div>

        <div class="form-group">
          <label for="tijd">Tijd:</label>
          <input v-model="newVoorstelling.Tijd" type="time" id="tijd" name="tijd" class="form-control">
        </div>

        <div class="form-group">
          <label for="zaal">Zaal:</label>
          <select v-model="newVoorstelling.Zaal" id="zaal" name="zaal" class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <div class="form-group">
          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit" @click="AddNewVoorstelling">Voeg voorstelling toe</button>

          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditVoorstelling(newVoorstelling.id)">Verander Voorstelling</button>
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
          <td>{{ voorstelling.Film }}</td>
          <td>{{ voorstelling.Datum }}</td>
          <td>{{ voorstelling.Tijd }}</td>
          <td>{{ voorstelling.Zaal }}</td>
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
      },
      name: "Voorstellingbeheer",

      data() {
        return {
          films: [],
          newVoorstelling: {
            id: '',
            Film: '',
            Datum: '',
            Tijd: '',
            Zaal: ''
          },
          voorstellingen: [],


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

            fetchVoorstelling() {
              axios.get('https://localhost:8080/voorstelling/getAll')
                .then(response => {
                  this.voorstellingen = response.data;
                });
            }
        ,

          RemoveVoorstelling(id) {
            var ConfirmBox = confirm("Weet u zeker dat u deze Voorstelling wilt verwijderen?")

            if (ConfirmBox) axios.delete('https://localhost:8080/voorstelling/delete'+ id)

            this.fetchVoorstelling()
          }
        ,

          EditVoorstelling(id) {
            var voorstelling = this.newVoorstelling

            this.newVoorstelling = {id: '', Film: '', Datum: '', Tijd: '', Zaal: ''}

            axios.put('https://localhost:8080/voorstelling/update' + id, voorstelling, function (data) {
              console.log(data)
            })

            this.fetchVoorstelling()

            this.edit = false

          }
        ,

          ShowVoorstelling(id) {
            this.edit = true

            axios.get('https://localhost/voorstelling/findById' + id, function (data) {
              this.newVoorstelling.id = data.id
              this.newVoorstelling.name = data.Film
              this.newVoorstelling.email = data.Datum
              this.newVoorstelling.address = data.Tijd
              this.newVoorstelling.address = data.Zaal
            })
          }
        ,

          AddNewVoorstelling() {

            var voorstelling = this.newVoorstelling


            this.newVoorstelling = {Film: '', Datum: '', Tijd: '', Zaal: ''}


            axios.post('https://localhost:8080/voorstelling/save', voorstelling)


            self = this
            this.success = true
            setTimeout(function () {
              self.success = false
            }, 5000)


            this.fetchVoorstelling()

          }

        }
      ,

        computed: {
          validation(){
            return {
              Film: !!this.newVoorstelling.Film.trim(),
              Datum: !!this.newVoorstelling.Datum.trim(),
              Tijd: !!this.newVoorstelling.Tijd.trim(),
              Zaal: !!this.newVoorstelling.Zaal.trim()
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
