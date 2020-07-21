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

      <RunBtn
        :disabled="isRunning || !audio"
        :isRunning="isRunning"
        @run="sendData"
      />

      <Result
        :receivedData="receivedData"
        :fileName="fileName"
        v-if="result && !isRunning"
      >
        <template #main>
          {{ receivedData.text }}
        </template>
        <template #footer>
          {{ fileName }}
        </template>
      </Result>
    </div>
    <Error :msg="receivedData.msg" v-if="error && !isRunning" />
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'asr-page',
  mixins: [servicePage],
  data: () => ({
    audio: null,
    fileName: ''
  }),
  computed: {
    userData() {
      return { audio: this.audio }
    }
  },
  methods: {
    // handle file upload
    onFileChange(e) {
      var file = e.target.files || e.dataTransfer.files
      if (!file.length) return
      this.createFile(file[0])
    },
    createFile(file) {
      var reader = new FileReader()
      // this.audio = new ArrayBuffer()
      this.assignFileName(this.$refs.fileInput.value)

      var vm = this
      reader.onload = e => {
        vm.audio = e.target.result.split(',')[1]
      }

      reader.readAsDataURL(file)
    },
    assignFileName(path) {
      let name = path.split('\\')
      this.fileName = name[name.length - 1]
    }
    // handle run
    // sendData() {
    //   // this.service.ws.binaryType = 'arraybuffer'
    //   this.time = Date.now()
    //   this.isRunning = true
    //   this.result = false
    //   this.error = false
    //   this.onMessage()
    //   this.service.ws.send(this.audio)
    // }
  },
  beforeRouteUpdate(to, from, next) {
    //reset component data fields
    this.audio = null
    this.fileName = ''
    next()
  }
}
</script>
