import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import "primeicons/primeicons.css"
import Button from "primevue/button"
import InputText from 'primevue/inputtext'
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';

const app = createApp(App)


app.use(createPinia())
//app.use(router)
app.use(PrimeVue,{
    theme: {
        preset: Aura
    }
})
app.component('app-button',Button)
app.component('app-input-text',InputText)
app.component('app-password',Password)
app.component('app-float-label',FloatLabel)
app.component('app-select',Select)

app.mount('#app')
