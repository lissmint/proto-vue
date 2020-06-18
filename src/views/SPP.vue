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
      <div>
        <div
          class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
          style="resize:none;   max-width: 900px;"
        >
          <p>The fat ugly smelly cat ate my uncle.</p>
        </div>

        <div
          class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
          style="resize:none;   max-width: 900px;"
        >
          <p>
            My sister works as a guide in Moscow and sees a lot of tourists.
          </p>
        </div>

        <div
          class="w3-panel w3-pale-blue w3-leftbar w3-border-blue"
          style="resize:none;   max-width: 900px;"
        >
          <p>Misha throws water at Masha and Masha throws water at Misha.</p>
        </div>
      </div>

      <h2>Input sentence and Run</h2>
      <TextInput
        placeholder="Input your sentence here"
        :maxlength="service.options.maxLength /* 2000*/"
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
      <div v-show="result && !isRunning">
        <canvas ref="canvas" width="0" height="100"> </canvas>
        <div>
          <p v-for="dist in distances" :key="dist">{{ dist }}</p>
        </div>
      </div>
    </div>

    <Error :msg="receivedData.msg" v-if="error && !isRunning" />
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'spp-page',
  mixins: [servicePage],
  data: () => ({
    // данные страницы
    sentence: '',
    distances: []
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
  methods: {
    drawToken(token, coord, ct) {
      ct.font = '20px Arial'
      ct.fillText(token, coord.x, coord.y)
    },
    calculateTokensWidth(tokens, ct) {
      ct.font = '20px Arial'
      let result = []

      for (let i = 0; i < tokens.length; i++) {
        result[i] = Math.floor(ct.measureText(tokens[i]).width) + 10
      }

      return result
    },
    drawEdge(edge, tokensWidth, step, ct) {
      let j = 0
      let start = 0
      let finish = 0
      let baseHeight = 50

      for (j = 0; j < tokensWidth.length; j++) {
        if (j < edge[0]) {
          start += tokensWidth[j]
        }

        if (j < edge[1]) {
          finish += tokensWidth[j]
        }

        if (j === edge[0]) {
          start += Math.floor(tokensWidth[j] / 2) + step * 2
        }

        if (j === edge[1]) {
          finish += Math.floor(tokensWidth[j] / 3) + step * 2
        }
      }

      ct.strokeStyle = '#FF0000'
      ct.moveTo(start, baseHeight)
      ct.lineTo(start, baseHeight + step * 10)
      ct.lineTo(finish, baseHeight + step * 10)
      ct.lineTo(finish, baseHeight)
      ct.stroke()
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

            const reducer = (accumulator, currentValue) =>
              accumulator + currentValue

            let canvas = vm.$refs.canvas
            let ctx = canvas.getContext('2d')
            ctx.font = '20px Arial'

            // let tokens = ['The','fat','ugly','smelly','cat','ate','my','uncle.']
            let tokens = vm.receivedData.tokens
            let tokensWidth = vm.calculateTokensWidth(tokens, ctx)

            canvas.width = tokensWidth.reduce(reducer) + 50

            let coordinates = { x: 0, y: 50 }

            let i = 0
            for (i = 0; i < tokens.length; i++) {
              vm.drawToken(tokens[i], coordinates, ctx)
              coordinates.x += tokensWidth[i]
            }

            // let edges = [[1, 2],[5, 7],[3, 4],[2, 3], [4, 5],[0, 4],[6, 7]]
            let edges = vm.receivedData.edges
            edges.sort(function(a, b) {
              return b[0] - b[1] - (a[0] - a[1])
            })

            let step = 0
            let diff = 0
            for (i = 0; i < edges.length; i++) {
              if (diff !== edges[i][1] - edges[i][0]) {
                diff = edges[i][1] - edges[i][0]
                step += 1
              }

              vm.drawEdge(edges[i], tokensWidth, step, ctx)
            }

            vm.distances = []
            let distances = vm.receivedData.distances
            for (i = 0; i < distances.length; i++) {
              vm.distances.push(distances[i])
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
    const canvas = this.$refs.canvas
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.distances = []
    this.sentence = ''
    next()
  }
}
</script>
