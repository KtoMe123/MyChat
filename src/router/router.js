import {createRouter, createWebHistory} from "vue-router"
import Main from '../pages/MainPage.vue'
import Reg from '../pages/RegPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
          path: '/',
          name: 'Main',
          component: Main
      },
      {
          path: '/reg',
          name: 'Reg',
          component: Reg
      },
      
  ]
})

export default router;