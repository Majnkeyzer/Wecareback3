<template >

  <!--<body>-->
<!--<br>-->
  <!--<div class="hoofddiv" >-->
    <!--<div>-->
      <!--<h2>Under Construction <b-badge>New</b-badge></h2>-->
      <!--<h3>Under Construction <b-badge>New</b-badge></h3>-->
      <!--<h4>Under Construction <b-badge>New</b-badge></h4>-->
      <!--<h5>Under Construction <b-badge>New</b-badge></h5>-->
      <!--<h6>Under Construction <b-badge>New</b-badge></h6>-->
    <!--</div>-->

    <!--<br><br>  <br><br>   <br><br>  <br><br>  <br><br>-->
<!--</div>-->

  <!--</body>-->
  <div>
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="connect">WebSocket connection:</label>
              <button id="connect" class="btn btn-default" type="submit" :disabled="connected == true" @click.prevent="connect">Connect</button>
              <button id="disconnect" class="btn btn-default" type="submit" :disabled="connected == false" @click.prevent="disconnect">Disconnect
              </button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="name">What is your name?</label>
              <input type="text" id="name" class="form-control" v-model="send_message" placeholder="Your name here...">
            </div>
            <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table id="conversation" class="table table-striped">
            <thead>
            <tr>
              <th>Greetings</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in received_messages" :key="item">
              <td>{{ item }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import SockJS from "sockjs-client";
  import Stomp from "webstomp-client";
  

  export default {
    name: "websocketdemo",
    data() {
      return {
        received_messages: [],
        send_message: null,
        connected: false
      };
    },
    methods: {
      send() {
        console.log("Send message:" + this.send_message);
        if (this.stompClient && this.stompClient.connected) {
          const msg = { name: this.send_message , type: 'single'};
          this.stompClient.send("/basis.newPremie", JSON.stringify(msg), {});
        }
      },
      connect() {
        this.socket = new SockJS("Vergoedingen");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect(
          {},
          frame => {
            this.connected = true;
            console.log(frame);
            this.stompClient.subscribe("/topic/javainuse", tick => {
              console.log(tick);
              this.received_messages.push(JSON.parse(tick.body).content);
            });
          },
          error => {
            console.log(error);
            this.connected = false;
          }
        );
      },
      disconnect() {
        if (this.stompClient) {
          this.stompClient.disconnect();
        }
        this.connected = false;
      },
      tickleConnection() {
        this.connected ? this.disconnect() : this.connect();
      }
    },
    mounted() {
      // this.connect();
    }
  };
</script>
<!--<template>-->
  <!--<div>-->
    <!--<div id="main-content" class="container">-->
      <!--<div class="row">-->
        <!--<div class="col-md-6">-->
          <!--<form class="form-inline">-->
            <!--<div class="form-group">-->
              <!--<label for="connect">WebSocket connection:</label>-->
              <!--<button id="connect" class="btn btn-default" type="submit" :disabled="connected == true" @click.prevent="connect">Connect</button>-->
              <!--<button id="disconnect" class="btn btn-default" type="submit" :disabled="connected == false" @click.prevent="disconnect">Disconnect-->
              <!--</button>-->
            <!--</div>-->
          <!--</form>-->
        <!--</div>-->
        <!--<div class="col-md-6">-->
          <!--<form class="form-inline">-->
            <!--<div class="form-group">-->
              <!--<label for="name">What is your name?</label>-->
              <!--<input type="text" id="name" class="form-control" v-model="send_message" placeholder="Your name here...">-->
            <!--</div>-->
            <!--<button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>-->
          <!--</form>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="row">-->
        <!--<div class="col-md-12">-->
          <!--<table id="conversation" class="table table-striped">-->
            <!--<thead>-->
            <!--<tr>-->
              <!--<th>Greetings</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="item in received_messages" :key="item">-->
              <!--<td>{{ item }}</td>-->
            <!--</tr>-->
            <!--</tbody>-->
          <!--</table>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import SockJS from "sockjs-client";-->
  <!--import Stomp from "webstomp-client";-->

  <!--export default {-->
    <!--name: "websocketdemo",-->
    <!--data() {-->
      <!--return {-->
        <!--received_messages: [],-->
        <!--send_message: null,-->
        <!--connected: false-->
      <!--};-->
    <!--},-->
    <!--methods: {-->
      <!--send() {-->
        <!--console.log("Send message:" + this.send_message);-->
        <!--if (this.stompClient && this.stompClient.connected) {-->
          <!--const msg = { name: this.send_message };-->
          <!--this.stompClient.send("/app/hello", JSON.stringify(msg), {});-->
        <!--}-->
      <!--},-->
      <!--connect() {-->
        <!--this.socket = new SockJS("http://localhost:8080/gs-guide-websocket");-->
        <!--this.stompClient = Stomp.over(this.socket);-->
        <!--this.stompClient.connect(-->
          <!--{},-->
          <!--frame => {-->
            <!--this.connected = true;-->
            <!--console.log(frame);-->
            <!--this.stompClient.subscribe("/topic/greetings", tick => {-->
              <!--console.log(tick);-->
              <!--this.received_messages.push(JSON.parse(tick.body).content);-->
            <!--});-->
          <!--},-->
          <!--error => {-->
            <!--console.log(error);-->
            <!--this.connected = false;-->
          <!--}-->
        <!--);-->
      <!--},-->
      <!--disconnect() {-->
        <!--if (this.stompClient) {-->
          <!--this.stompClient.disconnect();-->
        <!--}-->
        <!--this.connected = false;-->
      <!--},-->
      <!--tickleConnection() {-->
        <!--this.connected ? this.disconnect() : this.connect();-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--// this.connect();-->
    <!--}-->
  <!--};-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<!--<style scoped>-->
  <!--body{-->
    <!--background-color: whitesmoke;-->
  <!--}-->

  <!--.hoofddiv {-->
    <!--background-color: whitesmoke;-->
  <!--}-->

<!--</style>-->


