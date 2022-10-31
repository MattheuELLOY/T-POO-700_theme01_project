import { createRouter, createWebHistory } from 'vue-router'
import SignUpVue from '@/views/SignUp.vue'
import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/Home.vue'
import ProfileVue from '@/views/Profile.vue'
import CreateUserVue from '@/views/CreateUser.vue'
import WorkingTimeBoard from '@/views/WorkingTimeBoard.vue'
import WorkingTimeManagement from '@/views/WorkingTimeManagement.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeVue
	},
	{
		path: '/sign-up',
		name: 'sign-up',
		component: SignUpVue
	},
	{
		path: '/login',
		name: 'login',
		component: LoginVue
	},
	{
		path: '/home',
		name: 'home',
		component: HomeVue
	},
	{
		path: '/create-user',
		name: 'create-user',
		component: CreateUserVue
	},
	{
		path: '/profile',
		name: 'profile',
		component: ProfileVue
	},
	{
		path: '/workingTime/:userid',
		name: 'WorkingTime',
		component: WorkingTimeManagement,
		props: true
	},
	{
		path: '/workingTimes/:userid',
		name: 'WorkingTimes',
		component: WorkingTimeBoard,
		props: true
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router