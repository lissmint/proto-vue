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
      <router-link to="/"
        ><h1 class="w3-wide"><b>NAINT</b></h1></router-link
      >
    </div>

    <!--  Step 1. Add new tab and item to menu. -->
    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('tts')"
      v-if="tts.length"
    >
      Text to Speech <i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="tts" :family="tts" v-if="tts.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('asr')"
      v-if="asr.length"
    >
      Automatic Speech Recognition
      <i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="asr" :family="asr" v-if="asr.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('qa')"
      v-if="qa.length"
    >
      Question Answering <i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="qa" :family="qa" v-if="qa.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('nmt')"
      v-if="nmt.length"
    >
      Neural Machine Translation
      <i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="nmt" :family="nmt" v-if="nmt.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('mig')"
      v-if="mig.length"
    >
      Mutial Information GuCh<i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="mig" :family="mig" v-if="mig.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('mlm')"
      v-if="mlm.length"
    >
      MaLaMEDA MI<i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="mlm" :family="mlm" v-if="mlm.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('semsim')"
      v-if="semsim.length"
    >
      Sentence Embedding Similarity<i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="semsim" :family="semsim" v-if="semsim.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('spp')"
      v-if="spp.length"
    >
      Syntax Extraction from Attention Layers<i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="spp" :family="spp" v-if="spp.length" />

    <div
      class="item w3-bar-item w3-button w3-border-bottom"
      @click="showModels('tg')"
      v-if="tg.length"
    >
      Trump Tweet Generator <i class="fa fa-caret-down"></i>
    </div>
    <NavLinks name="tg" :family="tg" v-if="tg.length" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavLinks from "@/components/NavLinks";

export default {
  components: {
    NavLinks,
  },
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
    w3_close() {
      document.getElementById("mySidebar").style.display = "none";
    },
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
  },
  mounted() {},
};
</script>
