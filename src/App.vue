<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    let url='/api/klines/spread/';
    let data={
      "nearby":{"type":"CW", "exchange":"huobi"},
      "forward":{"type":"CQ", "exchange":"huobi"},
      "symbol":"BTC",
      "end_time":1557890000,
      "length": 1000,
      "timeframe":"1m"
    }
    let callback=function (res) {
      console.log(res)
    }
    // this.httpPost(url,data,callback)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>
