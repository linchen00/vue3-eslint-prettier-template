import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...routes,
		{
			path: '/',
			redirect: '/home'
		}
	]
})

if (import.meta.hot) {
	handleHotUpdate(router)
}

export default router
