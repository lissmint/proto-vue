<template>
  <div>
    <AppHeader :title="fullName" />
    <div class="w3-container model" v-if="!service.active">
      <h2>{{ fullName }} is currently unavailable. Please check in later.</h2>
    </div>
    <div class="w3-container model" v-else>
      <h2>Input text in English language and press Run</h2>
      <TextInput
        placeholder="Enter text in the input field"
        :maxlength="service.options.maxLength"
        :rows="5"
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
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'tr-page',
  mixins: [servicePage],
  data: () => ({
    text: ''
  }),
  computed: {
    fullName() {
      let name = this.service.title
      this.service.tags.forEach(tag => (name += ' ' + tag))
      return name
    },
    userData() {
      return {
        event: this.service.url,
        en_text: this.text
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    //reset component data fields
    this.text = ''
    next()
  }
}
</script>
