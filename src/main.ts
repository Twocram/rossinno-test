import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Aura from '@primevue/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    colorScheme: 'light',
  },
})

app.use(createPinia())
app.use(router)

app.mount('#app')
