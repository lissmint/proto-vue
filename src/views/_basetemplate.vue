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
      <!-- ЗДЕСЬ НЕОБХОДИМЫЕ ЭЛЕМЕНТЫ ВВОДА -->

      <RunBtn
        :disabled="
          isRunning || !question || !fragment /* условия отключения кнопки */
        "
        :isRunning="isRunning"
        @run="sendData"
      />

      <!-- ВЫВОД РЕЗУЛЬТАТА -->
      <Result :receivedData="receivedData" v-if="result">
        <template #main>
          <!-- СОДЕРЖАНИЕ ТЕЛА РЕЗУЛЬТАТА -->
        </template>
        <template #footer>
          <!-- ИНФОРМАЦИЯ В ФУТЕРЕ -->
        </template>
      </Result>
    </div>

    <Error :msg="receivedData.msg" v-if="error && !isRunning" />
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'qa-page',
  mixins: [servicePage],
  data: () => ({
    // данные страницы
    fragment: '',
    question: ''
  }),
  computed: {
    // формируем объект userData
    userData() {
      return {
        event: this.service.url,
        question: this.question,
        fragment: this.fragment
      }
    }
  },
  //reset component data fields
  beforeRouteUpdate(to, from, next) {
    this.fragment = ''
    this.question = ''
    next()
  }
}
</script>
