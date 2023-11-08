import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogsItemView from '../views/LogsItemView.vue'
import LogsView from '../views/LogsView.vue'
import logsItemExerciseEditView from '../views/logsItemExerciseEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/logs',
      name: 'logs',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LogsView,
    },
    {
      path: '/logs/:id',
      name: 'logsItem',
      component: LogsItemView
    }
  ]
})

export default router
