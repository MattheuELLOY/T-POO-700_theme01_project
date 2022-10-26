<template>
	<div class="card">
		<h2>Create new User</h2>
    <div>
      <h3>Email :</h3>
      <input placeholder= "email" @input="event => email = event.target.value"/>
      <h3>Username :</h3>
      <input placeholder="username" @input="event => username = event.target.value"/>
    </div>
    <button class="user-btn" @click="creatUser">
      Create user
    </button>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../store/user.ts'
import { reactive, toRefs } from 'vue'

export default {
	setup () {
		const userStore = useUserStore();
		const data = reactive({
			email: "",
			username: ""
		});

		function creatUser() {
			userStore.post(data.email, data.username)
		};

		return {
			...toRefs(data),
			creatUser
		}
	}
}
</script>

<styles scoped lang="css">
	.card {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;

			min-height: 15rem;
			width: fit-content;
			padding: 7px;

			border: 0px solid;
			border-radius: 10px;
			box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.user-btn {
		padding: 5px;
		border: 1.8px solid;
	 	border-radius: 10px;
	}
</styles>