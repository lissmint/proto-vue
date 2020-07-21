import Vue from 'vue'
import Vuex from 'vuex'
import serviceList from '@/serviceList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    responses: 0,
    services: serviceList
  },
  mutations: {
    setActive(state, { url, readyState }) {
      if (readyState == 1) {
        state.services.find(s => s.url == url).active = true
      } else {
        state.services.find(s => s.url == url).active = false
      }
    },
    setServices(state, services) {
      state.services = services
    },
    assignSockets(state, services) {
      state.services.forEach((val, idx, arr) => {
        arr[idx].ws = services[idx].ws
      })
    },
    incResponses(state) {
      state.responses++
    }
  },
  getters: {
    activeServices: state => state.services.filter(serv => serv.active),
    allServices: state => state.services,
    responses: state => state.responses
  },
  actions: {
    sortServices({ commit, state }) {
      commit(
        'setServices',
        state.services.sort(function(a, b) {
          if (a.title > b.title) {
            return 1
          }
          if (a.title < b.title) {
            return -1
          }
          return 0
        })
      )
    },
    connectToSockets({ commit, dispatch, state }) {
      dispatch('sortServices')
      let services = state.services.map(a => ({ ...a }))
      for (let s in services) {
        services[s].ws = new WebSocket(
          // `ws://localhost:80/services/${services[s].url}/`
          // `ws://91.238.230.147:8209/services/${services[s].url}/`
          'wss://echo.websocket.org'
        )
        dispatch('subscribeSocket', {
          socket: services[s].ws,
          url: services[s].url
        })
      }
      commit('assignSockets', services)
    },
    subscribeSocket({ commit }, { socket, url }) {
      socket.onopen = function(e) {
        console.log(`[open] Соединение ${url} установлено`)
        commit('setActive', {
          url,
          readyState: socket.readyState
        })
        commit('incResponses')
      }

      socket.onclose = function(event) {
        if (event.wasClean) {
          console.log(
            `[close] Соединение ${url} закрыто чисто, код=${event.code} причина=${event.reason}`
          )
        } else {
          console.log(
            `[close] Соединение ${url} прервано, code = ${event.code}`
          )
        }
        commit('setActive', {
          url,
          readyState: socket.readyState
        })
      }

      socket.onerror = function(error) {
        console.log(`[error] ${error.message}`)
        commit('incResponses')
      }
    }
  }
})
