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
        :rows="3"
        :disabled="isRunning"
        v-model="text"
      />

      <RunBtn
        :disabled="!text.length || isRunning"
        :isRunning="isRunning"
        @run="sendData"
      />

      <Result :receivedData="receivedData" v-if="result && !isRunning">
        <template #main>
          <audio
            style="max-width:95%;"
            controls
            :src="`data:audio/wav;base64,${receivedData.audio}`"
          ></audio>
          <!-- :src="`${receivedData.audio_dir}${receivedData.audio_name}.wav`" -->
          <!-- :src="`data:audio/wav;base64,${receivedData.audio}`" -->
        </template>
        <template #footer>
          Enter a new text and press "Run" to try again
        </template>
      </Result>
    </div>
    <Error :msg="receivedData.msg" v-if="error && !isRunning" />
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'tts-page',
  title: context => `${context.fullName}`,
  mixins: [servicePage],
  data: () => ({
    text: ''
  }),
  computed: {
    // get service fullname
    fullName() {
      let name = this.service.title
      this.service.tags.forEach(tag => (name += ' ' + tag))
      return name
    },
    // form userData
    userData() {
      return {
        event: this.service.url,
        text: this.text
      }
    }
  },
  watch: {
    service: {
      deep: true,
      handler() {
        this.$title = `${this.fullName}`
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
