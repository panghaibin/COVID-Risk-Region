import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from '@vueuse/head'
const app = createApp(App)
const head = createHead()
app.use(head)
app.mount('#app')
