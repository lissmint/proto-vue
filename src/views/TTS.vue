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

      <div class="w3-card-4" style="max-width: 900px;" v-if="result">
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
            ></audio>
          </p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p class="w3-panel w3-leftbar w3-border-teal">
            Enter text in the input field.
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
    sentText: "",
    result: false,
    error: false,
    loading: false,
    data: "",
  }),
  watch: {
    stateData() {
      if (this.stateData != "") {
        this.loading = false;
        this.result = true;
        this.data = this.stateData;
        this.$store.commit("setData", "");
      }
    },
  },
  computed: {
    stateData() {
      return this.$store.getters.data;
    },
    fullName() {
      let n = this.service.title;
      this.service.tags.forEach((item) => (n += " " + item));
      return n;
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.text = "";
    this.sentText = "";
    this.result = false;
    this.error = false;
    this.loading = false;
    next();
  },
  methods: {
    async sendData() {
      this.loading = true;
      this.result = false;
      this.sentText = this.text;
      this.service.ws.send(this.text);
    },
    receiveMessage() {},
  },
};
</script>
