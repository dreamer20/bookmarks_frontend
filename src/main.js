import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'

import App from './App.vue'
import router from './router'

import 'vuestic-ui/css'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(pinia)
app.use(createVuestic())
app.use(router)

app.mount('#app')
