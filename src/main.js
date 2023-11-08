import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
