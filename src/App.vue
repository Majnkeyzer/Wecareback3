<template>
 <div id="App">
    <router-view></router-view>
  </div>
</template>

<script>
import test from './components/test'
import Users from './components/Users'
import programma from './components/Programma'
import Film_toevoegen from './components/Film toevoegen'

export default {
  name: 'App',
  components: {
    test, Users, programma, Film_toevoegen
  }
}
</script>

<style>
#App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
