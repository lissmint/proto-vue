<template>
  <div id="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  sockets: {
    t2wlj: {
      connect: function() {
        console.log("socket connected");
      },
      disconnect: function(){
        console.log("socket connected");
      },
      customEmit: function(data) {
        console.log(
          'this method was fired by the socket server. eg: io.emit("customEmit", data)'
        );
      },
    },
  },
  components: {
    Sidebar,
  },
  mounted() {
    // setInterval(this.$store.commit('isActive'), 1);
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
