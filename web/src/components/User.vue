<template>
  <div v-if="status !== 'delete'" class="content card column">
    <h2 class="white-text">{{ title }}</h2>
    <div>
      <input placeholder= "email" v-model="email" class="input"/>
      <span class="label">Email :</span>
    </div>
    <div v-if="status !== 'login'">
      <input placeholder="username" v-model="username" class="input"/>
      <span class="label">Username :</span>
    </div>
    <div>
      <input placeholder="password" v-model="password" class="input" type="password"/>
      <span class="label">Password :</span>
    </div>
    <button class="btn" @click="onClick">
      {{ title }}
    </button>
  </div>
  <div v-else class="delete-content margin-top">
    <button class="btn-red" @click="onClick">
      {{ title }}
    </button>
  </div>
  <div v-if="errors[0]" class="card card-error">
    <h3 class="white-text">Errors :</h3>
    <ul v-for="error of errors">
      <li class="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { postUser, putUser, deletedUser, getAllUsers, loginUser } from '@/helpers/user-helper'
import router from '@/router'

export default {
  props: {
    title: String,
    status: String
  },
  setup (props) {
    const data = reactive({
      email: '' as string,
      username: '' as string,
      password: '' as string,
      errors: [] as string[]
    });
    const userStore = useUserStore()
    const user = computed(() => userStore.user)

    onMounted(() => {
      if ((props.status === 'login' || props.status === 'signUp')) {
        if (localStorage.getItem('token') || localStorage.getItem('id')) {
          localStorage.clear()
        } if (user.value?.id) {
          userStore.$reset()
        }
      }
      if (props.status === 'create') {
        getAllUsers().then((response: any) => userStore.get(response.data.data[0].id))
      }
    })

    function onClick(): void {
      if (props.status === 'create' || props.status === 'signUp') {
        creatUser()
      } else if (props.status === 'update') {
        updateUser()
      } else if (props.status === 'delete'){
				deleteUser()
			} else {
        connect()
      }
    };
    function creatUser(): void {
      if (data.email && data.username && data.password) {
        postUser(data.email, data.username, data.password).then((response: any) => {
          userStore.getAll(),
          (response.data.success === false) ? data.errors = response.data.errors : (data.errors.length = 0, router.push('/login'))
        })

        data.email = ""
        data.username = ""
        data.password = ""
      }
    };
    function connect(): void {
      if (data.email && data.password) {
        data.errors.length = 0;
        loginUser(data.email, data.password).then((response: any) => {
          (response.data.success === false)
          ? (data.errors.push(response.data.error))
          : (
            localStorage.setItem('token', JSON.stringify(response.data.token)),
            userStore.getByToken().then(() => { 
              localStorage.setItem('id', user.value.id.toString()),
              userStore.getAll()
              router.push({name: 'chartManager', params: { userId: user.value.id }}) })
          )
        })
        data.email = ""
        data.password = ""
      }
    }
    function updateUser(): void {
      if (data.email && data.username) {
        putUser(user.value.id, data.email, data.username).then(() => { userStore.getAll(), userStore.get(user.value.id)})

        data.email = ""
        data.username = ""
      }
    }
    function deleteUser(): void {
      deletedUser(user.value.id).then(() => { userStore.getAll(), userStore.delete() })
		}

    return {
      ...toRefs(data),
      user,
      onClick
    }
  }
}
</script>

<style scoped lang="css">
.delete-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.margin-top {
  margin-block: 2rem;
}
</style>
