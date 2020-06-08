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

      <TextInput
        placeholder="Enter text in the input field"
        :maxlength="service.options.maxLength"
        :disabled="isRunning"
        v-model="text"
      />
      <TextInput
        placeholder="Enter a question"
        :maxlength="service.options.questionMaxLength"
        :disabled="isRunning"
        v-model="question"
      />

      <p>
        <textarea
          id="qa-qanet-question"
          placeholder="Enter a question."
          class="w3-input w3-border"
          style="resize:none;   max-width: 900px;"
          rows="3"
          maxlength="5000"
        ></textarea>
        <span
          id="qa-qanet-question-length"
          class="w3-tag w3-light-gray w3-border-bottom w3-border-left w3-border-right"
          >0/100</span
        >
      </p>

      <p>
        <button
          class="w3-button w3-teal"
          :disabled="isRunning || !question || !text"
        >
          Run
        </button>
        <i
          class="fa fa-spinner w3-spin w3-center"
          style="font-size:20px;"
          v-if="isRunnig"
        ></i>
      </p>

      <div class="w3-card-4" style="  max-width: 900px;">
        <header class="w3-container w3-light-gray">
          <h2>Result</h2>
        </header>

        <div class="w3-container">
          <p>Answer.</p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p class="w3-panel w3-leftbar w3-border-teal">
            Question.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'qa-page',
  data: () => ({
    text: '',
    question: ''
  }),
  computed: {
    userData() {
      return {
        event: this.service.url,
        question: this.question,
        fragment: this.text
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    //reset component data fields
    this.text = ''
    this.question = ''
    this.userData = null
    next()
  }
}
</script>
