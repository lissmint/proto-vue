export default [
  {
    title: 'Tacotron 2.1', // title used in sidebar
    familyName: 'tts', // family of services name
    active: false, // websocket status, changed by socket availability check
    tags: ['EN', 'LJ'], // sidebar tags
    url: 't2w', // service url
    ws: null, // websocket object, assigned on created
    options: {
      // options necessary for components at service page
      maxLength: 140 // textfield maxlength
    },
    data: null // data received from websocket, assigned by websocket onmessage event, then passed to component and reset by component
  },
  {
    title: 'Tacotron 2.1 + WG',
    familyName: 'tts',
    active: false,
    tags: ['EN', 'LJ', 'BIG'],
    url: 't2wlj',
    ws: null,
    options: {
      maxLength: 140
    },
    data: null
  },
  // {
  //   title: "",
  //   familyName: "tts",
  //   active: false,
  //   tags: ["EN", "LJ", "BIG"],
  //   url: "tacotron1",
  //   ws: null,
  //   options: {},
  //   data: null
  // },
  {
    title: 'Tacotron 1.6 Long-Seq',
    familyName: 'tts',
    active: false,
    tags: ['EN', 'LJ'],
    url: 'tacotron16',
    ws: null,
    options: {
      maxLength: 200
    },
    data: null
  },
  {
    title: 'Tacotron 1.6 + WG',
    familyName: 'tts',
    active: false,
    tags: ['EN', 'LJ', 'BIG'],
    url: 't16wg',
    ws: null,
    options: {
      maxLength: 200
    },
    data: null
  },
  {
    title: 'Tacotron 1.6 Long-Seq',
    familyName: 'tts',
    active: false,
    tags: ['EN', 'CB'],
    url: 'tacotronCB',
    ws: null,
    options: {
      maxLength: 140
    },
    data: null
  },
  {
    title: 'Tacotron 1.5',
    familyName: 'tts',
    active: false,
    tags: ['RU', 'VN'],
    url: 'tacotronRu',
    ws: null,
    options: {
      maxLength: 70
    },
    data: null
  },
  {
    title: 'Tacotron 2.0 Naive',
    familyName: 'tts',
    active: false,
    tags: ['EN', 'LJ'],
    url: 'tacotron2',
    ws: null,
    options: {
      maxLength: 140
    },
    data: null
  },
  {
    title: 'Tacotron 2.1 + WG',
    familyName: 'tts',
    active: false,
    tags: ['EN', 'LJ', 'SMALL'],
    url: 't2w2',
    ws: null,
    options: {
      maxLength: 140
    },
    data: null
  },
  {
    title: 'Tacotron 2.1',
    familyName: 'tts',
    active: false,
    tags: ['DE', 'M-AILABS', 'In Work'],
    url: 't2wde',
    ws: null,
    options: {
      maxLength: 140
    },
    data: null
  },
  {
    title: 'Tacotron 2.1',
    familyName: 'tts',
    active: false,
    tags: ['UK', 'M-AILABS', 'In Work'],
    url: 't2wuk',
    ws: null,
    options: {
      maxLength: 140
    },
    data: null
  },
  {
    title: 'Wave2Letter+',
    familyName: 'asr',
    active: false,
    tags: ['EN', 'LibriSpeech'],
    url: 'w2l',
    ws: null,
    options: {},
    data: null
  }
]
