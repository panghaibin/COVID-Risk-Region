import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import { createHead } from '@vueuse/head'

const app = createApp(App)
const head = createHead()
app.use(head)
installElementPlus(app)
app.mount('#app')