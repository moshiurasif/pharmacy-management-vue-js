import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toaster from "@meforma/vue-toaster";
import router from './router';

createApp(App).use(Toaster, {
    position: "top-right",
    duration: 2000
  }).use(router).mount("#app");

  
