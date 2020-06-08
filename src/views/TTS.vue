<template>
  <div>
    <AppHeader :title="fullName" />
    <div class="w3-container model" v-if="!service.active">
      <h2>{{ fullName }} is currently unavailable. Please check in later.</h2>
    </div>
    <div class="w3-container model" v-else>
      <h2>Input sentence and Run</h2>
      <TextInput
        placeholder="Enter text in the input field"
        :maxlength="service.options.maxLength"
        :disabled="isRunning"
        v-model="text"
      />

      <p>
        <button
          class="w3-button w3-teal"
          @click="sendData()"
          :disabled="!text.length || isRunning"
        >
          Run
        </button>
        <i
          v-if="isRunning"
          class="fa fa-spinner w3-spin w3-center"
          style="font-size:20px;"
        ></i>
      </p>

      <div class="w3-card-4" style="max-width: 900px;" v-if="result">
        <header class="w3-container w3-light-gray">
          <h2>Result</h2>
        </header>

        <div class="w3-container">
          <p>
            <audio
              style="max-width:95%;"
              controls
              :src="`${receivedData.audio_dir}${receivedData.audio_name}.wav`"
            ></audio>
          </p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p class="w3-panel w3-leftbar w3-border-teal">
            Enter a new text and press "Run" to try again
          </p>
        </footer>
      </div>
    </div>
    <Error :msg="receivedData.msg" v-if="error" />
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'tts-page',
  mixins: [servicePage],
  components: {
    TextInput
  },
  data: () => ({
    text: '',
    userData: null
  }),
  watch: {
    text() {
      this.userData = { event: this.service.url, text: this.text }
    }
  },
  beforeRouteUpdate(to, from, next) {
    //reset component data fields
    this.text = ''
    this.userData = null
    next()
  }
}
</script>
