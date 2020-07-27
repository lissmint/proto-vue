<template>
  <div id="app">
    <div v-if="loaded">
      <Sidebar />
      <div class="w3-main" style="margin-left:350px">
        <router-view />
        <Error :msg="message" v-if="error" @close="error = !error" />
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'app',
  components: {
    Loader,
    Sidebar
  },
  data: () => ({
    error: false,
    message: ''
  }),
  computed: {
    loaded() {
      return (
        this.$store.getters.responses >= this.$store.getters.allServices.length
      )
    },
    address() {
      return this.$store.getters.wsAddress
    }
  },
  created() {
    let ws = new WebSocket(this.address)
    let vm = this
    ws.onopen = function() {
      vm.$store.dispatch('connectToSockets')
      ws.close()
    }

    ws.onclose = function(event) {
      if (!event.wasClean) {
        vm.$store.commit('setAvailable', false)
        vm.error = true
        vm.message = 'Unable to connect to server. Please try again later.'
      }
    }
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
