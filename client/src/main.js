import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // เรียกใช้งาน Router ที่เรากำลังจะสร้าง

const app = createApp(App)

app.use(router) // สั่งให้ Vue ใช้ระบบ Router
app.mount('#app')