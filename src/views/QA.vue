<template>
  <div>
    <AppHeader :title="service.title" />
    <div class="w3-container model" v-if="!service.active">
      <h2>
        {{ service.title }} is currently unavailable. Please check in later.
      </h2>
    </div>
    <div class="w3-container model" v-else>
      <h2>Input context, question and Run</h2>
      <p>
        <a
          href="https://rajpurkar.github.io/SQuAD-explorer/explore/1.1/dev/Computational_complexity_theory.html"
          target="_blank"
          >Examples</a
        >
      </p>
      <!-- Input -->
      <TextInput
        placeholder="Enter text in the input field"
        maxlength="40000"
        :wordcount="service.options.fragmentWordLimit"
        :rows="6"
        :disabled="isRunning"
        v-model="fragment"
        @setValid="setValid"
      />
      <TextInput
        placeholder="Enter a question"
        maxlength="5000"
        :wordcount="service.options.questionWordLimit"
        :rows="3"
        :disabled="isRunning"
        v-model="question"
        @setValid="setValid"
      />
      <!-- Button and spinner -->
      <RunBtn
        :disabled="isRunning || !question || !fragment || !isValid"
        :isRunning="isRunning"
        @run="sendData"
      />
      <!-- Result Box -->
      <Result :receivedData="receivedData" v-if="result && !isRunning">
        <template #main>
          {{ receivedData.response }}
        </template>
        <template #footer>
          {{ receivedData.question }}
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
  name: 'qa-page',
  mixins: [servicePage],
  data: () => ({
    fragment: '',
    question: ''
  }),
  computed: {
    //form userData
    userData() {
      return {
        event: this.service.url,
        question: this.question.trim(),
        fragment: this.fragment.trim()
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    //reset component data fields
    this.fragment = ''
    this.question = ''
    next()
  }
}
</script>
