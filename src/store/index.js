import Vue from "vue";
import Vuex from "vuex";
import serviceList from "@/assets/serviceList"
// import assignWebSocketListeners from "@/assets/assignListeners"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    responses: 0,
    services: serviceList
  },
  mutations: {
    setActive(state, serviceIdx) {
      if (this.state.services[serviceIdx].ws.readyState == 1) {
        state.services[serviceIdx].active = true;
      } else {
        state.services[serviceIdx].active = false;
      }
      state.responses++
    },
    assignSockets(state, services) {
      state.services.forEach((val, idx, arr) => {
        arr[idx].ws = services[idx].ws;
      });
    },
  },
  getters: {
    activeServices: (state) => state.services.filter((serv) => serv.active),
    allServices: (state) => state.services,
    responses: (state) => state.responses
  },
  actions: {
    connectToSockets(store) {
      let services = store.getters.allServices.map((a) => ({ ...a }));
      for (let s in services) {
        services[s].ws = new WebSocket(
          // `ws://localhost:80/services/${services[s].url}/`
          "wss://echo.websocket.org"
        );

        services[s].ws.onopen = function(e) {
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
          store.commit("setActive", s);
        };

        services[s].ws.onerror = function(error) {
          console.log(`[error] ${error.message}`);
        };
      }
      store.commit("assignSockets", services);
    },
  },
  modules: {},
});
