import { createApp } from 'vue'
import { router } from './router'
import { pinia, initStore } from './store'
import { Vue3Mq } from 'vue3-mq'

import App from './App.vue'

import './firebase'

import './assets/index.scss'
import 'bootstrap-icons/font/bootstrap-icons.scss'

const app = createApp(App)
  .use(pinia)
  .use(initStore)
  .use(Vue3Mq, { preset: 'bootstrap5' })

initStore.isReady().then(() => {
  setTimeout(() => {
    document.querySelector('#loading-app')?.remove()
    app.use(router).mount('#app')
  }, 1000)
})
