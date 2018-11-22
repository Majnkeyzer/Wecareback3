<template>
  <div class="container">
    <br>
    <button><router-link to="/Filmbeheer">Filmbeheer</router-link></button>
    <button><router-link to="/Voorstellingbeheer">Voorstellingbeheer</router-link></button>
    <button><router-link to="/Zaalbeheer">Zaalbeheer</router-link></button>
    <br><br>
    <h1>Zaalbeheer</h1>
    <div id="KijkwijzerController" style="padding-top: 2em">

      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <li v-show="!validation.kijkwijzertitel">Kijkwijzertitel is verplicht.</li>
        </ul>
      </div>

      <form @submit.prevent="AddNewKijkwijzer">

        <div class="form-group">
          <label for="kijkwijzertitel">Kijkwijzertitel:</label>
          <input v-model="newKijkwijzer.kijkwijzertitel" type="text" id="kijkwijzertitel" name="kijkwijzertitel" class="form-control">
        </div>

        <div class="form-group">
          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit">Voeg Kijkwijzer toe</button>

          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditKijkwijzer(newKijkwijzer.kijkwijzerid)">VeranderKijkwijzer</button>
        </div>

      </form>

      <div class="alert alert-success" transition="success" v-if="success">Toevoegen nieuwe Kijkwijzer succesvol.</div>

      <hr>

      <table class="table">
        <thead>
        <th>ID</th>
        <th>KIJKWIJZER</th>
        </thead>

        <tbody>
        <tr v-for="kijkwijzer in kijkwijzers">
          <td>{{ kijkwijzer.kijkwijzerid }}</td>
          <td>{{ kijkwijzer.kijkwijzertitel }}</td>
          <td>
            <button class="btn btn-default btn-sm" @click="ShowKijkwijzer(kijkwijzer.kijkwijzerid)">Aanpassen</button>
            <button class="btn btn-danger btn-sm" @click="RemoveKijkwijzer(kijkwijzer.kijkwijzerid)">Verwijderen</button>
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
      this.fetchKijkwijzer()
    },
    name: "Kijkwijzerbeheer",

    data() {
      return {
        newKijkwijzer: {
          kijkwijzerid: '',
          kijkwijzertitel: '',
        },
        kijkwijzers: [],


        success: false,

        edit: false
      }
    },
    methods: {
      fetchKijkwijzer() {
        axios.get('http://localhost:8080/kijkwijzer/getAll')
          .then(response => {
            this.kijkwijzers = response.data;
          });
      }
      ,

      RemoveKijkwijzer(kijkwijzerid) {
        var ConfirmBox = confirm("Weet u zeker dat u deze Kijkwijzer wilt verwijderen?")

        if (ConfirmBox) axios.delete('http://localhost:8080/kijkwijzer/delete/'+ kijkwijzerid)

        this.fetchKijkwijzer()
      }
      ,

      EditKijkwijzer(kijkwijzerid) {
        var kijkwijzer = this.newKijkwijzer

        this.newKijkwijzer = {kijkwijzerid: '', kijkwijzertitel: ''}

        axios.put('http://localhost:8080/Zaal/update/' + kijkwijzerid, kijkwijzer, function (data) {
          console.log(data)
        })

        this.fetchKijkwijzer()

        this.edit = false

      }
      ,

      ShowKijkwijzer(kijkwijzerid) {
        this.edit = true

        axios.get('http://localhost:8080/kijkwijzer/getById/'+ kijkwijzerid)
          .then(response => {
            this.newKijkwijzer.kijkwijzerid = response.data.kijkwijzerid
            this.newKijkwijzer.kijkwijzertitel = response.data.kijkwijzertitel
          });
      },

      AddNewKijkwijzer() {
        axios.post('http://localhost:8080/kijkwijzer/save', this.newKijkwijzer)
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

        this.newKijkwijzer = {kijkwijzertitel: ''}
        this.fetchKijkwijzer()

      }

    }
    ,

    computed: {
      validation(){
        return {
          kijkwijzertitel: !!this.newKijkwijzer.kijkwijzertitel.trim(),
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
