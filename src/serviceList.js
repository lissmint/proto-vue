export default [
  // TTS
  {
    title: 'Tacotron 2.1', // title used in sidebar
    familyName: 'tts', // family of services name
    active: false, // websocket status, changed by socket availability check
    tags: ['EN', 'LJ'], // sidebar tags
    url: 't2w', // service url
    ws: null, // websocket object, assigned on created
    timeout: 0, // reconnection timeout
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
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
    timeout: 0,
    options: {
      fragmentWordLimit: 1000,
      questionWordLimit: 100
    }
  },
  {
    title: 'QANet ELMo',
    familyName: 'qa',
    active: false,
    tags: ['EN', 'SQuAD 1.1'],
    url: 'elmo-qanet',
    ws: null,
    timeout: 0,
    options: {
      fragmentWordLimit: 1000,
      questionWordLimit: 100
    }
  },
  {
    title: 'BERT Base',
    familyName: 'qa',
    active: false,
    tags: ['EN', 'SQuAD 1.1'],
    url: 'bert',
    ws: null,
    timeout: 0,
    options: {
      fragmentWordLimit: 320,
      questionWordLimit: 64
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
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  // MIG
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Cleaned Mask Over Mask Contribution GuCh',
    familyName: 'mig',
    active: false,
    tags: ['cleaned mask over mask'],
    url: 'cmomgcb',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Mask Over Mask Iterate GuCh source',
    familyName: 'mig',
    active: false,
    tags: ['source', 'mask over mask iterate'],
    url: 'momi_source',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Mask Over Mask Iterate GuCh direct',
    familyName: 'mig',
    active: false,
    tags: ['direct', 'mask over mask iterate'],
    url: 'momi_direct',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Mask Over Mask Iterate GuCh merged',
    familyName: 'mig',
    active: false,
    tags: ['merged', 'mask over mask iterate'],
    url: 'momi_merged',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Mask Over Mask Iterate GuCh max',
    familyName: 'mig',
    active: false,
    tags: ['max', 'mask over mask iterate'],
    url: 'momi_max',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Mask Over Mask Iterate GuCh mod',
    familyName: 'mig',
    active: false,
    tags: ['max', 'mask over mask iterate'],
    url: 'momi_mod',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Mask Over Mask Iterate GuCh modmax',
    familyName: 'mig',
    active: false,
    tags: ['modmax', 'mask over mask iterate'],
    url: 'momi_modmax',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  // MIG SIMILARITY
  {
    title: 'BERTRAM',
    fullTitle: 'BERT Classifier Context Similarity GuCh',
    familyName: 'mig',
    active: false,
    tags: ['context similarity'],
    url: 'similarity/simgcb',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
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
    timeout: 0,
    options: {
      wordLimit: 128
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
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'Google BERT Base',
    familyName: 'spp',
    active: false,
    tags: [],
    url: '7',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTRAM GuCh',
    familyName: 'spp',
    active: false,
    tags: [],
    url: 'suarez',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  // SEMSIM
  {
    title: 'BERT Google WordPiece',
    familyName: 'semsim',
    active: false,
    tags: [],
    url: 'sentsim',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTAM Google WordPiece',
    familyName: 'semsim',
    active: false,
    tags: [],
    url: 'sentsimo',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  {
    title: 'BERTAM GuCh WordPiece',
    familyName: 'semsim',
    active: false,
    tags: ['in work'],
    url: 'sentsimguch',
    ws: null,
    timeout: 0,
    options: {
      wordLimit: 128
    }
  },
  // TG
  {
    title: 'BERT LSTM',
    familyName: 'tg',
    active: false,
    tags: [],
    url: 'tg',
    ws: null,
    timeout: 0,
    options: {
      type: 'tg',
      wordLimit: 128,
      maxLow: 5,
      maxHigh: 100
    }
  },
  {
    title: 'Transformer XL WORD',
    familyName: 'tg',
    active: false,
    tags: [],
    url: 'tgxl',
    ws: null,
    timeout: 0,
    options: {
      type: 'tg',
      wordLimit: 128,
      maxLow: 5,
      maxHigh: 100
    }
  },
  {
    title: 'Flow Transformer',
    familyName: 'tg',
    active: false,
    tags: [],
    url: 'tggpt',
    ws: null,
    timeout: 0,
    options: {
      type: 'tggpt',
      wordLimit: 1024,
      maxLow: 0,
      maxHigh: 1024
    }
  },
  {
    title: 'Flow Transformer DAI',
    familyName: 'tg',
    active: false,
    tags: ['in work'],
    url: 'tggptdai',
    ws: null,
    timeout: 0,
    options: {
      type: 'tggptdai',
      wordLimit: 1024,
      maxLow: 0,
      maxHigh: 1024
    }
  }
]
