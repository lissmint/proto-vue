import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

//firstsocket
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "ws://localhost:8080/t2wlj",
    vuex: {
      store,
      actionPrefix: "SOCKET_T2WLJ",
      mutationPrefix: "SOCKET_T2WLJ",
      options: {
        useConnectionNamespace: true,
      },
    },
    options: { path: "/services/t2wlj/" }
  })
);
// another socket
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "ws://localhost:8080/t2w",
    vuex: {
      store,
      actionPrefix: "SOCKET_T2W",
      mutationPrefix: "SOCKET_T2W",
      options: {
        useConnectionNamespace: true,
      },
    },
    options: { path: "/services/t2w/" }
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
