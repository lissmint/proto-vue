export default {
  data: () => ({
    result: false,
    error: false,
    isRunning: false,
    receivedData: null,
    time: null
  }),
  computed: {
    service() {
      if (this.$route.params)
        return this.$store.getters.allServices.find(
          s => s.url === this.$route.params.id
        )
      return null
    },
    stateData() {
      return this.$store.getters.getDataByUrl(this.service.url)
    },
    fullName() {
      let name = this.service.title
      this.service.tags.forEach(tag => (name += ' ' + tag))
      return name
    }
  },
  methods: {
    sendData() {
      this.time = Date.now()
      this.isRunning = true
      this.result = false
      this.error = false
      this.onMessage()
      this.service.ws.send(JSON.stringify(this.userData))
    },
    onMessage() {
      let vm = this
      this.service.ws.onmessage = msg => {
        vm.receivedData = JSON.parse(msg.data)

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
