import { createRouter, createMemoryHistory } from 'vue-router'
import SignUpVue from '@/views/SignUp.vue'
import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/Home.vue'
import ProfileVue from '@/views/Profile.vue'

const routes = [
	{
		path: '/',
		name: '',
		component: SignUpVue
	},
	{
		path: '/sign-up',
		name: 'SignUp',
		component: SignUpVue
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginVue
	},
	{
		path: '/home',
		name: 'Home',
		component: HomeVue
	}
	,
	{
		path: '/profile',
		name: 'Profile',
		component: ProfileVue
	}
]

const router = createRouter({
	history: createMemoryHistory(),
	routes
})

export default router