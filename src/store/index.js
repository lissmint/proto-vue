import Vue from 'vue'
import Vuex from 'vuex'
import serviceList from '@/assets/serviceList'

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
    setDataByUrl(state, { url, data }) {
      state.services.find(s => s.url == url).data = data
    },
    assignSockets(state, services) {
      state.services.forEach((val, idx, arr) => {
        arr[idx].ws = services[idx].ws
      })
      state.services.sort(function(a, b) {
        if (a.title > b.title) {
          return 1
        }
        if (a.title < b.title) {
          return -1
        }
        return 0
      })
    },
    incResponses(state) {
      state.responses++
    }
  },
  getters: {
    activeServices: state => state.services.filter(serv => serv.active),
    allServices: state => state.services,
    responses: state => state.responses,
    getDataByUrl: state => url => state.services.find(s => s.url == url).data
  },
  actions: {
    connectToSockets(store) {
      let services = store.getters.allServices.map(a => ({ ...a }))
      for (let s in services) {
        services[s].ws = new WebSocket(
          // `ws://localhost:80/services/${services[s].url}/`
          'wss://echo.websocket.org'
        )

        services[s].ws.onopen = function(e) {
          console.log(`[open] Соединение ${services[s].url} установлено`)
          let payload = {
            url: services[s].url,
            readyState: services[s].ws.readyState
          }
          store.commit('setActive', payload)
          store.commit('incResponses')
        }

        services[s].ws.onmessage = function(event) {
          console.log(`[message] Данные получены с сервера: ${event.data}`)
          let payload = {
            url: services[s].url,
            data: event.data
          }
          store.commit('setDataByUrl', payload)
        }

        services[s].ws.onclose = function(event) {
          if (event.wasClean) {
            console.log(
              `[close] Соединение ${services[s].url} закрыто чисто, код=${event.code} причина=${event.reason}`
            )
          } else {
            console.log('[close] Соединение прервано, code = ' + event.code)
          }
          let payload = {
            url: services[s].url,
            readyState: services[s].ws.readyState
          }
          store.commit('setActive', payload)
        }

        services[s].ws.onerror = function(error) {
          console.log(`[error] ${error.message}`)
          store.commit('incResponses')
        }
      }

      store.commit('assignSockets', services)
    }
  },
  modules: {}
})
