<template>
  <div
    class="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left w3-light-gray"
    style="width:350px;"
    id="mySidebar"
  >
    <button
      class="w3-bar-item w3-button w3-large w3-hide-large"
      @click="w3_close()"
    >
      Close &times;
    </button>
    <div class="w3-container w3-border-bottom w3-center">
      <h1 class="w3-wide"><b>NAINT</b></h1>
    </div>

    <!--  Step 1. Add new tab and item to menu. -->
    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('tts')"
    >
      Text to Speech <i class="fa fa-caret-down"></i>
    </div>
    <div id="tts" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in tts"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
      >
        <span @click="setService(service)">
          {{ service.title }}
          <span
            class="w3-tag w3-small w3-teal"
            v-for="(servicetag, i) in service.tags"
            :key="i"
            >{{ servicetag }}</span
          >
        </span>
      </router-link>
    </div>
    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('asr')"
    >
      Automatic Speech Recognition
      <i class="fa fa-caret-down"></i>
    </div>
    <div id="asr" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in asr"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('qa')"
    >
      Question Answering <i class="fa fa-caret-down"></i>
    </div>
    <div id="qa" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in qa"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('nmt')"
    >
      Neural Machine Translation
      <i class="fa fa-caret-down"></i>
    </div>
    <div id="nmt" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in nmt"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>
    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('mig')"
    >
      Mutial Information GuCh<i class="fa fa-caret-down"></i>
    </div>
    <div id="mig" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in mig"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('mlm')"
    >
      MaLaMEDA MI<i class="fa fa-caret-down"></i>
    </div>
    <div id="mlm" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in mlm"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('semsim')"
    >
      Sentence Embedding Similarity<i class="fa fa-caret-down"></i>
    </div>
    <div id="semsim" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in semsim"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('spp')"
    >
      Syntax Extraction from Attention Layers<i class="fa fa-caret-down"></i>
    </div>
    <div id="spp" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in spp"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('tg')"
    >
      Trump Tweet Generator <i class="fa fa-caret-down"></i>
    </div>
    <div id="tg" class="w3-hide w3-white w3-card-4">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in tg"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
        >{{ service.title }}
        <span
          class="w3-tag w3-small w3-teal"
          v-for="(servicetag, i) in service.tags"
          :key="i"
          >{{ servicetag }}</span
        ></router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["activeServices"]),
    tts: function() {
      return this.activeServices.filter((serv) => serv.familyName == "tts");
    },
    asr: function() {
      return this.activeServices.filter((serv) => serv.familyName == "asr");
    },
    qa: function() {
      return this.activeServices.filter((serv) => serv.familyName == "qa");
    },
    nmt: function() {
      return this.activeServices.filter((serv) => serv.familyName == "nmt");
    },
    mig: function() {
      return this.activeServices.filter((serv) => serv.familyName == "mig");
    },
    mlm: function() {
      return this.activeServices.filter((serv) => serv.familyName == "mlm");
    },
    semsim: function() {
      return this.activeServices.filter((serv) => serv.familyName == "semsim");
    },
    spp: function() {
      return this.activeServices.filter((serv) => serv.familyName == "spp");
    },
    tg: function() {
      return this.activeServices.filter((serv) => serv.familyName == "tg");
    },
  },
  methods: {
    w3_open() {
      document.getElementById("mySidebar").style.display = "block";
    },
    w3_close() {
      document.getElementById("mySidebar").style.display = "none";
    },

    // openModel(modelName) {
    //   var i;
    //   var x = document.getElementsByClassName("model");
    //   document.getElementById("model-name").innerText = modelName;
    //   for (i = 0; i < x.length; i++) {
    //     x[i].style.display = "none";
    //   }
    //   document.getElementById(modelName).style.display = "block";
    // },
    showModels(familyName) {
      var x = document.getElementById(familyName);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-light-gray";
      } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className = x.previousElementSibling.className.replace(
          " w3-light-gray",
          ""
        );
      }
    },
    setService(service) {
      this.$store.commit("setSelected", service);
    },
  },
  mounted() {},
};
</script>
