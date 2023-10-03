import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
          md,
        },
      },
})

//sweetalert CSS
import 'sweetalert2/dist/sweetalert2.min.css'

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAKarbF1nsAXvhoBogCYWxRHIXT6hN38hE",
  authDomain: "prominence-rating-experiment.firebaseapp.com",
  projectId: "prominence-rating-experiment",
  storageBucket: "prominence-rating-experiment.appspot.com",
  messagingSenderId: "294779656027",
  appId: "1:294779656027:web:ee5425efb8e72eff77ac7e",
  measurementId: "G-XHX0TMLCBG"
};
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(vuetify)
const pinia = createPinia()
pinia.use(createPersistedState({
    storage: sessionStorage,
}))
app.use(pinia);
app.use(router)
app.mount('#app')
