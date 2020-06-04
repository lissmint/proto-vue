export default {
  props: ['service'],
  data: () => ({
    result: false,
    error: false,
    isRunning: false,
    receivedData: null,
    time: null
  }),
  computed: {
    stateData() {
      return this.$store.getters.getDataByUrl(this.service.url)
    },
    fullName() {
      let name = this.service.title
      this.service.tags.forEach(tag => (name += ' ' + tag))
      return name
    }
  },
  watch: {
    stateData() {
      if (this.stateData) {
        this.receivedData = JSON.parse(this.stateData)
        switch (this.receivedData.event) {
          case 'error':
            this.error = true
            break

          case 'success':
            this.result = true
            console.log(
              `Success with time: ${(Date.now() - this.time) / 1000} s`
            )
            break

          case 'default':
            console.log('default')
            break
        }
        this.isRunning = false

        let payload = {
          url: this.service.url,
          data: null
        }
        this.$store.commit('setDataByUrl', payload)
      }
    }
  },
  methods: {
    sendData() {
      this.time = Date.now()
      this.isRunning = true
      this.result = false
      this.error = false
      this.service.ws.send(JSON.stringify(this.userData))
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.result = false
    this.error = false
    this.isRunning = false
    this.receivedData = null
    this.time = null
    next()
  }
}
