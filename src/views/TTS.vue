<template>
  <div>
    <AppHeader :title="fullName" />
    <div class="w3-container model" v-if="!service.active">
      <h2>{{ fullName }} is currently unavailable. Please check in later.</h2>
    </div>
    <div class="w3-container model" v-else>
      <h2>Input sentence and Run</h2>
      <p>
        <textarea
          placeholder="Enter text in the input field."
          class="w3-input w3-border"
          style="resize: vertical; max-width: 900px;"
          :maxlength="service.options.maxLength || 2000"
          v-model="text"
          :disabled="loading"
        ></textarea>
        <span
          class="w3-tag w3-light-gray w3-border-bottom w3-border-left w3-border-right"
          >{{ text.length }} / {{ service.options.maxLength || 2000 }}</span
        >
      </p>

      <p>
        <button
          class="w3-button w3-teal"
          @click="sendData()"
          ref="btn"
          :disabled="!text.length || loading"
        >
          Run
        </button>
        <i
          v-if="loading"
          class="fa fa-spinner w3-spin w3-center"
          style="font-size:20px;"
        ></i>
      </p>

      <div class="w3-card-4" style="max-width: 900px;">
        <header class="w3-container w3-light-gray">
          <h2>Result</h2>
        </header>

        <div class="w3-container">
          <p>
            <audio
              style="max-width:95%;"
              id="tts-t2wlj-audio"
              controls
              src="/t2w/audio/default.wav"
              v-if="result"
            ></audio>
          </p>
        </div>

        <footer class="w3-container w3-light-gray" v-if="!result">
          <p class="w3-panel w3-leftbar w3-border-teal" v-if="!text.length">
            Enter text in the input field.
          </p>
          <p class="w3-panel w3-leftbar w3-border-teal" v-else-if="text.length">
            Press "Run"
          </p>
          <p class="w3-panel w3-leftbar w3-border-teal" v-else-if="loading">
            The result audio is loading
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tts-page",
  props: ["service"],
  data: () => ({
    text: "",
    result: false,
    error: false,
    loading: false,
    data: null,
  }),
  watch: {
    stateData() {
      if (this.stateData != null) {
        this.loading = false;
        this.result = true;
        this.data = this.stateData;
        let payload = {
          url: this.service.url,
          data: null,
        };
        this.$store.commit("setDataByUrl", payload);
      }
    },
  },
  computed: {
    stateData() {
      return this.$store.getters.getDataByUrl(this.service.url);
    },
    fullName() {
      let name = this.service.title;
      this.service.tags.forEach((item) => (name += " " + item));
      return name;
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.text = "";
    this.result = false;
    this.error = false;
    this.loading = false;
    this.data = "";
    next();
  },
  methods: {
    async sendData() {
      this.loading = true;
      this.result = false;
      this.service.ws.send(this.text);
    },
    receiveMessage() {},
  },
};
</script>
