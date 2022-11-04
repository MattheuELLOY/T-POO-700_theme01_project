import { createRouter, createWebHistory } from 'vue-router'
import SignUpVue from '@/views/SignUp.vue'
import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/Home.vue'
import ProfileVue from '@/views/Profile.vue'
import CreateUserVue from '@/views/CreateUser.vue'
import WorkingTimeVue from '@/components/WorkingTime.vue'
import WorkingTimesVue from '@/components/WorkingTimes.vue'
import ClockVue from '@/views/Clocks.vue'

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
		path: '/chartManager/:userId',
		name: 'chartManager',
		component: HomeVue,
		props: true
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
		path: '/workingTime/:userId',
		name: 'CreateWorkingTime',
		component: WorkingTimeVue,
		props: true
	},
	{
		path: '/workingTime/:userId/:workingtimeId',
		name: 'UpdateWorkingTime',
		component: WorkingTimeVue,
		props: true
	},
	{
		path: '/workingTimes/:userId',
		name: 'WorkingTimes',
		component: WorkingTimesVue,
		props: true
	},
	{
		path: '/clocks/:userId',
		name: 'Clocks',
		component: ClockVue,
		props: (route: any) => ({ userId: Number(route.params.userId) }),
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router