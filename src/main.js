import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  // change this to the html version
  history: createWebHashHistory(),
  routes
})
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
