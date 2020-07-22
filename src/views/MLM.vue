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
      <div v-if="result && !isRunnig">
        <!-- container-->
        <h2>Mutial Information</h2>
        <div class="slidecontainer">
          <input
            type="range"
            min="300"
            max="1500"
            value="450"
            step="150"
            class="slider"
            @input="setSize"
          />
        </div>
        <div style="max-height: 1500px; max-width: 900px;">
          <highcharts
            v-for="(chart, i) in charts"
            :key="i"
            :options="chart"
            class="mi-heatmap"
          />
        </div>
        <!-- plot container-->
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
  name: 'mlm-page',
  mixins: [servicePage],
  data: () => ({
    // данные страницы
    sentence: '',
    charts: []
  }),
  components: {
    highcharts: Chart
  },
  computed: {
    // формируем объект userData
    userData() {
      return {
        event: this.service.url,
        sentence: this.sentence
      }
    }
  },
  methods: {
    setSize(event) {
      for (chart in this.charts) {
        chart.chart.width = even.target.value
        chart.chart.height = even.target.value - 50
      }
    },
    drawChart(data, key) {
      data.mi = data.plots[key].data.map(function(row, i) {
        return row.map(function(col, j) {
          return [j, i, col]
        })
      })

      dat = []
      for (var i = 0; i < data.mi.length; i++) {
        dat = dat.concat(data.mi[i])
      }

      this.charts.push({
        chart: {
          type: 'heatmap',
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1,
          width: 450,
          height: 400
        },

        title: {
          text: key
        },

        xAxis: {
          categories: data.plots[key].x,
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
          categories: data.plots[key].y,
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

            for (key in vm.receivedData.plots) {
              vm.drawChart(vm.receivedData, key)
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
    this.sentence = ''
    this.charts = []
    next()
  }
}
</script>
