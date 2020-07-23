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
        maxlength="20000"
        :wordcount="service.options.wordLimit"
        :rows="5"
        :disabled="isRunning"
        v-model="text"
        @setValid="setValid"
      />

      <RunBtn
        :disabled="!text || isRunning || !isValid"
        :isRunning="isRunning"
        @run="sendData"
      />

      <Result :receivedData="receivedData" v-if="result && !isRunning">
        <template #main>
          {{ receivedData.translation }}
        </template>
        <template #footer>
          {{ receivedData.en_text }}
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
  name: 'tr-page',
  title: context => `${context.fullName}`,
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
        en_text: this.text.trim()
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
