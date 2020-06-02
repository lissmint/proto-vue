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
    
    <div v-if="loaded">
      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('tts')"
      >
        <span
          >Text to Speech <i class="fa fa-caret-down" v-if="tts.length"></i
        ></span>
        <div
          :class="{ 'led-green': tts.length, 'led-gray': !tts.length }"
        ></div>
      </div>
      <NavLinks name="tts" :family="tts" v-if="tts.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('asr')"
      >
        <span
          >Automatic Speech Recognition
          <i class="fa fa-caret-down" v-if="asr.length"></i
        ></span>
        <div
          class="circle"
          :class="{ 'led-green': asr.length, 'led-gray': !asr.length }"
        ></div>
      </div>
      <NavLinks name="asr" :family="asr" v-if="asr.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('qa')"
      >
        <span>
          Question Answering<i class="fa fa-caret-down" v-if="qa.length"></i
        ></span>
        <div
          class="circle"
          :class="{ 'led-green': qa.length, 'led-gray': !qa.length }"
        ></div>
      </div>
      <NavLinks name="qa" :family="qa" v-if="qa.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('nmt')"
      >
        <span
          >Neural Machine Translation<i
            class="fa fa-caret-down"
            v-if="nmt.length"
          ></i
        ></span>
        <div
          class="circle"
          :class="{ 'led-green': nmt.length, 'led-gray': !nmt.length }"
        ></div>
      </div>
      <NavLinks name="nmt" :family="nmt" v-if="nmt.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('mig')"
      >
        <span
          >Mutial Information GuCh<i
            class="fa fa-caret-down"
            v-if="mig.length"
          ></i
        ></span>
        <div
          class="circle"
          :class="{ 'w3-green': mig.length, 'w3-deep-orange': !mig.length }"
        ></div>
      </div>
      <NavLinks name="mig" :family="mig" v-if="mig.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('mlm')"
      >
        <span
          >MaLaMEDA MI<i class="fa fa-caret-down" v-if="mlm.length"></i
        ></span>
        <div
          class="circle"
          :class="{ 'w3-green': mlm.length, 'w3-deep-orange': !mlm.length }"
        ></div>
      </div>
      <NavLinks name="mlm" :family="mlm" v-if="mlm.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('semsim')"
      >
        <span
          >Sentence Embedding Similarity<i
            class="fa fa-caret-down"
            v-if="semsim.length"
          ></i
        ></span>
        <div
          class="circle"
          :class="{
            'w3-green': semsim.length,
            'w3-deep-orange': !semsim.length,
          }"
        ></div>
      </div>
      <NavLinks name="semsim" :family="semsim" v-if="semsim.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('spp')"
      >
        <div>
          Syntax Extraction from Attention Layers
          <i class="fa fa-caret-down" v-if="spp.length"></i>
        </div>
        <div
          class="circle"
          :class="{ 'w3-green': spp.length, 'w3-deep-orange': !spp.length }"
        ></div>
      </div>
      <NavLinks name="spp" :family="spp" v-if="spp.length" />

      <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels('tg')"
      >
        <span
          >Trump Tweet Generator
          <i class="fa fa-caret-down" v-if="tg.length"></i
        ></span>
        <div
          class="circle"
          :class="{ 'w3-green': tg.length, 'w3-deep-orange': !tg.length }"
        ></div>
      </div>
      <NavLinks name="tg" :family="tg" v-if="tg.length" />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import NavLinks from "@/components/NavLinks";
import Loader from "@/components/Loader";
import NavCategory from '@/components/NavCategory'

export default {
  components: {
    NavCategory,
    NavLinks,
    Loader,
  },
  data: () => ({
  }),
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
    loaded(){
      return this.$store.getters.responses >= this.$store.getters.allServices.length
    }
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
  mounted() {
  },
};
</script>

<style scoped>
.justify {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.circle {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-top: auto;
  margin-bottom: auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
}

.led-gray {
  margin-top: auto;
  margin-bottom: auto;
  height: 7px;
  width: 7px;
  background-color: #9e9e9e !important;
  border-radius: 50%;
  box-shadow: 0 0 10px 7px #9e9e9e !important;
}

.led-green {
  margin-top: auto;
  margin-bottom: auto;
  width: 7px;
  height: 7px;
  background-color: #009688 !important;
  border-radius: 50%;
  box-shadow: 0 0 10px 7px #009688;
}

a {
  text-decoration: none;
}
</style>
