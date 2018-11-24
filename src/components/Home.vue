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

          <div class="div3">
            <img src="https://www.kokcinemaxx.nl/files/2016/06/beeld-monteren-troepjesc-kopie-2-1024x683.jpg" height="250px;" width="500px" margin-left="auto" margin-right="auto">
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
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
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
</style>
