<template>
  <div>
    <AppHeader :title="service.title" />
    <div class="w3-container model" v-if="!service.active">
      <h2>
        {{ service.title }} is currently unavailable. Please check in later.
      </h2>
    </div>
    <div class="w3-container model">
      <h2>Choose wav audio and Run.</h2>

      <p>
        <input
          type="file"
          value="Upload"
          class="w3-input w3-teal"
          :disabled="isRunning"
        />
      </p>

      <p>
        <button
          id="asr-w2l-btn"
          class="w3-button w3-teal"
          :disabled="isRunning"
        >
          Run
        </button>
        <i
          class="fa fa-spinner w3-spin w3-center"
          style="font-size:20px; display: none;"
        ></i>
      </p>

      <div class="w3-card-4" style="max-width: 900px;">
        <header class="w3-container w3-light-gray">
          <h2>Result</h2>
        </header>

        <div class="w3-container">
          <p id="asr-w2l-answer">Answer.</p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p
            id="asr-w2l-card-audioname"
            class="w3-panel w3-leftbar w3-border-teal"
          >
            Audio name.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import ServicePage from '@/mixins/servicePage.mixin'

export default {
  name: 'asr-page',
  mixins: [ServicePage]
}
</script>
