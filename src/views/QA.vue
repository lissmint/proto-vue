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
        :maxlength="service.options.maxLength"
        :rows="6"
        :disabled="isRunning"
        v-model="fragment"
      />
      <TextInput
        placeholder="Enter a question"
        :maxlength="service.options.questionMaxLength"
        :rows="3"
        :disabled="isRunning"
        v-model="question"
      />
      <!-- Button and spinner -->
      <RunBtn
        :disabled="isRunning || !question || !fragment"
        :isRunning="isRunning"
        @run="sendData"
      />
      <!-- Result Box -->
      <div class="w3-card-4" style="  max-width: 900px;" v-if="result">
        <header class="w3-container w3-light-gray">
          <h2>Result</h2>
        </header>

        <div class="w3-container">
          <p>{{ receivedData.response }}</p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p class="w3-panel w3-leftbar w3-border-teal">
            {{ receivedData.question }}
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
        question: this.question,
        fragment: this.fragment
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
