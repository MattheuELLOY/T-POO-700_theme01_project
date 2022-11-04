<template>
  <div v-if="status !== 'delete'" class="content card-user">
    <h1>{{ title }}</h1>
    <div>
      <h2>Email :</h2>
      <input placeholder= "email" v-model="email" class="user-input"/>
    </div>
    <div>
      <h2>Username :</h2>
      <input placeholder="username" v-model="username" class="user-input"/>
    </div>
    <button class="user-btn" @click="onClick">
      {{ title }}
    </button>
  </div>
  <div v-else class="content card-user">
    <h1>{{ title }}</h1>
    <h2>{{ user.username }}</h2>
    <button class="user-btn" @click="onClick">
      {{ title }}
    </button>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'
import { computed, onMounted, reactive, toRefs } from 'vue'
import {
  postUser,
  putUser,
  deletedUser,
getAllUsers
} from '@/helpers/user-helper'
import router from '@/router'

export default {
  props: {
    title: String,
    status: String
  },
  setup (props) {
    const data = reactive({
      email: '' as string,
      username: '' as string
    });
    const userStore = useUserStore();
    const user = computed(() => userStore.user)

    onMounted(() => {
      if (props.status === 'create') {
        getAllUsers().then((response) => userStore.get(response.data.data[0].id))
      }
    })
    function onClick(): void {
      if (props.status === 'create') {
        creatUser()
      } else if (props.status === 'update') {
        updateUser()
      } else if (props.status === 'delete'){
				deleteUser()
			} else {
        getAllUsers().then((response) => userStore.get(response.data.data[0].id))
        router.push('chartManager')
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
  .content {
    min-width: 30rem;
    min-height: 23rem;

    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .card-user {
    flex-direction: column;

    border: 0px solid;
    border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .user-input {
    padding: 7px;
		border: 2px solid gainsboro;
    background-color: white;
	 	border-radius: 15px;
  }
  .user-btn {
		padding: 10px;
		border: 2px solid gainsboro;
    background-color: white;
	 	border-radius: 15px;
	}
	.user-btn:hover {
		cursor:pointer;
		background-color: rgb(240, 240, 240);
	}
	.user-btn:active {
		box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  	transform: translateY(3px);
	}
</style>
