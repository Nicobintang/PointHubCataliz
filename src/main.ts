import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faCamera, faTimes} from '@fortawesome/free-solid-svg-icons'

library.add( faChevronDown, faCamera, faTimes)

const app = createApp(App)

// app.use(Vue3Geolocation)
app.use(createPinia())
app.use(router)
app.use(Toast)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
