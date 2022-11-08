import { createRouter, createWebHistory } from 'vue-router'
import SignUpVue from '@/views/SignUp.vue'
import LoginVue from '@/views/Login.vue'
import HomeVue from '@/views/Home.vue'
import ProfileVue from '@/views/Profile.vue'
import CreateUserVue from '@/views/CreateUser.vue'
import WorkingTimeVue from '@/components/WorkingTime.vue'
import WorkingTimesVue from '@/components/WorkingTimes.vue'
import ClockVue from '@/views/Clocks.vue'
import ParametersVue from '@/views/Parameters.vue'

import { useUserStore } from '@/store/user'
import { computed } from 'vue'
import { getUserToken } from '@/helpers/user-helper'

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
		props: true
	},
	{
		path: '/parameters/:userId',
		name: 'Parameters',
		component: ParametersVue,
		props: true
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.name !== 'login' && to.name !== 'sign-up' && localStorage.getItem('token') && localStorage.getItem('id')) {
		const id: number = <number>Number(localStorage.getItem('id'))
		getUserToken().then((response) => {
			if (response.data.data.id === id) {
				next()
			} else {
				next({ name: 'login' })
			}
		})
	} else {
		next()
	}
})

export default router