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

    <NavCategory
      title="Text To Speech"
      :available="tts.length"
      familyName="tts"
      @showModels="showModels"
    />
    <NavLinks name="tts" :services="tts" v-if="tts.length" />

    <NavCategory
      title="Automatic Speech Recognition"
      :available="asr.length"
      familyName="asr"
      @showModels="showModels"
    />
    <NavLinks name="asr" :services="asr" v-if="asr.length" />

    <NavCategory
      title="Question Answering"
      :available="qa.length"
      familyName="qa"
      @showModels="showModels"
    />
    <NavLinks name="qa" :services="qa" v-if="qa.length" />

    <NavCategory
      title="Neural Machine Translation"
      :available="nmt.length"
      familyName="nmt"
      @showModels="showModels"
    />
    <NavLinks name="nmt" :services="nmt" v-if="nmt.length" />

    <NavCategory
      title="Mutial Information GuCh"
      :available="mig.length"
      familyName="mig"
      @showModels="showModels"
    />
    <NavLinks name="mig" :services="mig" v-if="mig.length" />

    <NavCategory
      title="MaLaMEDA MI"
      :available="mlm.length"
      familyName="mlm"
      @showModels="showModels"
    />
    <NavLinks name="mlm" :services="mlm" v-if="mlm.length" />

    <NavCategory
      title="Sentence Embedding Similarity"
      :available="semsim.length"
      familyName="semsim"
      @showModels="showModels"
    />
    <NavLinks name="semsim" :services="semsim" v-if="semsim.length" />

    <NavCategory
      title="Syntax Extraction from Attention Layers"
      :available="spp.length"
      familyName="spp"
      @showModels="showModels"
    />
    <NavLinks name="spp" :services="spp" v-if="spp.length" />

    <NavCategory
      title="Trump Tweet Generator"
      :available="tg.length"
      familyName="tg"
      @showModels="showModels"
    />
    <NavLinks name="tg" :services="tg" v-if="tg.length" />
  </div>
</template>

<script>
import NavLinks from "@/components/NavLinks";
import NavCategory from "@/components/NavCategory";

export default {
  components: {
    NavCategory,
    NavLinks,
  },
  computed: {
    tts() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "tts"
      );
    },
    asr() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "asr"
      );
    },
    qa() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "qa"
      );
    },
    nmt() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "nmt"
      );
    },
    mig() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "mig"
      );
    },
    mlm() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "mlm"
      );
    },
    semsim() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "semsim"
      );
    },
    spp() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "spp"
      );
    },
    tg() {
      return this.$store.getters.activeServices.filter(
        (serv) => serv.familyName == "tg"
      );
    },
  },
  methods: {
    w3_close() {
      document.getElementById("mySidebar").style.display = "none";
    },
    showModels(familyName) {
      var x = document.getElementById(familyName);
      if (!x) return;

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
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.w3-sidebar {
  /* background-color: #333 !important; */
}
</style>
