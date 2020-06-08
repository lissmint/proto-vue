<template>
  <div>
    <AppHeader :title="service.title" />
    <div class="w3-container model" v-if="!service.active">
      <h2>
        {{ service.title }} is currently unavailable. Please check in later.
      </h2>
    </div>
    <div class="w3-container model" v-else>
      <h2>Choose wav audio and Run.</h2>

      <p>
        <input
          type="file"
          accept="audio/wav"
          value="Upload"
          @change="onFileChange"
          class="w3-input w3-teal"
          :disabled="isRunning"
          ref="fileInput"
        />
      </p>

      <p>
        <button
          class="w3-button w3-teal"
          @click="sendData"
          :disabled="isRunning || !rawData"
        >
          Run
        </button>
        <i
          class="fa fa-spinner w3-spin w3-center"
          style="font-size:20px;"
          v-if="isRunning"
        ></i>
      </p>

      <div class="w3-card-4" style="max-width: 900px;" v-if="result">
        <header class="w3-container w3-light-gray">
          <h2>Result</h2>
        </header>

        <div class="w3-container">
          <p id="asr-w2l-answer">{{ receivedData.text }}</p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p class="w3-panel w3-leftbar w3-border-teal">
            {{ fileName }}
          </p>
        </footer>
      </div>
    </div>
    <Error :msg="receivedData.msg" v-if="error" />
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'asr-page',
  mixins: [servicePage],
  data: () => ({
    rawData: null,
    fileName: ''
  }),
  methods: {
    // handle file upload
    onFileChange(e) {
      var file = e.target.files || e.dataTransfer.files
      if (!file.length) return
      this.createFile(file[0])
    },
    createFile(file) {
      var reader = new FileReader()
      this.rawData = new ArrayBuffer()
      this.assignFileName(this.$refs.fileInput.value)

      var vm = this
      reader.onload = e => {
        vm.rawData = e.target.result
      }

      reader.readAsArrayBuffer(file)
    },
    assignFileName(path) {
      let name = path.split('\\')
      this.fileName = name[name.length - 1]
    },
    // handle run
    sendData() {
      this.service.ws.binaryType = 'arraybuffer'
      this.time = Date.now()
      this.isRunning = true
      this.result = false
      this.error = false
      this.onMessage()
      this.service.ws.send(this.rawData)
    }
  },
  beforeRouteUpdate(to, from, next) {
    //reset component data fields
    this.rawData = null
    this.fileName = ''
    next()
  }
}
</script>
