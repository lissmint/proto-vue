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
        :disabled="isRunning || !audio || !isValid"
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
    <transition name="fade">
      <Error
        :msg="receivedData.msg"
        v-if="error && !isRunning"
        @close="error = !error"
      />
    </transition>
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'asr-page',
  mixins: [servicePage],
  data: () => ({
    audio: null,
    fileName: '',
    fileSize: null,
    maxFileSize: 7
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
      this.error = false
      this.createFile(file[0])
    },
    createFile(file) {
      var reader = new FileReader()
      this.extractFileInfo(file)

      var vm = this
      reader.onload = e => {
        vm.audio = e.target.result.split(',')[1]
      }

      reader.readAsDataURL(file)
    },
    extractFileInfo(file) {
      this.fileSize = (file.size / (1024 * 1024)).toFixed(2)
      if (this.fileSize > this.maxFileSize) {
        this.receivedData = {
          msg: `File size exceeds limit. Select a file with a maximum size of ${this.maxFileSize}MB. Selected file size: ${this.fileSize}MB.`
        }
        this.error = true
        this.isValid = false
        return
      }

      if (file.name.split('.')[1].toLowerCase() != 'wav') {
        this.receivedData = {
          msg: `Please select a wav file.`
        }
        this.error = true
        this.isValid = false
      } else {
        this.fileName = file.name
        this.isValid = true
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    //reset component data fields
    this.audio = null
    this.fileName = ''
    next()
  }
}
</script>
