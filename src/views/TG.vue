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
      <h2>Input start tweet text and Run</h2>
      <!-- ЗДЕСЬ НЕОБХОДИМЫЕ ЭЛЕМЕНТЫ ВВОДА -->
      <TextInput
        placeholder="Input your start tweet here"
        rows="6"
        maxlength="20000"
        :wordcount="service.options.wordLimit"
        :disabled="isRunning"
        v-model="start"
      />

      <Slider
        label="Min Lenght"
        min="5"
        max="100"
        v-model="min"
        v-if="service.options.type == 'tg'"
      />

      <Slider
        label="Choose training steps"
        min="5000"
        max="115000"
        step="5000"
        v-model="steps"
        v-if="service.options.type == 'tggptdai'"
      />

      <!-- select -->

      <Slider
        label="Max"
        :min="service.options.maxLow"
        :max="service.options.maxHigh"
        v-model="max"
      />

      <Slider
        label="Top K"
        min="0"
        max="100"
        step="10"
        v-model="k"
        v-if="service.options.type == 'tggptdai' || 'tggpt'"
      />

      <Slider
        label="Temperature"
        min="0.2"
        max="1.5"
        step="0.1"
        v-model="temperature"
      />

      <RunBtn
        :disabled="isRunning || !start /* условия отключения кнопки */"
        :isRunning="isRunning"
        @run="sendData"
      />

      <!-- ВЫВОД РЕЗУЛЬТАТА -->
      <Result :receivedData="receivedData" v-if="result">
        <template #main>
          <div v-if="receivedData.serviceType == 'tg'">
            {{ receivedData.generated_tweet }}
          </div>

          <ul v-else>
            <li
              class="w3-display-container"
              v-for="(item, i) in receivedData.list"
              :key="i"
            >
              T = {{ item.temperature }} | {{ item.name }} |
              {{ item.tweet }}
              <span
                onclick="this.parentElement.style.display='none'"
                class="w3-button w3-transparent w3-display-right"
                >&times;</span
              >
            </li>
          </ul>
        </template>
        <template #footer>
          <div v-if="service.options.type">
            {{ receivedData.generated_tweet }}
          </div>
        </template>
      </Result>
    </div>

    <Error :msg="receivedData.msg" v-if="error && !isRunning" />
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'
import Slider from '@/components/Slider.vue'

export default {
  name: 'tg-page',
  mixins: [servicePage],
  data: () => ({
    start: '',
    min: 20,
    max: 80,
    steps: 10000,
    temperature: 0.7, //this.service.options.temperature || null,
    k: 0, // this.service.options.k || null,
    selected: '',
    resultList: []
  }),
  components: {
    Slider
  },
  computed: {
    // формируем объект userData
    userData() {
      switch (this.service.options.type) {
        case 'tg':
          return {
            event: this.service.url,
            start: this.start,
            min_len: parseInt(this.min),
            max_len: parseInt(this.max),
            temperature: parseFloat(this.temperature)
          }

        case 'tggpt':
          return {
            event: this.service.url,
            start: this.start,
            max_len: parseInt(this.max),
            temperature: parseFloat(this.temperature),
            run_name: this.personMap[this.selected],
            name: this.selected,
            top_k: parseInt(this.k)
          }

        case 'tggptdai':
          return {
            event: this.service.url,
            start: this.start,
            max_len: parseInt(this.max),
            temperature: parseFloat(this.temperature),
            run_name: '' + this.steps,
            name: '' + this.steps,
            top_k: parseInt(this.k)
          }

        case 'default':
          console.log('default')
          break
      }
    }
  },
  methods: {
    onMessage() {
      let vm = this
      this.service.ws.onmessage = msg => {
        vm.receivedData = JSON.parse(msg.data)

        switch (vm.receivedData.event) {
          case 'error':
            vm.error = true
            break

          case 'success':
            console.log(`Success with time: ${(Date.now() - vm.time) / 1000} s`)

            if (vm.service.type != 'tg') {
              vm.resultList.push({
                temperature: vm.receivedData.temperature,
                name: vm.receivedData.name,
                tweet: vm.receivedData.generated_tweet
              })
            }

            vm.receivedData = {
              ...vm.receivedData,
              list: vm.resultList,
              serviceType: vm.service.options.type
            }

            vm.result = true
            break

          case 'default':
            console.log('default')
            break
        }

        vm.isRunning = false
      }
    }
  },
  //reset component data fields
  beforeRouteUpdate(to, from, next) {
    this.start = ''
    this.min = 20
    this.max = 80
    this.steps = 10000
    this.k = 0
    this.temperature = 0.7
    next()
  }
}
</script>
