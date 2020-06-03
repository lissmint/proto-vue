export default [
  {
    title: "Tacotron 2.1",  // title used in sidebar
    familyName: "tts",      // family of services name
    active: false,          // websocket status, changed by socket availability check
    tags: ["EN", "LJ"],     // sidebar tags
    url: "t2w",             // service url 
    ws: {},                 // websocket object, assigned on created
    options: {              // necessary options for components on service page
      maxLength: 140,       // textfield maxlength
    },
    data: null              // data received from websocket, assigned by websocket onmessage event then passed to component and reset by component
  },
  {
    title: "Tacotron 2.1 + WG",
    familyName: "tts",
    active: false,
    tags: ["EN", "LJ", "BIG"],
    url: "t2wlj",
    ws: {},
    options: {},
    data: null
  },
  {
    title: "Wave2Letter+",
    familyName: "asr",
    active: false,
    tags: ["LibriSpeech", "EN"],
    url: "w2l",
    ws: {},
    options: {},
    data: null
  },
];
