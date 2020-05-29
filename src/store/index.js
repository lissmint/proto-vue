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
        url: "tts1",
      },
      {
        title: "Tacotron 2.1 + WJ",
        familyName: "tts",
        active: true,
        tags: ["EN", "LJ", "BIG"],
        url: "tts2",
      },
      {
        title: "Tacotron 2.1 + WJ",
        familyName: "jvbsdvku",
        active: true,
        tags: ["EN", "LJ", "BIG"],
        url: "tts3",
      }
    ]
  },
  mutations: {
    isActive(state){
      for (let service of state.services){
        service.active = false;
      }
    }
  },
  getters:{
    activeServices: state => {
      return state.services.filter(serv => serv.active)
    }
  },
  actions: {
  },
  modules: {
    socket
  }
})
