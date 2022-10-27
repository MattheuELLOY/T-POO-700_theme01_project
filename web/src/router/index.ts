import { createRouter, createMemoryHistory } from 'vue-router'
import SignUpVue from '@/views/SignUp.vue'
import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/Home.vue'
import ProfileVue from '@/views/Profile.vue'
import WorkingTimeBoard from '@/views/WorkingTimeBoard.vue'
const routes = [
	{
		path: '/',
		name: '',
		component: WorkingTimeBoard
	},
	{
		path: '/sign-up',
		name: 'SignUp',
		component: WorkingTimeBoard
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
		name: 'Profile',
		component: WorkingTimeBoard
	}
]

const router = createRouter({
	history: createMemoryHistory(),
	routes
})

export default router