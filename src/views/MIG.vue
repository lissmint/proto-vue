<template>
  <div>
    <AppHeader :title="service.fullTitle" />
    <div class="w3-container model" v-if="!service.active">
      <h2>
        {{ service.fullTitle }} is currently unavailable. Please check in later.
      </h2>
    </div>
    <div class="w3-container model">
      <h2>Sample sentences</h2>
      <div
        class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
        style="resize:none;   max-width: 900px;"
      >
        <p>Mom writes to Dad with chalk on the board.</p>
      </div>

      <div
        class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
        style="resize:none;   max-width: 900px;"
      >
        <p>
          After a time she heard a little pattering of feet in the distance, and
          she hastily dried her eyes to see what was coming.
        </p>
      </div>

      <div
        class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
        style="resize:none;   max-width: 900px;"
      >
        <p>
          For more than a mile up the great main street, crossed in the centre
          of the city, at right angles, by one equally magnificent, at each end
          of which, miles away , appeared , dim and distant over the heads of
          the living stream of passengers, the yellow sand - hills of the
          desert; while at the end of the vista in front of them gleamed the
          blue harbour, through a network possibly this may have been the reason
          why early risers in that locality, during the rainy season, adopted a
          thoughtful habit of body, and seldom lifted their eyes to the rifted
          or india - ink washed skies above them.
        </p>
      </div>

      <h2>Input sentence and Run</h2>
      <TextInput
        placeholder="Input your sentence here"
        rows="6"
        maxlength="20000"
        :wordcount="service.options.wordLimit"
        :disabled="isRunning"
        v-model="sentence"
      />

      <RunBtn
        :disabled="isRunning || !sentence"
        :isRunning="isRunning"
        @run="sendData"
      />

      <div v-if="result && !isRunning">
        <!-- container -->
        <h2>Mutial Information Heatmap</h2>
        <div class="slidecontainer">
          <input
            type="range"
            min="300"
            max="1500"
            value="900"
            step="150"
            class="slider"
            @input="setSize"
          />
          <!-- slider -->
        </div>
        <highcharts
          v-if="result"
          :options="chartOptions"
          class="mi-heatmap"
        ></highcharts>
        <!-- plot-container -->

        <h2>Mutial Information Pairs</h2>

        <table class="w3-table-all">
          <!-- table -->
          <thead>
            <tr class="w3-teal">
              <th>Word 1</th>
              <th>Word 2</th>
              <th>MI</th>
            </tr>
          </thead>
          <tr v-for="(row, i) in rows" :key="i">
            <td v-for="(col, j) in row" :key="j">{{ col }}</td>
          </tr>
        </table>
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
  name: 'mig-page',
  mixins: [servicePage],
  data: () => ({
    sentence: '',
    chartOptions: {},
    rows: []
  }),
  components: {
    highcharts: Chart
  },
  computed: {
    userData() {
      return {
        event: this.service.url,
        sentence: this.sentence
      }
    }
  },
  methods: {
    setSize(event) {
      this.chartOptions.chart.width = event.target.value
      this.chartOptions.chart.height = event.target.value - 50
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

            vm.receivedData.mi = vm.receivedData.mi.map(function(row, i) {
              return row.map(function(col, j) {
                return [j, i, col]
              })
            })

            let data = []
            for (var i = 0; i < vm.receivedData.mi.length; i++) {
              data = data.concat(vm.receivedData.mi[i])
            }

            vm.chartOptions = {
              chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1,
                width: 900,
                height: 850
              },

              title: {
                text: 'MI visualization'
              },

              xAxis: {
                categories: vm.receivedData.tokens_x,
                minPadding: 0,
                maxPadding: 0,
                startOnTick: false,
                endOnTick: false,
                title: {
                  enabled: true,
                  text: vm.receivedData.label_y
                }
              },

              yAxis: {
                categories: vm.receivedData.tokens,
                minPadding: 0,
                maxPadding: 0,
                startOnTick: false,
                endOnTick: false,
                title: {
                  enabled: true,
                  text: vm.receivedData.label_x
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
                  data: data,
                  dataLabels: {
                    enabled: false,
                    color: '#000000'
                  }
                }
              ]
            }

            vm.receivedData.miout.forEach(row => {
              row = row.split(' ')
              row[2] = parseFloat(row[2]).toFixed(3)
              vm.rows.push(row)
            })

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
    this.rows = []
    this.sentence = ''
    this.chartOptions = {}
    next()
  }
}
</script>
