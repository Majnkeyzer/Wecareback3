<template>
 <div id="App">
   <template v-if="currentUser">
     <Navbar></Navbar>
   </template>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '/components/Navbar'
import test from './components/Beheer'
import Users from './components/Login'
import programma from './components/Programma'
import Beheer from './components/Beheer'
import Film_toevoegen from './components/Film toevoegen'

export default {
  name: 'App',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  components: {
    test, Users, programma, Navbar, Beheer
  },
  updated () {
    if (!localStorage.token && this.$route.path !== '/') {
      this.$router.push('/?redirect=' + this.$route.path)
    }
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
