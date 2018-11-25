<template>
  <div class="container">
    <br>
    <button><router-link to="/Filmbeheer">Filmbeheer</router-link></button>
    <button><router-link to="/Voorstellingbeheer">Voorstellingbeheer</router-link></button>
    <button><router-link to="/Kijkwijzerbeheer">Kijkwijzerbeheer</router-link></button>

    <br><br>
    <h1>Zaalbeheer</h1>
    <div id="ZaalController" style="padding-top: 2em">

      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <li v-show="!validation.zaalNummer">Zaalnummer is verplicht.</li>
          <li v-show="!validation.aantalStoelen">Aantal stoelen is verplicht.</li>
        </ul>
      </div>

      <form @submit.prevent="AddNewZaal">

        <div class="form-group">
          <label for="zaalnummer">Zaalnummer:</label>
          <input v-model="newZaal.zaalNummer" type="text" id="zaalnummer" name="zaalnummer" class="form-control">
        </div>

        <div class="form-group">
          <label for="aantalstoelem">Aantal stoelen:</label>
          <input v-model="newZaal.aantalStoelen" type="number" id="aantalstoelem" name="zaantalstoelemaalnummer" class="form-control">
        </div>


        <div class="form-group">
          <label>Type Zaal:</label>
          <br>
          <b-form-checkbox id="imax"
                           v-model="newZaal.imaxZaal"
                           name="imax"
                           value="true"
                           unchecked-value="false"
          >
            Imax
          </b-form-checkbox>
          <b-form-checkbox id="ddd"
                           v-model="newZaal.drieDZaal"
                           name="ddd"
                           value="true"
                           unchecked-value="false"
          >
            3D
          </b-form-checkbox>
        </div>

        <div class="form-group">
          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="!edit">Voeg zaal toe</button>

          <button :disabled="!isValid" class="btn btn-default" type="submit" v-if="edit" @click="EditZaal(newZaal.id)">Verander Zaal</button>
        </div>

      </form>

      <div class="alert alert-success" transition="success" v-if="success">Toevoegen nieuwe zaal succesvol.</div>

      <hr>

      <table class="table">
        <thead>
        <th>ID</th>
        <th>ZAALNUMMER</th>
        <th>AANTAL STOELEN</th>
        <th>IMAX</th>
        <th>3D</th>
        </thead>

        <tbody>
        <tr v-for="zaal in zalen">
          <td>{{ zaal.id }}</td>
          <td>{{ zaal.zaalNummer }}</td>
          <td>{{ zaal.aantalStoelen }}</td>
          <td>{{ zaal.imaxZaal }}</td>
          <td>{{ zaal.drieDZaal }}</td>
          <td>
            <button class="btn btn-default btn-sm" @click="ShowZaal(zaal.id)">Aanpassen</button>
            <button class="btn btn-danger btn-sm" @click="RemoveZaal(zaal.id)">Verwijderen</button>
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
      this.fetchZalen()
    },
    name: "Zaalbeheer",

    data() {
      return {
        newZaal: {
          id: '',
          zaalNummer: '',
          aantalStoelen: '',
          imaxZaal: '',
          drieDZaal: ''
        },
        zalen: [],


        success: false,

        edit: false
      }
    },
    methods: {
      fetchZalen() {
        axios.get('http://localhost:8080/Zaal/getAll')
          .then(response => {
            this.zalen = response.data;
          });
      }
      ,

      RemoveZaal(id) {
        var ConfirmBox = confirm("Weet u zeker dat u deze Zaal wilt verwijderen?")

        if (ConfirmBox) axios.delete('http://localhost:8080/Zaal/delete/'+ id)

        this.fetchZalen()
      }
      ,

      EditZaal(id) {
        var zaal = this.newZaal

        this.newZaal = {id: '', zaalNummer: '', aantalStoelen: '', imaxZaal: '', drieDZaal: ''}

        axios.put('http://localhost:8080/Zaal/update/' + id, zaal, function (data) {
          console.log(data)
        })

        this.fetchZalen()

        this.edit = false

      }
      ,

      ShowZaal(id) {
        this.edit = true

        axios.get('http://localhost:8080/Zaal/getById/'+ id)
          .then(response => {
          this.newZaal.id = response.data.id
          this.newZaal.zaalNummer = response.data.zaalNummer
          this.newZaal.aantalStoelen = response.data.aantalStoelen
          this.newZaal.imaxZaal = response.data.imaxZaal
          this.newZaal.drieDZaal = response.data.drieDZaal
          });
      },

      AddNewZaal() {
        axios.post('http://localhost:8080/Zaal/save', this.newZaal)
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

        this.newZaal = {id: '', zaalNummer: '', aantalStoelen: '', imaxZaal: '', drieDZaal: ''}
        this.fetchZalen()

      }

    }
    ,

    computed: {
      validation(){
        return {
          zaalNummer: !!this.newZaal.zaalNummer.trim(),
          aantalStoelen: !!this.newZaal.aantalStoelen
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
