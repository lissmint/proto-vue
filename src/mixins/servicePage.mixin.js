export default {
  title: context => `${context.service.title}`,
  data: () => ({
    result: false,
    error: false,
    isRunning: false,
    receivedData: null,
    time: null
  }),
  computed: {
    // get selected service data by url
    service() {
      if (this.$route.params)
        return this.$store.getters.allServices.find(
          s => s.url === this.$route.params.id
        )
      return null
    }
  },
  watch: {
    service: {
      deep: true,
      handler() {
        this.$title = `${this.service.title}`
      }
    }
  },
  methods: {
    //handle Run
    sendData() {
      this.time = Date.now()
      this.isRunning = true
      this.result = false
      this.error = false
      this.onMessage()
      this.service.ws.send(JSON.stringify(this.userData))
    },
    //handle websocket onmessage event
    onMessage() {
      let vm = this
      this.service.ws.onmessage = msg => {
        try {
          vm.receivedData = JSON.parse(msg.data)
        } catch (e) {
          console.error(e)
          console.log('received data:', msg)
          vm.receivedData = {
            msg: 'Something went wrong'
          }
          vm.error = true
          vm.isRunning = false
          return
        }

        switch (vm.receivedData.event) {
          case 'error':
            vm.error = true
            break

          case 'success':
            vm.result = true
            console.log(`Success with time: ${(Date.now() - vm.time) / 1000} s`)
            break

          case 'default':
            console.log('default')
            break
        }

        vm.isRunning = false
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    // reset mixin data fields
    this.result = false
    this.error = false
    this.isRunning = false
    this.receivedData = null
    this.time = null
    next()
  }
}
