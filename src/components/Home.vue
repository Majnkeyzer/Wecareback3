<template >
  <body>
    <div class="hoofddiv" align="center">
      <br>
      <br>
      <br>


          <div class="div1">
            <p align="center">
            <img src="../assets/WeCare.jpg">
            </p>
          </div>

      <div class="div5">
        <p align="center">
          WeCare is één van de grootste zorgverzekeraars zonder winstoogmerk van Nederland. Wij vinden het belangrijk dat u goede zorg krijgt. En dat uw zorgzaken gemakkelijk en snel geregeld zijn.
        </p>
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
    background-color: whitesmoke;
  }

  .div1{
    position: relative;
    bottom:20px;
    left: 175px;
    width: 350px;
  }


  .div1{
    margin-right: 900px;
    width: 350px;
    align: left;
    background-image:  url(../assets/hexagon-background.png);
    color: black;
  }

  .div4{
    position: absolute;
    top: 200px;
    left: 575px;
    width: 350px;
    color: black;
  }

  .div5{
    position: absolute;
    top: 650px;
    left: 575px;
    width: 350px;
    color: black;
    font-family: Calibri,"Times New Roman", Serif;
    font-size: 17px;
    background-image:  url(../assets/hexagon-background.png);

  }

  .div6{
    position: relative;
    bottom: 120px;
  }
</style>
