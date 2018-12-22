<template>

  <div class="container">
    <br><br><br><br><br><br><br>
    <div class="uitleg" align="center">
      <h5>Beheerderspagina</h5>
      <p> Welkom op de beheerderspagina!<br>
        Op deze pagina kunt u een keuze maken tussen films, kijkwijzers, zalen of voorstellingen, om toegevoegd, verwijderd en gewijzigd te worden.
      </p>
      <p>
        Maak een keuze:
      </p>
    </div>

    <div align="center">
      <b-button-group>
      <b-button><router-link to="/Filmbeheer" style="color:white;">Filmbeheer</router-link></b-button>
      <b-button><router-link to="/Voorstellingbeheer" style="color:white;">Voorstellingbeheer</router-link></b-button>
      <b-button><router-link to="/Zaalbeheer" style="color:white;">Zaalbeheer</router-link></b-button>
      <b-button><router-link to="/Kijkwijzerbeheer" style="color:white;">Kijkwijzerbeheer</router-link></b-button>
       </b-button-group>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br>

  </div>
</template>
