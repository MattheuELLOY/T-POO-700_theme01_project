<template>
  <header>
    <nav class="navbar">
      <div v-if="!user?.id" class="gap">
        <router-link to="/sign-up">Sign up</router-link>
        <router-link to="/login">Login</router-link>
      </div>
      <div v-else class="gap">
        <router-link to="/">Home</router-link>
        <select class="drop-down" @click="selecteUser($event.target.value)">
          <option v-for="user in allUser" :value="user.id" :key="user.id">{{ user.username }}</option>
        </select>
        <select class="drop-down create" @click="selecteCreate($event.target.value)">
          <option value="/chartManager">Create</option>
          <option value="/create-user">Create User</option>
          <option value="/workingTime">Create Working Time</option>
        </select>
        <router-link :to="{name: 'WorkingTimes', params: { userId: user.id }}">Working times</router-link>
        <router-link to="/profile">Profile</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { getAllUsers } from '@/helpers/user-helper';
import router from '@/router';
import { useUserStore } from '@/store/user'
import { useWorkingTime } from '@/store/workingTime';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'

export default {
  setup() {
    const userStore = useUserStore()
    const user = computed(() => userStore.user)
    const allUser = computed(() => userStore.allUser)

    const workingTimeStore = useWorkingTime()

    const route = useRoute()

    onMounted(() => {
      userStore.getAll()
      getAllUsers().then((response) => userStore.get(response.data.data[0].id))
    })

    function selecteUser(id: number) {
      const actualRoute = route.path

      userStore.get(id)
      workingTimeStore.getAll(id)

      if (route.params.userId && route.params.workingtimeId) {
        router.replace({ path: '/chartManager' })
      } else if (route.params.userId) {
        router.push(actualRoute.slice(actualRoute.length, 1) + id)
      }
    }

    function selecteCreate(value: string) {
      if (value === '/workingTime') {
        router.push({ name: 'CreateWorkingTime', params: { userId: user.value.id } })
      } else {
        router.push(value)
      }
    }

    return {
      user,
      allUser,
      selecteUser,
      selecteCreate
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

  display: flex;
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
  outline: none;

  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
}

.create {
  background-color: white;
  color: gray;
  border: 0px;
}

.gap {
  display: flex;
  gap: 1.5rem;
}
</style>