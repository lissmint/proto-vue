<template>
  <div>
    <NHeader title="Tacotron" />
    <div class="w3-container model">
        <h2>Input sentence and Run</h2>
    </div>
    <div id="Tacotron 2.1 EN LJ" class="w3-container model">
      <h2>Input sentence and Run</h2>
      <p>
        <textarea
          id="tts-t2wlj-text"
          placeholder="Enter text in the input field."
          class="w3-input w3-border"
          style="resize:none; max-width: 900px;"
          maxlength="140"
        ></textarea>
      </p>
      <p>
        <button id="tts-t2wlj-btn" class="w3-button w3-teal" disabled>
          Run
        </button>
        <i
          id="tts-t2wlj-spinner"
          class="fa fa-spinner w3-spin w3-center"
          style="font-size:20px; display: none;"
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
            ></audio>
          </p>
        </div>

        <footer class="w3-container w3-light-gray">
          <p
            id="tts-t2wlj-audiotext"
            class="w3-panel w3-leftbar w3-border-teal"
          >
            Enter text in the input field.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>
