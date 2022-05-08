import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from '@vueuse/head'
import './registerServiceWorker'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'

const app = createApp(App)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const head = createHead()
app.use(head)
app.mount('#app')
