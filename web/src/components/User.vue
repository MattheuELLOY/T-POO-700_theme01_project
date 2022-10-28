<template>
  <div>
    <div v-if="status !== 'delete'" class="content card-user">
      <h1>{{ title }}</h1>
			<div v-if="status === 'update'">
        <h2>User Id :</h2>
        <input placeholder= "user id" v-model="userID" class="user-input"/>
      </div>
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
			<div>
        <h2>User Id :</h2>
        <input placeholder= "user id" v-model="userID" class="user-input"/>
      </div>
			<button class="user-btn" @click="onClick">
        {{ title }}
      </button>
		</div>
  </div>
</template>

<script lang="ts">
import type { User } from '@/models/user'
import { useUserStore } from '@/store/user'
import { computed, reactive, toRefs } from 'vue'
import {
  getUser,
  getByFilter,
  getAllUsers,
  post,
  put,
  deleted
} from '@/helpers/user-helper'
import router from '@/router'

export default {
  props: {
    title: String,
    status: String
  },
  setup (props) {
    const data = reactive({
      user: {} as User,
      userID: null,
      email: '' as string,
      username: '' as string
    });
    const userStore = useUserStore();
    const user = computed(() => userStore.user)

    function onClick(): void {
      if (props.status === 'create') {
        creatUser()
      } else if (props.status === 'update') {
        updateUser()
      } else if (props.status === 'delete'){
				deleteUser()
			} else {
        user.value.id = -1
        user.value.email = ""
        user.value.username = ""
        router.push('Home')
      }
    };
    function creatUser(): void {
      if (data.email && data.username) {
        post(data.email, data.username)
        user.value.id = -1
        user.value.email = ""
        user.value.username = ""
        router.push('Home')
      }
    };
    function updateUser(): void {
      if (data.userID && data.email && data.username) {
        put(data.userID, data.email, data.username)
      }
    }
    function deleteUser(): void {
      if (data.userID) {
				deleted(data.userID)
        router.push('Home')
			}
		}

    return {
      ...toRefs(data),
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
