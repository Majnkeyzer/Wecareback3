<!--<template>-->
<!--<div class="Test">-->
<!--<input type="text" v-model="title"><br />-->
<!--<h1>{{title}}</h1>-->
<!--<p>{{user.firstName}}</p>-->
<!--<p v-if="showName">{{user.firstName}}</p>-->
<!--<p v-else>Nobody</p>-->
<!--<ul>-->
<!--<li v-for="item in items">{{item.title}}</li>-->
<!--</ul>-->
<!--<button v-on:click="Groet">Welkomstboodschap</button>-->
<!--<br />-->
<!--<input type="text" v-on:keyup="drukKnop" v-on:keyup.enter="enterIngedrukt">-->
<!--<hr />-->
<!--<label>voornaam</label><input type="text" v-model="user.firstName">-->
<!--<label>achternaamnaam</label><input type="text" v-model="user.lastName">-->
<!--<h3>{{fullName}}</h3>-->
<!--<h2>{{msg}}</h2>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--name: 'Test',-->
<!--props: {-->
<!--msg: {-->
<!--default:'Foobar'-->
<!--}-->
<!--},-->
<!--data(){-->
<!--return {-->
<!--title: 'Hello World',-->
<!--user: {-->
<!--firstName: 'Robert',-->
<!--lastName: 'Kuijpers'-->
<!--},-->
<!--showName: false,-->
<!--items:[-->
<!--{title:'film 1'},-->
<!--{title: 'film 2'},-->
<!--{title: ' film 3'}-->
<!--]-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--Groet: function(){-->
<!--alert('hallo domoor');-->
<!--},-->
<!--drukKnop: function(e){-->
<!--console.log(e.target.value);-->
<!--},-->
<!--enterIngedrukt: function(){-->
<!--console.log('Je hebt enter ingedrukt!');-->
<!--}-->
<!--},-->
<!--computed: {-->
<!--fullName: function(){-->
<!--return this.user.firstName + " " + this.user.lastName;-->
<!--}-->
<!--}-->
<!--}-->

<template>

  <div class="container">

    <br>
    <br>
    <div class="uitleg" align="center">
      <h5>Beheerderspagina</h5>
      <p> Op deze pagina kunnen films toegevoegd, verwijderd en gewijzigd worden.
          Verder kan een voorstelling toegevoegd of verwijderd worden onder de knop Voorstelling wijzigen.
      </p>
      <p>
        Maak een keuze:
      </p>
    </div>

    <div align="center">
      <button><router-link to="/Film_toevoegen">Film toevoegen</router-link></button>
      <button><router-link to="/Film_verwijderen">Film verwijderen</router-link></button>
      <button><router-link to="/Film_wijzigen">Film wijzigen</router-link></button>
      <button><router-link to="/Voorstelling_wijzigen">Voorstelling wijzigen</router-link></button>
    </div>
    <div class="b-table-stacked-sm">
      <div class="pull-left">
        <h1>Film Toevoegen</h1>
        <div class="form-group">
          <label>Titel:</label>
          <input class="form-control" type="text" v-model="film.Film">
        </div>
      </div>

      <div class="form-group">
        <label>Samenvatting:</label>
        <textarea class="form-control" rows="5" id="comment" v-model="film.Samenvatting"></textarea>
      </div>
<!--
      <div class="form-group">
        <label>Dagen</label>
        <select class="form-control" id="dagen" v-model="film.Dag">
          <option>Maandag</option>
          <option>Dinsdag</option>
          <option>Woensdag</option>
          <option>Donderdag</option>
          <option>Vrijdag</option>
          <option>Zaterdag</option>
          <option>Zondag</option>
        </select>
      </div>

      -->
      <div class="form-group">
        <label>Speel tijden:</label>
        <select class="form-control" id="sel1" v-model="film.Tijd">
          <option>14:00 uur</option>
          <option>16:00 uur</option>
          <option>18:30 uur</option>
          <option>20:00 uur</option>
          <option>22:00 uur</option>
        </select>

      </div>

      <div class="form-group">
        <label>Zaal:</label>
        <select class="form-control" id="zaal" v-model="film.Zaal">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>

      </div>

<!--
      <div class="form-group">
        <label>Poster</label>
        <input class="form-control" type="text" v-model="film.Poster">
      </div>

      <div class="form-group">
        <label>Type film: </label>
        <br>
        <b-form-checkbox id="checkbox1"
                         v-model="film.Standaard"
                         value="true"
                         unchecked-value="false">
          Standaard
        </b-form-checkbox>


        <b-form-checkbox id="checkbox2"
                         v-model="film.Imax"
                         value="true"
                         unchecked-value="false">
          Imax
        </b-form-checkbox>


        <b-form-checkbox id="checkbox3"
                         v-model="film.DDD"
                         value="true"
                         unchecked-value="false">
          DDD
        </b-form-checkbox>


        <b-form-checkbox id="checkbox4"
                         v-model="film.ExtraLong"
                         value="true"
                         unchecked-value="false">
          Extra lang
        </b-form-checkbox>

      </div>

     <!-- <div class="form-group">
        <label>Kijkwijzer:</label>
        <multiselect v-model="film.Kijkwijzer" :options="options" :multiple="true" :close-on-select="false"
                     :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name"
                     track-by="name" :preselect-first="false">
          <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                   v-if="film.Kijkwijzer.length &amp;&amp; !isOpen">{{ film.Kijkwijzer.length }} options selected</span>
          </template>
        </multiselect>
        <pre class="language-json"><code>{{ film.Kijkwijzer  }}</code></pre>
      </div> -->
<!--
      <label>Kijkwijzer</label>
      <div class="form-group">
        <select v-model="film.Kijkwijzer" multiple>
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

-->

      <br>

      <button class="button.btn.btn-primary pull-right" @click="submit">Opslaan</button>
      <br>
      <br>
<!--
      <div class="b-table-stacked-sm">
        <h1>Films Opvragen</h1>
        <div class="form-group">

        </div>
      </div>


      <button class="button.btn.btn-primary" @click="fetchData">Haal films op</button>
      <br><br>
      <ul class="list-group">
        <li class="list-group-item" v-for="f in films"> {{ f.Film.title }} -{{ f.Tijd.begintijd }} -{{
          f.Zaal.zaalNummer}}
        </li>
      </ul>

      <div class="b-table-stacked-sm">
        <div class="pull-left">
          <h1>Film Wijzigen</h1>

          <div class="form-group">
            <label>Titel selecteren</label>
            <select class="form-control" id="wijzigtitel" v-model="film.Film">
            </select>
          </div>

          <div class="form-group">
            <label>Titel:</label>
            <input class="form-control" type="text" v-model="film.Film">
          </div>
        </div>

        <div class="form-group">
          <label>Samenvatting:</label>
          <textarea class="form-control" rows="5" id="wijzigcomment" v-model="film.Samenvatting"></textarea>
        </div>

        <div class="form-group">
          <label>Dagen</label>
          <select class="form-control" id="wijzigdagen" v-model="film.Dag">
            <option>Maandag</option>
            <option>Dinsdag</option>
            <option>Woensdag</option>
            <option>Donderdag</option>
            <option>Vrijdag</option>
            <option>Zaterdag</option>
            <option>Zondag</option>
          </select>
        </div>

        <div class="form-group">
          <label>Speel tijden:</label>
          <select class="form-control" id="wijzigtijden" v-model="film.Tijd">
            <option>14:00 uur</option>
            <option>16:00 uur</option>
            <option>18:30 uur</option>
            <option>20:00 uur</option>
            <option>22:00 uur</option>
          </select>

        </div>

        <div class="form-group">
          <label>Zaal:</label>
          <select class="form-control" id="wijzigzaal" v-model="film.Zaal">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>

        </div>


        <div class="form-group">
          <label>Poster</label>
          <input class="form-control" type="text" v-model="film.Poster">
        </div>

        <div class="form-group">
          <label>Type film: </label>
          <br>
          <b-form-checkbox id="checkbox5"
                           v-model="film.Standaard"
                           value="true"
                           unchecked-value="false">
            Standaard
          </b-form-checkbox>


          <b-form-checkbox id="checkbox6"
                           v-model="film.Imax"
                           value="true"
                           unchecked-value="false">
            Imax
          </b-form-checkbox>


          <b-form-checkbox id="checkbox7"
                           v-model="film.DDD"
                           value="true"
                           unchecked-value="false">
            DDD
          </b-form-checkbox>


          <b-form-checkbox id="checkbox8"
                           v-model="film.ExtraLong"
                           value="true"
                           unchecked-value="false">
            Extra lang
          </b-form-checkbox>

        </div>

      <!--  <div class="form-group">
          <label>Kijkwijzer:</label>
          <multiselect v-model="film.Kijkwijzer" :options="options" :multiple="true" :close-on-select="false"
                       :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name"
                       track-by="name" :preselect-first="false">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                     v-if="film.Kijkwijzer.length &amp;&amp; !isOpen">{{ film.Kijkwijzer.length }} options selected</span>
            </template>
          </multiselect>
          <pre class="language-json"><code>{{ film.Kijkwijzer  }}</code></pre>
        </div> -->

<!--
        <label>Kijkwijzer</label>
        <div class="form-group">
          <select v-model="film.Kijkwijzer" multiple>
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
      </div>

      <br>
-->
      <button class="button.btn.btn-primary" @click="update">Wijzigen</button>

      <br>
      <br>
      <div class="b-table-stacked-sm">
        <h1>Films verwijderen</h1>
        <div class="form-group">

          <div class="form-group">
            <label>Film titel</label>
            <select class="form-control" id="filmtitel" v-model="film.Film">
              <option  v-for="f in films"> {{ f.Film.title }}</option>
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
  </div>


</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        film: {
          Film: '',
          Samenvatting: '',
          Tijd: '',
          Zaal: '',
        },
        films: []

      };
    },
    methods: {
      submit() {
        axios.post('http://vuebios.firebaseio.com/', this.film)
          .then(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
      },


      fetchData() {
        axios.get('https://vuebios.firebaseio.com/')
          .then(response => {
            this.films = response.data;
          });
      },

      update() {
        axios.put('https://vuebios.firebaseio.com/', {
          films
      })
      },

      remove() {
        axios.delete('https://vuebios.firebaseio.com/')
      }
    },

    /*created() {
      axios.get(`http://localhost:8080/voorstelling/films`)
        .then(response => {
          this.films = response.data    })
        .catch(e => {
          this.errors.push(e)    })
    }*/
  }
</script>
