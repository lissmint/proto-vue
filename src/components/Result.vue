<template>
  <div class="w3-card-4" style="max-width: 900px;" v-if="result">
    <header class="w3-container w3-light-gray">
      <h2>Result</h2>
    </header>

    <div class="w3-container">
      <p>
        <audio
          style="max-width:95%;"
          controls
          :src="`${receivedData.audio_dir}${receivedData.audio_name}.wav`"
        ></audio>
      </p>
    </div>

    <footer class="w3-container w3-light-gray">
      <p class="w3-panel w3-leftbar w3-border-teal">
        Enter a new text and press "Run" to try again
      </p>
    </footer>
  </div>
</template>
