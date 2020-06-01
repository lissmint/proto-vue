import Vue from "vue";
import Vuex from "vuex";
// import assignWebSocketListeners from "@/assets/assignListeners"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    changes: 0,
    services: [
      {
        title: "Tacotron 2.1",
        familyName: "tts",
        active: false,
        tags: ["EN", "LJ"],
        url: "t2w",
        ws: {},
        options: {
          maxLength: 140,
        },
      },
      {
        title: "Tacotron 2.1 + WJ",
        familyName: "tts",
        active: false,
        tags: ["EN", "LJ", "BIG"],
        url: "t2wlj",
        ws: {},
        options: {},
      },
      {
        title: "Wave2Letter+",
        familyName: "asr",
        active: false,
        tags: ["LibriSpeech", "EN"],
        url: "w2l",
        ws: {},
        options: {},
      },
    ],
  },
  mutations: {
    setActive(state, i) {
      state.services[i].active = true;
      state.changes++;
    },
    setServices(state, services) {
      state.services = services.map((a) => ({ ...a }));
      state.changes++;
    },
    // setSelected(state, service) {
    //   state.selectedService = { ...service };
    //   console.log (state.selectedService)
    // },
  },
  getters: {
    activeServices: (state) => state.services.filter((serv) => serv.active),
    allServices: (state) => state.services,
    changes: (state) => state.changes,
  },
  actions: {
    connectToSockets(store) {
      let services = store.getters.allServices.map((a) => ({ ...a }));
      for (let s in services) {
        services[s].ws = new WebSocket(
          // `ws://localhost:80/services/${services[s].url}/`
          "wss://echo.websocket.org"
        );

        services[s].ws.onopen = function(event) {
          console.log(`[open] Соединение ${services[s].url} установлено`);
          store.commit("setActive", s);
        };

        services[s].ws.onmessage = function(event) {
          console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        services[s].ws.onclose = function(event) {
          if (event.wasClean) {
            console.log(
              `[close] Соединение ${services[s].url} закрыто чисто, код=${event.code} причина=${event.reason}`
            );
          } else {
            // например, сервер убил процесс или сеть недоступна
            // обычно в этом случае event.code 1006
            console.log("[close] Соединение прервано, code = " + event.code);
          }
        };

        services[s].ws.onerror = function(error) {
          console.log(`[error] ${error.message}`);
        };
        // setTimeout(function() {
        //   if (services[s].ws.readyState === WebSocket.CLOSED) {
        //     console.log(`${services[s].url} closed`);
        //     services[s].active = false;
        //   }
        // }, 1000);
      }
      console.log("sockets created");
      store.commit("setServices", services);
    },
  },
  modules: {},
});
