<template>
  <div class="container">
    <br>
    <br>
  <div class="b-table-stacked-sm">
    <h1>Films verwijderen</h1>
    <div class="form-group">

      <div class="form-group">
        <label>Film titel</label>
        <select class="form-control" id="filmtitel" v-model="film.Film">
          <option>John wick</option>
        </select>
      </div>

      <br>

      <button class="button.btn.btn-primary" @click="remove">Verwijderen</button>

      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>


    </div>
  </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "Film_verwijderen",
      data() {
        return {
          film: {
            Film: [],
          }
        }
      },

      methods: {
        remove() {
          axios.delete('https://vuebios.firebaseio.com/')
      }
     }
    }
</script>

<style scoped>

</style>
