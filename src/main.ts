import { createApp } from 'vue'
import App from './App.vue'

import './index.css'

// async function boot() {
//   // eslint-disable-next-line n/prefer-global/process
//   if (process.env.NODE_ENV === 'development') {
//     const { worker } = await import('./mocks/browser')
//     await worker.start()
//   }
// }

const app = createApp(App)
// boot().then(() => {
app.mount('#app')
// })
