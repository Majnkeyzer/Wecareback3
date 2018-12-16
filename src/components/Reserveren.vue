<template>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    <option>8</option>
    <option>9</option>
    <option>10</option>
  </select>
</template>

<script>
    export default {
        name: "Reserveren"
    }
</script>

<style scoped>
  .img1{
    position: relative;
    top: 100px;
    right: 100px;
    height: 450px;
    width: 350px;
    box-shadow: 10px 10px 5px black;
  }

  .title{
    position: relative;
    bottom: 360px;
    margin-left: 350px;
    font-size: 45px;
    font-weight: 600;
    text-shadow:2px 2px 5px darkgrey;
  }

  .subtitle{
    position: relative;
    bottom: 340px;
    margin-left: 350px;
  }

  .description{
    position: relative;
    bottom: 260px;
    margin-left: 350px;
  }

  .icon1{
    height: 40px;
    width: 40px;
  }
  .icon2{
    height: 40px;
    width: 40px;
  }
  .icon3{
    height: 40px;
    width: 40px;
  }
</style>
