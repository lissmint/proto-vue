import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/tts/:id',
    name: 'TTS',
    component: () => import('../views/TTS.vue')
  },
  {
    path: '/asr/:id',
    name: 'ASR',
    component: () => import('../views/ASR.vue')
  },
  {
    path: '/qa/:id',
    name: 'QA',
    component: () => import('../views/QA.vue')
  },
  {
    path: '/nmt/:id',
    name: 'NMT',
    component: () => import('../views/NMT.vue')
  },
  {
    path: '/mig/:id',
    name: 'MIG',
    component: () => import('../views/MIG.vue')
  },
  {
    path: '/mlm/:id',
    name: 'MLM',
    component: () => import('../views/MLM.vue')
  },
  // зарегистрировать новый роут ПЕРЕД 404
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
