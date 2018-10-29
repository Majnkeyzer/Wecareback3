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
    <div class="rechts">
      <h4>Film Info</h4>
      <div>
        <label>Selecteer titel</label>
        <select class="form-control" id="sel2" v-model="film.titel"> <button v-on:click="film.delete">Verwijder Film</button><br>
          <li v-for="film in films">{{film.titel}}</li> <!-- list of select... moet nog gevuld worden met DB data -->
        </select>
      </div>
      <div>
        <label>Selecteer een tijd</label>
        <select class="form-control" id="sel3" v-model="film.tijd"> <button v-on:click=""> Verwijder Tijd</button><br>
          <li v-for="tijd in tijden">{{voorstelling.tijd}}</li> <!-- list of select... moet nog gevuld worden met DB data -->
          <h6>je kan hier ook ervoor kiezen om de tijden te deleten</h6>
        </select>
        <br><br>
        <label>Tijd Toevoegen</label><span></span><input type="text" ref="TijdIn" data-value="voer tijd in"><br><br>


      </div>
      <div class="rechts">
        <span></span><button> Wijzigingen Opslaan</button> <br><br>
      </div>

      <br><br>

      <div class="rechts">
        <span></span><button> Geselecteerde Film Verwijderen</button>
      </div>
    </div>
    <div class="row">
      <div class="pull-left">
        <h4>Film Toevoegen</h4>
        <div class="form-group">
          <label>Titel:</label>
          <input class="form-control" type="text" v-model="film.titel">
        </div>

        <div class="form-group">
          <label>Samenvatting:</label>
          <textarea class="form-control" rows="5" id="comment" v-model="film.samenvatting"></textarea>
        </div>

        <div class="form-group">
          <label>Speel tijden:</label>
          <select class="form-control" id="sel1" v-model="film.tijd"> <br>
            <option>10:00 uur</option>
            <option>13:00 uur</option>
            <option>18:00 uur</option>
            <option>20:00 uur</option>
          </select>

        </div>

        <div class="form-group">
          <label>Zaal:</label>
          <select class="form-control" id="zaal" v-model="film.zaal"> <br>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>

        </div>

        <button class="button.btn.btn-primary pull-right" @click="submit">Opslaan</button>


        <!--<button class="button.btn.btn-primary" @click="fetchData">Get data</button>-->
        <!--<br><br>-->
        <!--<ul class="list-group">-->
        <!--<li class="list-group-item" v-for="f in films"> {{ f.titel}} -{{ f.tijd }} -{{ f.samenvatting }}</li>-->
        <!--</ul>-->

      </div>

    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        film: {
          titel: '',
          samenvatting: '',
          tijd: '',
          zaal: ''
        },
        films: []

      };
    },
    methods: {
      submit() {
        this.$http.post('https://vuesjs.firebaseio.com/data.json', this.film)
          .then(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
      },
      // fetchData() {
      //      this.$http.get('https://vuesjs.firebaseio.com/data.json')
      //            .then(response => {
      //                return response.json();
      //            })
      //            .then(data => {
      //                const resultArray = [];
      //                for (let key in data) {
      //                    resultArray.push(data[key]);
      //                }
      //                this.users = resultArray;
      //            });
      //
      //
      //     }
    },

  }
</script>

<style scoped>

  .rechts{
    float: right;
  }



</style>
