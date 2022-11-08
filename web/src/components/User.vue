<template>
  <div v-if="status !== 'delete'" class="content card column">
    <h2 class="white-text">{{ title }}</h2>
    <div>
      <input placeholder= "email" v-model="email" class="input"/>
      <span class="label">Email :</span>
    </div>
    <div>
      <input placeholder="username" v-model="username" class="input"/>
      <span class="label">Username :</span>
    </div>
    <!-- <div>
      <input placeholder="password" v-model="username" class="user-input"/>
      <span class="label">password :</span>
    </div> -->
    <button class="btn" @click="onClick">
      {{ title }}
    </button>
  </div>
  <div v-else class="content card column">
    <h2 class="white-text">{{ title }}</h2>
    <h3 class="white-text">{{ user.username }}</h3>
    <button class="btn" @click="onClick">
      {{ title }}
    </button>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { postUser, putUser, deletedUser, getAllUsers } from '@/helpers/user-helper'
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
      role: '' as string,
    });
    const userStore = useUserStore();
    const user = computed(() => userStore.user)

    onMounted(() => {
      if (props.status === 'create') {
        getAllUsers().then((response) => userStore.get(response.data.data[0].id))
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
        getAllUsers().then((response) => { 
          userStore.get(response.data.data[0].id),
          router.push({name: 'chartManager', params: { userId: response.data.data[0].id }})
        })
      }
    };
    function creatUser(): void {
      if (data.email && data.username) {
        postUser(data.email, data.username).then(() => userStore.getAll())

        data.email = ""
        data.username = ""

        router.push('chartManager')
      }
    };
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
</style>
