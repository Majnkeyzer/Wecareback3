<template>

  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Login beheerder</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="username" class="sr-only">Username</label>
      <input v-model="username" type="text" id="username" class="form-control" placeholder="Gebruikersnaam" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios';
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        error: false
      }
    },
    computed: {
      ...mapGetters({ currentUser: 'currentUser' })
    },
    created () {
      this.checkCurrentLogin()
    },
    updated () {
      this.checkCurrentLogin()
    },
    methods: {
      checkCurrentLogin () {
        if (this.currentUser) {
          this.$router.replace(this.$route.query.redirect || '/admin/Beheer')
        }
      },
      login() {
        let data = new FormData();

        data.set('username', this.username);
        data.set('password', this.password);
        axios.post('http://localhost:8080/Login', data)
          .then(request => this.loginSuccessful(request))
          .catch(() => this.loginFailed())
        },
      loginSuccessful(req) {
        // if (!req.data.token) {
        //   this.loginFailed()
        //   return
        // }
        this.error = false

        // localStorage.token = req.data.token
        this.$store.dispatch('login')
        this.$router.replace(this.$route.query.redirect || '/admin/Beheer')
      },
      loginFailed() {
        this.error = 'Login failed!'
        this.$store.dispatch('logout')
        delete localStorage.token
      },
      created() {
        this.checkCurrentLogin()
      },
      updated() {
        this.checkCurrentLogin()
      },
      checkCurrentLogin() {
        if (localStorage.token) {
          this.$router.replace(this.$route.query.redirect || '/admin/Beheer')
        }
      },
    }
  }
</script>

<style lang="css">
  body {
    background: #605B56;
  }
  .login-wrapper {
    background: slategray;
    width: 50%;
    margin: 12% auto;
    background-image:  url(../assets/hexagon-background.png);
    animation: fadein 0.6s;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .form-signin {
    max-width: 330px;
    padding: 10% 15px;
    margin: 0 auto;
  }
  .form-signin .form-signin-heading,
  .form-signin  {
    margin-bottom: 10px;
  }
  .form-signin  {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    height: auto;
     -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="username"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>

