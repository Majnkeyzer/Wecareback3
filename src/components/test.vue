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
    <div class="uitleg" align="center">
      <h5>Over het gebruik van deze pagina:</h5>
      <p> Aan de linkerzijde van het scherm kunt u de informatie over nieuwe films toevoegen. Voer voor een nieuwe film
        de titel in en een samenvatting. als de film op meerdere tijden speel kun je na het invoeren van elke tijd, volgende
        indrukken om nog een tijd toe te voegen. Dit geldt ook voor zaalnummers. als u alle informatie heeft ingevoerd kunt
        u op opslaan drukken om alle informatie te bewaren.<br><br> Aan de rechter zijde van het scherm kunt u een film
        kiezen uit alle bestaande films, en vervolgens informatie over deze film aanpassen of de hele film, en alle informatie
        hierover verwijderen. Kies een bestande tijd, die verschijnt nadat u een film kiest om deze te verwijderen als u op
        opslaan drukt. Voer een tijd in het tekstvak in om deze toe te voegen als u op opslaan drukt </p>
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

      <div class="form-group">
        <label>Dagen</label>
        <select class="form-control" id="dagen" v-model="film.Dag">
        </select>
      </div>

        <div class="form-group">
          <label>Speel tijden:</label>
          <select class="form-control" id="sel1" v-model="film.Tijd">
            <option>10:00 uur</option>
            <option>13:00 uur</option>
            <option>18:00 uur</option>
            <option>20:00 uur</option>
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

      <div class="form-group">
        <label>Kijkwijzer:</label>
        <multiselect v-model="film.Kijkwijzer" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="false">
          <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="film.Kijkwijzer.length &amp;&amp; !isOpen">{{ film.Kijkwijzer.length }} options selected</span></template>
        </multiselect>
        <pre class="language-json"><code>{{ film.Kijkwijzer  }}</code></pre>
      </div>

      <div class="form-group">
        <label>Kijkwijzer:</label>
        <select multiple="true" v-bind:class="{ 'fix-height': multiple === 'true' }" v-model="film.Kijkwijzer">
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>

        <br>

        <button class="button.btn.btn-primary pull-right" @click="submit">Opslaan</button>
      <br>

      <div class="b-table-stacked-sm">
            <h1>Films Opvragen</h1>
            <div class="form-group">

            </div>
      </div>


        <button class="button.btn.btn-primary" @click="fetchData">Haal films op</button>
        <br><br>
        <ul class="list-group">
        <li class="list-group-item" v-for="f in films"> {{ f.Film.title }} -{{ f.Tijd.begintijd }} -{{ f.Zaal.zaalNummer}}</li>
        </ul>

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
          Dag: '',
          Tijd: '',
          Zaal: '',
          Poster: '',
          Standaard: '',
          Imax: '',
          DDD: '',
          ExtraLong: '',
          Kijkwijzer: '',

        },
        films: []

      };
    },
    methods: {
      submit() {
        axios.post('http://localhost:8080/voorstelling/filmstijdenzalen', this.film) //vuesjs.firebaseio.com/data.json
          .then(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
      },


      fetchData() {
        axios.get('http://localhost:8080/voorstelling/filmstijdenzalen')
          .then(response => {
            this.films = response.data;
         });
      }
    },

  }
</script>
