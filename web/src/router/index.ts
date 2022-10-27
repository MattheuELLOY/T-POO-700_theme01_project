import { createRouter, createWebHistory } from 'vue-router'
import SignUpVue from '@/views/SignUp.vue'
import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/Home.vue'
import ProfileVue from '@/views/Profile.vue'
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
	,
	{
		path: '/workingtime',
		name: 'WorkingTime',
		component: WorkingTimeManagement
	}
	,
	{
		path: '/workingtimes/',
		name: 'WorkingTimes',
		component: WorkingTimeBoard
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router