import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


/**
 * Implement oh-vue-icon
 */
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiCloudUpload } from "oh-vue-icons/icons";

addIcons(BiCloudUpload)


const app = createApp(App)

app.use(createPinia());
app.component('v-icon', OhVueIcon);
app.mount('#app')
