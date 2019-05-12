<template>

  <body>
  <br>
<p>Kies hier uw Zorgverzekering</p>

  <div class="hoofddiv">
    <form>
    <!--<form @submit.prevent="AddNewBerekening">-->
      <!--<b-form-select v-model="selected" class="mb-3">-->
        <!--<option value="a">BasisZorg</option>-->
        <!--<option value="b">Compleet</option>-->
      <!--</b-form-select>-->


      <div class="form-group">
        <label for="basiszorg">Vul hier uw zorgverzekering in: basiszorg of basiszorg compleet</label>
        <input v-model="newPremie.dekking" type="text" id="basiszorg" name="basiszorg" class="form-control">
      </div>

      <div class="form-group">
        <label for="verzekerden">Vul hier het aantal verzekerden in:</label>
        <textarea v-model="newPremie.premie"  id="verzekerden" name="verzekerden" class="form-control">
          </textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-default" type="submit">Bereken premie</button>

      </div>

      <div class="premie">
        <button v-on:click="clickPremie">bereken premie</button>
        <br>
        <tr v-for="(premie, index) in premies" :key="index">
          <!--<td>{{ premie.id }}</td>-->
          <td>{{ premie.dekking }}</td>

        </tr>

       </div>


      <h1> {{ msg }}</h1>
    </form>
      <table class="table">
        <thead>
        <th>Dekking: </th>
        <th>Premie: </th>
        </thead>


      <tbody>
      <tr v-for="(premie, index) in premies" :key="index">
        <!--<td>{{ premie.id }}</td>-->
        <td>{{ premie.dekking }}</td>
        <td>{{ premie.premie }}</td>
      </tr>
      </tbody>
      </table>



  </div>
  </body>

</template>

<script>
  import axios from 'axios';

  export default {
    mounted() {
      this.fetchZorgverzekering()

    },


    data() {
      return {
        msg:'Voorbeeld gespecificeerde premie voor 1 verzekerde',
        premiezorg: "",
        premies:'',
        newPremie: {
            dekking: '',
            premie: '',
            premieberekening: '',
          },

        }
      },


        methods: {
          fetchZorgverzekering() {
            axios.get('http://localhost:8083/premie/apiDekking')
              .then(response => {
                this.premies = response.data;
                console.log(response)

              });
          },
          clickPremie() {
            axios.get('http://localhost:8083/premie/apiDekking')
              .then(response => {
                this.premiezorg = response.data;
                console.log(response)

              });
          },
        }

  }

</script>

<style scoped>

</style>


<style scoped>
  body{
    background-color: whitesmoke;
  }

  .hoofddiv {
    background-color: whitesmoke;
  }

  table{
    width: 50%;
  }

  th {
    height: 50px;
  }

 h1{
   font-size: 30px;
 }

</style>








