import Vue from 'vue'
import Vuex from 'vuex'
import socket from './socket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    services: [
      {
        title: "Tacotron 2.1",
        familyName: "tts",
        active: true,
        tags: ["EN", "LJ"],
        url: "t2w",
        ws: {},
        options: {},
      },
      {
        title: "Tacotron 2.1 + WJ",
        familyName: "tts",
        active: true,
        tags: ["EN", "LJ", "BIG"],
        url: "t2wlj",
        ws: {},
        options: {},
      },
      {
        title: "Wave2Letter+",
        familyName: "asr",
        active: true,
        tags: ["LibriSpeech", "EN"],
        url: "w2l",
        ws: {},
        options: {},
      },
    ],
    selectedService: {},
  },
  mutations: {
    // setActive(state) {
    //   for (let service of state.services) {
    //     service.active = !service.active;
    //   }
    // },
    setServices(state, services) {
      state.services = services.map((a) => ({ ...a }));
    },
    setSelected(state, service) {
      debugger
      state.selectedService = { ...service };
      console.log(state.selectedService)
    },
  },
  getters: {
    activeServices: (state) => {
      return state.services.filter((serv) => serv.active);
    },
    allServices: (state) => {
      return state.services;
    },
  },
  actions: {
    connectToSockets(s) {
      let services = s.getters.allServices.map((a) => ({ ...a }));
      for (let s in services) {
        services[s].ws = new WebSocket(
          `ws://localhost:8080/services/${services[s].url}/`
        );
      }
      console.log("sockets created");
      s.commit("setServices", services);
    },
  },
  modules: {
    // socket
  },
});