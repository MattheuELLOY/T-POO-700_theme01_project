<template>
  <header>
    <nav class="navbar">
      <div v-if="!user?.id" class="gap">
        <router-link to="/sign-up">Sign up</router-link>
        <router-link to="/Login">Login</router-link>
      </div>
      <div v-else class="gap">
        <h3>{{ user.username }}</h3>
        <select class="drop-down" @change="selected($event.target.value)">
          <option
                v-for="user in allUser"
                :value="user.id"
                :key="user.id">{{ user.id }}</option>
        </select>
        <router-link to="/home">Home</router-link>
        <router-link to="/create-user">Create User</router-link>
        <router-link to="/profile">Profile</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'
import { computed, onMounted } from 'vue';

export default {
  setup () {
    const userStore = useUserStore()
    const user = computed(() => userStore.user)
    const allUser = computed(() => userStore.allUser)

    onMounted(() => {
      userStore.getAll()
    })

    function selected(id: number) {
      userStore.get(id)
    }

    return {
      user,
      allUser,
      selected
    }
  }
}
</script>

<style scoped lang="css">
  a {
    text-decoration: none;
    color: gray;
  }
  .navbar {
    right: 0;
    top: 0;
    position: fixed;
    box-sizing: border-box;

    display:flex;
    align-items: center;
    justify-content: end;

    width: 100%;
    min-height: 3rem;
    padding-inline: 2rem;

    border-bottom: 0px solid;
    box-shadow: 0px 0px 10px 0px;
    background-color: white;
  }
  .drop-down {
    padding: 5px;

    background-color: white;
    border-color: rgb(175, 175, 175);
    border-radius: 10px;
  }
  .gap {
    display: flex;
    gap: 1.5rem;
  }
</style>