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
      <h2>Sample sentences</h2>
      <div
        class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
        style="resize:none;   max-width: 900px;"
      >
        I like my phone.<br />
        Your cellphone looks great.<br />
        Will it snow tomorrow?<br />
        Hurricanes have hit the US.<br />
        How old are you?<br />
        What is your age?
      </div>
      <h2>Input sentences with line breaks and Run</h2>
      <!-- ЗДЕСЬ НЕОБХОДИМЫЕ ЭЛЕМЕНТЫ ВВОДА -->
      <TextInput
        placeholder="Input your sentence here"
        maxlength="20000"
        :wordcount="service.options.wordLimit"
        :rows="6"
        :disabled="isRunning"
        v-model="sentence"
        @setValid="setValid"
      />

      <RunBtn
        :disabled="isRunning || !sentence || !isValid"
        :isRunning="isRunning"
        @run="sendData"
      />

      <!-- ВЫВОД РЕЗУЛЬТАТА -->
      <div v-if="result && !isRunning">
        <!-- container -->
        <h2>Sentence Embedding Similarity</h2>
        <div class="slidecontainer">
          <input
            type="range"
            min="300"
            max="1500"
            :value="width"
            step="150"
            class="slider"
            @input="setSize"
          />
          <!-- slider -->
        </div>
        <div style="max-height: 1500px; max-width: 900px;">
          <highcharts
            v-for="(chart, i) in charts"
            :key="i"
            :options="chart"
            class="mi-heatmap"
          />
        </div>
        <!-- plot-comtainer -->
      </div>
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
import { Chart } from 'highcharts-vue'
import HighCharts from 'highcharts'
import heatmap from 'highcharts/modules/heatmap'

heatmap(HighCharts)

export default {
  name: 'sentsim-page',
  mixins: [servicePage],
  data: () => ({
    // данные страницы
    sentence: '',
    charts: [],
    width: 900,
    height: 850
  }),
  components: {
    highcharts: Chart
  },
  computed: {
    // формируем объект userData
    userData() {
      return {
        event: this.service.url,
        sentences: this.sentence.split('\n').filter(function(item) {
          return item.length > 3
        })
      }
    }
  },
  methods: {
    setSize(event) {
      this.width = event.target.value
      this.height = this.width - 50
      for (let chart of this.charts) {
        chart.chart.width = this.width
        chart.chart.height = this.height
      }
    },
    sendData() {
      this.time = Date.now()
      this.isRunning = true
      this.result = false
      this.error = false
      this.onMessage()

      if (this.userData.sentences.length < 2) {
        this.isRunning = false
        this.receivedData = {
          msg: `More than 1 sentence is expected, but given ${this.userData.sentences.length}!`
        }
        this.error = true
        return
      }

      this.service.ws.send(JSON.stringify(this.userData))
    },
    drawChart(data, key) {
      data.mi = data.map(function(row, i) {
        return row.map(function(col, j) {
          return [j, i, col]
        })
      })

      var indexes = new Array(data.length)
      for (let i = 0; i < data.length; i++) {
        indexes[i] = i
      }

      let dat = []
      for (var i = 0; i < data.mi.length; i++) {
        dat = dat.concat(data.mi[i])
      }

      this.charts.push({
        chart: {
          width: this.width,
          height: this.height,
          type: 'heatmap',
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1
        },

        title: {
          text: 'Similarity Matrix'
        },

        xAxis: {
          categories: indexes,
          minPadding: 0,
          maxPadding: 0,
          startOnTick: false,
          endOnTick: false,
          title: {
            enabled: false,
            text: 'x'
          }
        },

        yAxis: {
          categories: indexes,
          minPadding: 0,
          maxPadding: 0,
          startOnTick: false,
          endOnTick: false,
          title: {
            enabled: false,
            text: 'y'
          }
        },

        colorAxis: {
          minColor: '#003399',
          maxColor: '#e6ebf5'
        },

        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
        },

        tooltip: {
          formatter: function() {
            return (
              'x:' +
              this.series.xAxis.categories[this.point.x] +
              '<br>y:' +
              this.series.yAxis.categories[this.point.y] +
              '<br>z:' +
              this.point.value +
              ''
            )
          }
        },

        series: [
          {
            name: 'Sales per employee',
            turboThreshold: 100000,
            borderWidth: 0.2,
            data: dat,
            dataLabels: {
              enabled: false,
              color: '#000000'
            }
          }
        ]
      })
    },
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
            console.log(vm.receivedData)

            vm.drawChart(
              vm.receivedData.sim_matrix,
              'Similarity Matrix ' + vm.service.url
            )
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
    this.width = 900
    this.height = 850
    this.sentence = ''
    this.charts = []
    next()
  }
}
</script>
