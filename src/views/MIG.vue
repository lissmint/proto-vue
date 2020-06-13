<template>
  <div>
    <AppHeader :title="fullName" />
    <div class="w3-container model" v-if="!service.active">
      <h2>{{ fullName }} is currently unavailable. Please check in later.</h2>
    </div>
    <div
      id="BERT Сlassifier Cleaned Mask Over Mask Contribution GuCh"
      class="w3-container model"
      style="display:none"
    >
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
        maxlength="128"
      />
      <!-- <textarea
      id="mi-cmomgcb-sentence"
      placeholder="Here your sentence"
      class="w3-input w3-border"
      style="resize:none;   max-width: 900px;"
      rows="6"
      maxlength="20000"
    ></textarea>
    <span
      id="mi-cmomgcb-sentence-length"
      class="w3-tag w3-light-gray w3-border-bottom w3-border-left w3-border-right"
      >0/128</span
    > -->
      <!-- </p> -->

      <RunBtn
        :disabled="isRunning || !sentence"
        :isRunning="isRunnig"
        @run="sendData"
      />

      <div id="mi-cmomgcb-container" v-if="result">
        <!-- <p> -->
        <h2>Mutial Information Heatmap</h2>
        <div class="slidecontainer">
          <input
            type="range"
            min="300"
            max="1500"
            value="900"
            step="150"
            class="slider"
            id="mi-cmomgcb-myRange"
          />
        </div>
        <div
          id="mi-cmomgcb-plot-container"
          style="max-height: 1500px; max-width: 1500px;"
        ></div>
        <!-- </p> -->

        <h2>Mutial Information Pairs</h2>

        <table id="mi-cmomgcb-table" class="w3-table-all">
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
  </div>
</template>

<script>
import servicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'mig-page',
  mixins: [servicePage],
  data: () => ({
    sentence: ''
  }),
  computed: {
    fullName() {
      let name = this.service.title
      this.service.tags.forEach(tag => (name += ' ' + tag))
      return name
    },
    userData() {
      return {
        event: this.service.url,
        sentence: this.sentence
      }
    }
  }
}
</script>
