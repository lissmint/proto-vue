<template>
  <div>
    <AppHeader :title="fullName" />
    <div class="w3-container model" v-if="!service.active">
      <h2>{{ fullName }} is currently unavailable. Please check in later.</h2>
    </div>
    <div class="w3-container model" v-else>
      <h2>Input sentence and Run</h2>
      <TextInput
        placeholder="Enter text in the input field"
        :maxlength="service.options.maxLength"
        :disabled="loading"
        v-model="text"
      />

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
              controls
              :src="`${data.audio_dir}${data.audio_name}.wav`"
            ></audio>
          </p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p class="w3-panel w3-leftbar w3-border-teal">
            Enter a new message and press "Run" to try again
          </p>
        </footer>
      </div>

      <Error :msg="data.msg" v-if="error" />
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import Error from "@/components/Error.vue";

export default {
  name: "tts-page",
  components: {
    TextInput,
    Error,
  },
  props: ["service"],
  data: () => ({
    text: "",
    result: false,
    error: false,
    loading: false,
    data: null,
    time: null,
  }),
  computed: {
    stateData() {
      return this.$store.getters.getDataByUrl(this.service.url);
    },
    fullName() {
      let name = this.service.title;
      this.service.tags.forEach((tag) => (name += " " + tag));
      return name;
    },
  },
  watch: {
    stateData() {
      if (this.stateData) {
        this.data = JSON.parse(this.stateData);
        switch (this.data.event) {
          case "error":
            this.showError();
            break;

          case "success":
            this.result = true;
            console.log(
              `Success with time: ${(Date.now() - this.time) / 1000} s`
            );
            break;

          case "default":
            console.log("default");
            break;
        }
        this.loading = false;

        let payload = {
          url: this.service.url,
          data: null,
        };
        this.$store.commit("setDataByUrl", payload);
      }
    },
  },
  methods: {
    sendData() {
      this.time = Date.now();
      this.loading = true;
      this.result = false;
      this.error = false;
      this.service.ws.send(
        JSON.stringify({
          event: this.service.url,
          text: this.text,
        })
      );
    },
    showError() {
      this.error = true;
      setTimeout(function() {
        this.error = false;
      }, 3000);
    },
    setText(text) {
      this.text = text;
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.text = "";
    this.result = false;
    this.error = false;
    this.loading = false;
    this.data = "";
    this.time = null;
    next();
  },
};
</script>
