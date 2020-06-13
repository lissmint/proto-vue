<template>
  <div>
    <!-- ШАПКА -->
    <AppHeader :title="service.title" />

    <div class="w3-container model" v-if="!service.active">
      <h2>
        {{ service.title }} is currently unavailable. Please check in later.
      </h2>
    </div>
    <!-- ОСНОВНОЙ КОНТЕЙНЕР -->
    <div class="w3-container model" v-else>
      <h2>Input context, question and Run</h2>
      <!-- ПРИМЕРЫ -->
      <h2>Sample sentences</h2>
      <div
        class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
        style="resize:none;   max-width: 900px;"
      >
        <p>Then take [MASK] crown of flowers.</p>
      </div>

      <div
        class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
        style="resize:none;   max-width: 900px;"
      >
        <p>
          It would be [MASK] wrong in you to repay their care with cruelty and
          pain.
        </p>
      </div>

      <div
        class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
        style="resize:none;   max-width: 900px;"
      >
        <p>
          Sometimes he swam a little way and sometimes he ran a [MASK] way along
          the bank, and sometimes he jumped from stone to stone.
        </p>
      </div>

      <h2>Input sentence and Run</h2>
      <TextInput
        placeholder="Input your text here"
        :maxlength="service.options.maxlenght"
        :rows="6"
        :disabled="isRunning"
        v-model="sentence"
      />

      <RunBtn
        :disabled="isRunning || !sentence /* условия отключения кнопки */"
        :isRunning="isRunning"
        @run="sendData"
      />

      <!-- ВЫВОД РЕЗУЛЬТАТА -->
      <div id="mi-mlmb-container" v-if="result">
        <h2>Mutial Information</h2>
        <div class="slidecontainer">
          <input
            type="range"
            min="300"
            max="1500"
            value="450"
            step="150"
            class="slider"
            id="mi-mlmb-myRange"
          />
        </div>
        <div
          id="mi-mlmb-plot-container"
          style="max-height: 1500px; max-width: 900px;"
        ></div>
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
    // данные страницы
    sentence: ''
  }),
  computed: {
    // формируем объект userData
    userData() {
      return {
        event: this.service.url,
        sentence: this.sentence
      }
    }
  },
  //reset component data fields
  beforeRouteUpdate(to, from, next) {
    this.sentence = ''
    next()
  }
}
</script>
