import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: "/Welcome",
        children: [
            {
                path: '/Welcome',
                name: 'Welcome',
                component: () => import("@/views/Welcome"),
            },
            {
                path: '/goods',
                name: 'Goods',
                component: () => import("@/views/Goods"),
            },
			{
				path: '/User',
				name: 'User',
				component: () => import("@/views/User"),
			},
			{
				path: '/Order',
				name: 'Order',
				component: () => import("@/views/Order"),
			},
			{
				path: '/Want',
				name: 'Want',
				component: () => import("@/views/Want"),
			},
			{
				path: '/Category',
				name: 'Category',
				component: () => import("@/views/Category"),
			},
			{
				path: '/Feedback',
				name: 'Feedback',
				component: () => import("@/views/Feedback"),
			},
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login")
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
