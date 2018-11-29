<template >
  <body>
    <div class="hoofddiv" align="center">
      <br>
      <br>
      <br>

      <div class="div1">
        <h5 align="left">Onze openingstijden:</h5><br>
        <p align="left">
      Maandag: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16:00 - 01:00<br>
      Dinsdag: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16:00 - 01:00 <br>
      Woensdag: &nbsp;&nbsp;&nbsp;&nbsp;16:00 - 01:00<br>
      Donderdag: &nbsp;&nbsp;&nbsp;16:00 - 01:00<br>
      Vrijdag: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16:00 - 01:00<br>
      Zaterdag: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14:00 - 01:00<br>
      Zondag: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14:00 - 01:00<br><br>
      Uitgezonderd feestdagen
        </p>
      </div>

        <br><br>

        <div class="div2">
        <h5 align="left">Contact info:</h5> <br>
          <p align="left">
          Retro Cinema N.V.<br>
          steenstraatweg 123 <br>
          1234 AB Droomstad <br>
          Fantasialand <br><br>
          Tel nr: 0123 - 456789 <br>
          Fax: 987654321<br>
          Email: mail.adres@provider.com<br>
          </p>
        </div>

      <div class="div4">
        <p align="center">
          Welkom bij Retrocinema! Jouw bioscoop met de beste films en zalen.
          Bij ons kun je zowel genieten van 2D, 3D, Imax en Imax3D.
          Natuurlijk hebben we voor jou ook het mooiste geluid met de Dolby Digital 13.1 Surround Sound.
          Dus wacht niet langer en kom een keer langs om het zelf te ervaren!
        </p>
      </div>

          <div class="div3">
            <img src="https://cdn2.kinepolis.com/sites/kinepolis.nl/files/styles/slider_24_7_960/public/theaters/voorkant_cinemagnus_website.jpg?itok=Xi1g0UB5" style=" height: 250px; width: 500px; box-shadow: 10px 10px 5px black;">
          </div>

      <div class="div5">
        <p align="center">
          Wil je niet naar de film maar liever gezellig wat drinken of een hapje eten.
          Ook dat kan! bij onze super gezellige brasserie kun je genieten van een lekkere versnapering of
          een uitgebreide maaltijd. De brasserie is elke dag open op dezelfde tijden als de bioscoop.
          Kom dus eens langs en oordeel zelf!
        </p>
      </div>

      <div class="div6">
        <img src="https://d1ds1nqrpp2srf.cloudfront.net/photos/35636/image-jpg20141220-37155-azmn1j_original.jpg?1515610143" style=" height: 250px; width: 500px; box-shadow: 10px 10px 5px black;">
      </div>

    </div>
  </body>
</template>

<script>
    export default {
      name:"Home",
    }
</script>

<style scoped>
  .hoofddiv{
    background-color: slategray;
  }

  .div3{
    position: relative;
    bottom: 370px;
  }

  .div2{
    margin-right: 900px;
    width: 350px;
    align: left;
    background-image:  url(../assets/hexagon-background.png);
  }

  .div1{
    margin-right: 900px;
    width: 350px;
    align: left;
    background-image:  url(../assets/hexagon-background.png);
  }

  .div4{
    position: absolute;
    top: 200px;
    left: 575px;
    width: 350px;
  }

  .div5{
    position: absolute;
    top: 700px;
    left: 575px;
    width: 350px;
  }

  .div6{
    position: relative;
    bottom: 120px;
  }
</style>
