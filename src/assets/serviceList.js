export default [
  {
    title: "Tacotron 2.1",  // title used in sidebar
    familyName: "tts",      // family of services name
    active: false,          // websocket status
    tags: ["EN", "LJ"],     // sidebar tags
    url: "t2w",             // service url 
    ws: {},                 // websocket object, assigned on startup
    options: {              // necessary options for components on service page
      maxLength: 140,
    },
  },
  {
    title: "Tacotron 2.1 + WJ",
    familyName: "tts",
    active: false,
    tags: ["EN", "LJ", "BIG"],
    url: "t2wlj",
    ws: {},
    options: {},
  },
  {
    title: "Wave2Letter+",
    familyName: "asr",
    active: false,
    tags: ["LibriSpeech", "EN"],
    url: "w2l",
    ws: {},
    options: {},
  },
];
