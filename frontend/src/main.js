import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

registerPlugins(app)

app.use(vue3GoogleLogin, {
    clientId: '731219036758-h0v2774tgla1fjmu78rl6n8u4ar3l4i2.apps.googleusercontent.com'
})

app.mount('#app')