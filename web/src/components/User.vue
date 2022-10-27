<template>
  <div>
    <div v-if="title !== 'Delete'" class="content card-user">
      <h1>{{ title }}</h1>
			<div v-if="title === 'Change'">
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
import { reactive, toRefs } from 'vue'
import router from '@/router'

export default {
  props: {
    title: String,
  },
  setup (props) {
    const data = reactive({
      user: {} as User,
      userID: null,
      email: '' as string,
      username: '' as string
    });
    const userStore = useUserStore();

    function onClick(): void {
      if (props.title === 'Sign Up') {
        creatUser()
      } else if (props.title === 'Change') {
        updateUser()
      } else if (props.title === 'Delete'){
				deleteUser()
			} else {
        userStore.user.email = ""
        userStore.user.username = "a"
        router.push('Home')
      }
    };
    function creatUser(): void {
      if (data.email && data.username) {
        userStore.post(data.email, data.username)
        data.email = ""
        data.username = ""
        router.push('Home')
      }
    };
    function updateUser(): void {
      if (data.userID && data.email && data.username) {
        userStore.getByFilter(data.email, data.username)
        userStore.put(data.userID, data.email, data.username)
      }
    }
    function deleteUser(): void {
      if (data.userID) {
				userStore.delete(data.userID)
        router.push('SignUp')
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
