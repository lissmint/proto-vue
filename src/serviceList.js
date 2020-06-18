export default [
  // TTS
  {
    title: 'Tacotron 2.1', // title used in sidebar
    familyName: 'tts', // family of services name
    active: false, // websocket status, changed by socket availability check
    tags: ['EN', 'LJ'], // sidebar tags
    url: 't2w', // service url
    ws: null, // websocket object, assigned on created
    options: {
      // options necessary for components on service page
      maxLength: 140 // textfield maxlength
    }
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
    }
  },
  {
    title: 'Tacotron 1.6 Long-Seq',
    familyName: 'tts',
    active: false,
    tags: ['EN', 'LJ'],
    url: 'tacotron16',
    ws: null,
    options: {
      maxLength: 200
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  // ASR
  {
    title: 'Wave2Letter+',
    familyName: 'asr',
    active: false,
    tags: ['EN', 'LibriSpeech'],
    url: 'w2l',
    ws: null,
    options: {}
  },
  // QA
  {
    title: 'QANet FastText',
    familyName: 'qa',
    active: false,
    tags: ['EN', 'SQuAD 1.1'],
    url: 'qanet',
    ws: null,
    options: {
      maxLength: 1000,
      questionMaxLength: 100
    }
  },
  {
    title: 'QANet ELMo',
    familyName: 'qa',
    active: false,
    tags: ['EN', 'SQuAD 1.1'],
    url: 'elmo-qanet',
    ws: null,
    options: {
      maxLength: 1000,
      questionMaxLength: 100
    }
  },
  {
    title: 'BERT Base',
    familyName: 'qa',
    active: false,
    tags: ['EN', 'SQuAD 1.1'],
    url: 'bert',
    ws: null,
    options: {
      maxLength: 320,
      questionMaxLength: 64
    }
  },
  // NMT
  {
    title: 'Transformer',
    familyName: 'nmt',
    active: false,
    tags: ['Translator'],
    url: 'tr',
    ws: null,
    options: {
      maxLength: 128
    }
  },
  // MIG
  {
    title: 'cmomgcb',
    familyName: 'mig',
    active: false,
    tags: [],
    url: 'cmomgcb',
    ws: null,
    options: {
      maxLength: 128
    }
  },
  // MLM
  {
    title: 'MaLaMEDA Base',
    familyName: 'mlm',
    active: false,
    tags: [],
    url: 'mlmb',
    ws: null,
    options: {
      maxLength: 128
    }
  },
  // SPP
  {
    title: 'Google BERT Large',
    familyName: 'spp',
    active: false,
    tags: [],
    url: '16',
    ws: null,
    options: {
      maxLength: 128
    }
  },
  {
    title: 'Google BERT Base',
    familyName: 'spp',
    active: false,
    tags: [],
    url: '7',
    ws: null,
    options: {
      maxLength: 128
    }
  },
  {
    title: 'BERTRAM GuCh',
    familyName: 'spp',
    active: false,
    tags: [],
    url: 'suarez',
    ws: null,
    options: {
      maxLength: 128
    }
  }
]

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
