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
        <h2>Similarity</h2>

        <table class="w3-table-all" ref="table">
          <thead>
            <tr class="w3-border w3-centered w3-teal">
              <th
                colspan="2"
                class="w3-border w3-centered"
                v-for="(token, i) in tokens"
                :key="i"
              >
                {{ token }}
              </th>
            </tr>
          </thead>
          <tr v-for="(row, i) in rows" :key="i">
            <td class="w3-border w3-centered" v-for="(col, j) in row" :key="j">
              {{ col }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <Error :msg="receivedData.msg" v-if="error && !isRunning" />
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'
import { createElement } from 'highcharts'

export default {
  name: 'similarity-page',
  mixins: [servicePage],
  data: () => ({
    sentence: '',
    tokens: [],
    rows: []
  }),
  computed: {
    service() {
      if (this.$route.params)
        return this.$store.getters.allServices.find(
          s => s.url == 'similarity/' + this.$route.params.id
        )
      return null
    },
    userData() {
      return {
        event: this.service.url,
        sentence: this.sentence
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

            vm.receivedData.mi.forEach(function(col, i) {
              debugger
              vm.tokens.push(vm.receivedData.tokens[i])

              col.forEach(function(item, j) {
                if (!vm.rows[j]) {
                  vm.rows.push([])
                }

                vm.rows[j].push(item[0])
                vm.rows[j].push(` ${item[1].toFixed(3)}`)
              })
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
    this.$refs.table.innerHTML = ''
    this.sentence = ''
    next()
  }
}
</script>
