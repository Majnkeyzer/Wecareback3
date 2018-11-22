<template>
  <div class="container">
    <br>
    <button><router-link to="/Filmbeheer">Filmbeheer</router-link></button>
    <button><router-link to="/Voorstellingbeheer">Voorstellingbeheer</router-link></button>
    <button><router-link to="/Zaalbeheer">Zaalbeheer</router-link></button>
    <br><br>
    <h1>Kijkwijzerbeheer</h1>
    <div id="KijkwijzerController" style="padding-top: 2em">

      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <li v-show="!validation.tekst">Kijkwijzertitel is verplicht.</li>
          <li v-show="!validation.symbool">Kijkwijzertitel is verplicht.</li>
        </ul>
      </div>

      <form @submit.prevent="AddNewKijkwijzer">

        <div class="form-group">
          <label for="kijkwijzertitel">Kijkwijzertitel:</label>
          <input v-model="newKijkwijzer.tekst" type="text" id="kijkwijzertitel" name="kijkwijzertitel" class="form-control">
        </div>

        <div class="form-group">
          <label for="symbool">Symbool:</label>
          <input v-model="newKijkwijzer.symbool" type="text" id="symbool" name="symbool" class="form-control">
        </div>

        <div class="form-group">
          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit">Voeg Kijkwijzer toe</button>

          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditKijkwijzer(newKijkwijzer.kwid)">VeranderKijkwijzer</button>
        </div>

      </form>

      <div class="alert alert-success" transition="success" v-if="success">Toevoegen nieuwe Kijkwijzer succesvol.</div>

      <hr>

      <table class="table">
        <thead>
        <th>ID</th>
        <th>KIJKWIJZERTITEL</th>
        <th>SYMBOOL</th>

        </thead>

        <tbody>
        <tr v-for="kijkwijzer in kijkwijzers">
          <td>{{ kijkwijzer.kwid }}</td>
          <td>{{ kijkwijzer.tekst }}</td>
          <td>{{ kijkwijzer.symbool }}</td>
          <td>
            <button class="btn btn-default btn-sm" @click="ShowKijkwijzer(kijkwijzer.kwid)">Aanpassen</button>
            <button class="btn btn-danger btn-sm" @click="RemoveKijkwijzer(kijkwijzer.kwid)">Verwijderen</button>
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
          kwid: '',
          tekst: '',
          symbool: ''
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

      RemoveKijkwijzer(kwid) {
        var ConfirmBox = confirm("Weet u zeker dat u deze Kijkwijzer wilt verwijderen?")

        if (ConfirmBox) axios.delete('http://localhost:8080/kijkwijzer/delete/'+ kwid)

        this.fetchKijkwijzer()
      }
      ,

      EditKijkwijzer(kwid) {
        var kijkwijzer = this.newKijkwijzer

        this.newKijkwijzer = {kwid: '', tekst: '', symbool: ''}

        axios.put('http://localhost:8080/kijkwijzer/update/' + kwid, kijkwijzer, function (data) {
          console.log(data)
        })

        this.fetchKijkwijzer()

        this.edit = false

      }
      ,

      ShowKijkwijzer(kwid) {
        this.edit = true

        axios.get('http://localhost:8080/kijkwijzer/getById/'+ kwid)
          .then(response => {
            this.newKijkwijzer.kwid = response.data.kwid
            this.newKijkwijzer.tekst = response.data.tekst
            this.newKijkwijzer.symbool = response.data.symbool
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

        this.newKijkwijzer = {tekst: '', symbool: ''}
        this.fetchKijkwijzer()

      }

    }
    ,

    computed: {
      validation(){
        return {
          tekst: !!this.newKijkwijzer.tekst.trim(),
          symbool: !!this.newKijkwijzer.symbool.trim()
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
