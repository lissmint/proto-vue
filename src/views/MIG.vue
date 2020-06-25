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

      <div v-show="result && !isRunning">
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

        <table class="w3-table-all" ref="table">
          <!-- table -->
          <thead>
            <tr class="w3-teal">
              <th>Word 1</th>
              <th>Word 2</th>
              <th>MI</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <Error :msg="receivedData.msg" v-if="error && !isRunning" />
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
    chartOptions: {
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
      }
    }
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
      // return {
      //   event: 'success',
      //   mi: [
      //     [
      //       0,
      //       -0.00725910160690546,
      //       0.0006514485576190054,
      //       0.017605189234018326,
      //       0.005245205946266651,
      //       -0.008197166956961155,
      //       -0.003268792061135173,
      //       0.022953083738684654,
      //       0.009825402870774269,
      //       0.003993632271885872,
      //       0.018585339188575745,
      //       0.0043625193648040295
      //     ],
      //     [
      //       0.0014523385325446725,
      //       0,
      //       0.0020227632485330105,
      //       -0.013451204635202885,
      //       0.018986713141202927,
      //       -0.018186131492257118,
      //       0.0038239751011133194,
      //       0.005030942149460316,
      //       0.012861472554504871,
      //       -6.580640183528885e-5,
      //       -0.0063394661992788315,
      //       0.0022560886573046446
      //     ],
      //     [
      //       -0.0050068930722773075,
      //       -0.006547803059220314,
      //       0,
      //       -0.018734391778707504,
      //       -0.004033075179904699,
      //       -0.009864313527941704,
      //       0.0018660989589989185,
      //       -0.0006584830116480589,
      //       -0.004278826527297497,
      //       -0.00027269613929092884,
      //       0.010137122124433517,
      //       0.005090754013508558
      //     ],
      //     [
      //       0.0025987797416746616,
      //       -0.008689112961292267,
      //       0.011098210699856281,
      //       0,
      //       0.003904513083398342,
      //       0.0029033070895820856,
      //       0.00039547536289319396,
      //       0.021048037335276604,
      //       0.004996332339942455,
      //       -0.0023200588766485453,
      //       0.01772550866007805,
      //       0.000702240620739758
      //     ],
      //     [
      //       -0.0003170392010360956,
      //       -0.0022510525304824114,
      //       -0.003590882057324052,
      //       0.016084061935544014,
      //       0,
      //       -0.00214697839692235,
      //       0.0016868141246959567,
      //       0.007888895459473133,
      //       0.007510257884860039,
      //       0.006414949428290129,
      //       0.007185350637882948,
      //       -0.0013662345008924603
      //     ],
      //     [
      //       0.004418954718858004,
      //       -0.004933915566653013,
      //       0.002485184231773019,
      //       0.014059529639780521,
      //       0.0031475876457989216,
      //       0,
      //       0.001070639817044139,
      //       0.011495751328766346,
      //       0.0358184389770031,
      //       0.0018445602618157864,
      //       0.023129912093281746,
      //       0.000725096499081701
      //     ],
      //     [
      //       -0.0002923390129581094,
      //       -0.0033877193927764893,
      //       0.0020506144501268864,
      //       -0.006590939126908779,
      //       0.003855877323076129,
      //       -0.008584327064454556,
      //       0,
      //       0.009889957495033741,
      //       0.0009855208918452263,
      //       0.005149057134985924,
      //       -0.005000310484319925,
      //       -0.00337559194304049
      //     ],
      //     [
      //       0.000450446066679433,
      //       -0.00995566975325346,
      //       -0.0026348400861024857,
      //       0.042642563581466675,
      //       0.004224506206810474,
      //       0.013070358894765377,
      //       0.0044975862838327885,
      //       0,
      //       0.01010093092918396,
      //       0.004533007275313139,
      //       0.006077336147427559,
      //       0.0018189017428085208
      //     ],
      //     [
      //       0.00125288893468678,
      //       -0.01034725271165371,
      //       -0.006878942251205444,
      //       0.01864699088037014,
      //       -0.0017630824586376548,
      //       0.0036597708240151405,
      //       0.002775572706013918,
      //       0.02254541777074337,
      //       0,
      //       0.01700279861688614,
      //       0.0071832868270576,
      //       1.3326773114386015e-5
      //     ],
      //     [
      //       -0.0006133702117949724,
      //       -0.00014892767649143934,
      //       0.0016832271357998252,
      //       0.007216404192149639,
      //       0.0035019267816096544,
      //       -0.005824328865855932,
      //       0.010158573277294636,
      //       0.010766180232167244,
      //       -0.0018841521814465523,
      //       0,
      //       0.002631842391565442,
      //       0.004252101760357618
      //     ],
      //     [
      //       0.0021344951819628477,
      //       -0.0035226077307015657,
      //       -0.000756736088078469,
      //       0.003979235887527466,
      //       0.003979693166911602,
      //       -0.0001942534145200625,
      //       -0.0023368254769593477,
      //       0.008513839915394783,
      //       0.00428188219666481,
      //       -0.0020301693584769964,
      //       0,
      //       0.001336398534476757
      //     ],
      //     [
      //       -0.0017487123841419816,
      //       -0.0018938948633149266,
      //       -0.0008104682783596218,
      //       0.009555897675454617,
      //       0.0035932951141148806,
      //       -0.002099567325785756,
      //       -0.0020055118948221207,
      //       0.013954577967524529,
      //       0.004926650784909725,
      //       -0.0008271077531389892,
      //       0.018552571535110474,
      //       0
      //     ]
      //   ],
      //   tokens: [
      //     '[CLS]',
      //     'mom',
      //     'writes',
      //     'to',
      //     'dad',
      //     'with',
      //     'chalk',
      //     'on',
      //     'the',
      //     'board',
      //     '.',
      //     '[SEP]'
      //   ],
      //   tokens_x: [
      //     '[CLS]',
      //     'mom',
      //     'writes',
      //     'to',
      //     'dad',
      //     'with',
      //     'chalk',
      //     'on',
      //     'the',
      //     'board',
      //     '.',
      //     '[SEP]'
      //   ],
      //   miout: [
      //     '[CLS] [CLS] 0',
      //     '[CLS] mom -0.00725910160690546',
      //     '[CLS] writes 0.0006514485576190054',
      //     '[CLS] to 0.017605189234018326',
      //     '[CLS] dad 0.005245205946266651',
      //     '[CLS] with -0.008197166956961155',
      //     '[CLS] chalk -0.003268792061135173',
      //     '[CLS] on 0.022953083738684654',
      //     '[CLS] the 0.009825402870774269',
      //     '[CLS] board 0.003993632271885872',
      //     '[CLS] [MASK] 0.018585339188575745',
      //     '[CLS] [MASK] 0.0043625193648040295',
      //     'mom [CLS] 0.0014523385325446725',
      //     'mom mom 0',
      //     'mom writes 0.0020227632485330105',
      //     'mom to -0.013451204635202885',
      //     'mom dad 0.018986713141202927',
      //     'mom with -0.018186131492257118',
      //     'mom chalk 0.0038239751011133194',
      //     'mom on 0.005030942149460316',
      //     'mom the 0.012861472554504871',
      //     'mom board -6.580640183528885e-05',
      //     'mom [MASK] -0.0063394661992788315',
      //     'mom [MASK] 0.0022560886573046446',
      //     'writes [CLS] -0.0050068930722773075',
      //     'writes mom -0.006547803059220314',
      //     'writes writes 0',
      //     'writes to -0.018734391778707504',
      //     'writes dad -0.004033075179904699',
      //     'writes with -0.009864313527941704',
      //     'writes chalk 0.0018660989589989185',
      //     'writes on -0.0006584830116480589',
      //     'writes the -0.004278826527297497',
      //     'writes board -0.00027269613929092884',
      //     'writes [MASK] 0.010137122124433517',
      //     'writes [MASK] 0.005090754013508558',
      //     'to [CLS] 0.0025987797416746616',
      //     'to mom -0.008689112961292267',
      //     'to writes 0.011098210699856281',
      //     'to to 0',
      //     'to dad 0.003904513083398342',
      //     'to with 0.0029033070895820856',
      //     'to chalk 0.00039547536289319396',
      //     'to on 0.021048037335276604',
      //     'to the 0.004996332339942455',
      //     'to board -0.0023200588766485453',
      //     'to [MASK] 0.01772550866007805',
      //     'to [MASK] 0.000702240620739758',
      //     'dad [CLS] -0.0003170392010360956',
      //     'dad mom -0.0022510525304824114',
      //     'dad writes -0.003590882057324052',
      //     'dad to 0.016084061935544014',
      //     'dad dad 0',
      //     'dad with -0.00214697839692235',
      //     'dad chalk 0.0016868141246959567',
      //     'dad on 0.007888895459473133',
      //     'dad the 0.007510257884860039',
      //     'dad board 0.006414949428290129',
      //     'dad [MASK] 0.007185350637882948',
      //     'dad [MASK] -0.0013662345008924603',
      //     'with [CLS] 0.004418954718858004',
      //     'with mom -0.004933915566653013',
      //     'with writes 0.002485184231773019',
      //     'with to 0.014059529639780521',
      //     'with dad 0.0031475876457989216',
      //     'with with 0',
      //     'with chalk 0.001070639817044139',
      //     'with on 0.011495751328766346',
      //     'with the 0.0358184389770031',
      //     'with board 0.0018445602618157864',
      //     'with [MASK] 0.023129912093281746',
      //     'with [MASK] 0.000725096499081701',
      //     'chalk [CLS] -0.0002923390129581094',
      //     'chalk mom -0.0033877193927764893',
      //     'chalk writes 0.0020506144501268864',
      //     'chalk to -0.006590939126908779',
      //     'chalk dad 0.003855877323076129',
      //     'chalk with -0.008584327064454556',
      //     'chalk chalk 0',
      //     'chalk on 0.009889957495033741',
      //     'chalk the 0.0009855208918452263',
      //     'chalk board 0.005149057134985924',
      //     'chalk [MASK] -0.005000310484319925',
      //     'chalk [MASK] -0.00337559194304049',
      //     'on [CLS] 0.000450446066679433',
      //     'on mom -0.00995566975325346',
      //     'on writes -0.0026348400861024857',
      //     'on to 0.042642563581466675',
      //     'on dad 0.004224506206810474',
      //     'on with 0.013070358894765377',
      //     'on chalk 0.0044975862838327885',
      //     'on on 0',
      //     'on the 0.01010093092918396',
      //     'on board 0.004533007275313139',
      //     'on [MASK] 0.006077336147427559',
      //     'on [MASK] 0.0018189017428085208',
      //     'the [CLS] 0.00125288893468678',
      //     'the mom -0.01034725271165371',
      //     'the writes -0.006878942251205444',
      //     'the to 0.01864699088037014',
      //     'the dad -0.0017630824586376548',
      //     'the with 0.0036597708240151405',
      //     'the chalk 0.002775572706013918',
      //     'the on 0.02254541777074337',
      //     'the the 0',
      //     'the board 0.01700279861688614',
      //     'the [MASK] 0.0071832868270576',
      //     'the [MASK] 1.3326773114386015e-05',
      //     'board [CLS] -0.0006133702117949724',
      //     'board mom -0.00014892767649143934',
      //     'board writes 0.0016832271357998252',
      //     'board to 0.007216404192149639',
      //     'board dad 0.0035019267816096544',
      //     'board with -0.005824328865855932',
      //     'board chalk 0.010158573277294636',
      //     'board on 0.010766180232167244',
      //     'board the -0.0018841521814465523',
      //     'board board 0',
      //     'board [MASK] 0.002631842391565442',
      //     'board [MASK] 0.004252101760357618',
      //     '[MASK] [CLS] 0.0021344951819628477',
      //     '[MASK] mom -0.0035226077307015657',
      //     '[MASK] writes -0.000756736088078469',
      //     '[MASK] to 0.003979235887527466',
      //     '[MASK] dad 0.003979693166911602',
      //     '[MASK] with -0.0001942534145200625',
      //     '[MASK] chalk -0.0023368254769593477',
      //     '[MASK] on 0.008513839915394783',
      //     '[MASK] the 0.00428188219666481',
      //     '[MASK] board -0.0020301693584769964',
      //     '[MASK] [MASK] 0',
      //     '[MASK] [MASK] 0.001336398534476757',
      //     '[MASK] [CLS] -0.0017487123841419816',
      //     '[MASK] mom -0.0018938948633149266',
      //     '[MASK] writes -0.0008104682783596218',
      //     '[MASK] to 0.009555897675454617',
      //     '[MASK] dad 0.0035932951141148806',
      //     '[MASK] with -0.002099567325785756',
      //     '[MASK] chalk -0.0020055118948221207',
      //     '[MASK] on 0.013954577967524529',
      //     '[MASK] the 0.004926650784909725',
      //     '[MASK] board -0.0008271077531389892',
      //     '[MASK] [MASK] 0.018552571535110474',
      //     '[MASK] [MASK] 0'
      //   ],
      //   label_x: 'word1',
      //   label_y: 'word2'
      // }
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
              let tr = document.createElement('tr')
              tr.innerHTML = `<td>${row[0]}</td><td>${
                row[1]
              }</td><td>${parseFloat(row[2]).toFixed(3)}</td>`
              vm.$refs.table.append(tr)
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
    this.$refs.table.innerHTML = `<thead>
            <tr class="w3-teal">
              <th>Word 1</th>
              <th>Word 2</th>
              <th>MI</th>
            </tr>
          </thead>`

    this.sentence = ''
    this.chartOptions = {
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
      }
    }
    next()
  }
}
</script>
