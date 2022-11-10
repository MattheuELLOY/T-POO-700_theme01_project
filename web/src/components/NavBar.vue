<template>
  <header>
    <nav class="nav flex shadow">
      <router-link class="nav-left clignote" to="">
        <img class="logo" alt="logo" src="@/assets/bat.png"/>
        Gotham
      </router-link>
      <ul v-if="!user?.id" class="gap flex">
        <li><router-link to="/sign-up">Sign up</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
      <div v-else class="">
        <ul v-if="user.role === 'admin'" class="nav-top gap flex">
          <li style="color: #fdff00">User :</li>
          <li>
            <select class="drop-down" @click="selecteUser($event)">
              <option v-for="user in allUser" :value="user.id" :key="user.id">{{ user.username }}</option>
            </select>
          </li>
          <li>
            <select class="drop-down" @click="selecteCreate($event)">
              <option value="/create-user">Create User</option>
              <option value="/workingTime">Create Working Time</option>
            </select>
          </li>
        </ul>
        <button class="icon-toggle" @click="toogleMenu"><img src="@/assets/iconMenu.png" alt="icon_menu"></button>
        <ul :class="{ 'nav-right': true, active: isActive, notActive: !isActive, gap: true, flex: true }">
          <div class="nav-top-on-right">
            <li>
              <p style="color: #fdff00">User :</p>
              <select class="drop-down" @click="selecteUser($event)">
                <option v-for="user in allUser" :value="user.id" :key="user.id">{{ user.username }}</option>
              </select>
            </li>
            <li>
              <select class="drop-down" @click="selecteCreate($event)">
                <option value="/create-user">Create User</option>
                <option value="/workingTime">Create Working Time</option>
              </select>
            </li>
          </div>
          <li><img class="icon" src="@/assets/chart.png"><router-link class="link" :to="{name: 'chartManager', params: { userId: user.id }}">Charte Manager</router-link></li>
          <li><img class="icon" src="@/assets/clock.png"><router-link :to="{name: 'WorkingTimes', params: { userId: user.id }}">Working times</router-link></li>
          <li><img class="icon" src="@/assets/profile.png"><router-link to="/profile">Profile</router-link></li>
          <li><img class="icon" src="@/assets/logout.png"><a style="color: #fdff00" @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import router from '@/router';
import { useUserStore } from '@/store/user'
import { useWorkingTime } from '@/store/workingTime';
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router'

export default {
  setup() {
    const userStore = useUserStore()
    const user = computed(() => userStore.user)
    const userSelected = computed(() => userStore.selectedUser)
    const allUser = computed(() => userStore.allUser)

    const workingTimeStore = useWorkingTime()

    const route = useRoute()

    const data = reactive({
      isActive: false as boolean
    })

    onMounted(() => {
      userStore.getAll()
      userStore.getByToken()
    })

    function selecteUser(event: MouseEvent) {
      const click = event.target as HTMLTextAreaElement
      const id: number = <number>Number(click.value)
      const actualRoute = route.path

      if (id) {
        userStore.getSelected(id)
        if(user.value.role === 'admin') {
          workingTimeStore.getAll(id)
        }

        if (route.params.userId && route.params.workingtimeId) {
          router.replace({name: 'WorkingTimes', params: { userId: userSelected.value.id }})
        } else if (route.params.userId) {
          router.push(actualRoute.slice(actualRoute.length, 1) + id)
        }
      }
    }

    function selecteCreate(event: MouseEvent) {
      const click = event.target as HTMLTextAreaElement
      if (click.value) {
        if (click.value === '/workingTime') {
        router.push({ name: 'CreateWorkingTime', params: { userId: user.value.id } })
        } else {
         router.push(click.value)
        }
      }
    }

    function toogleMenu() {
      data.isActive = (data.isActive === false) ? true : false
    }

    function logout() {
      userStore.$reset()
      localStorage.clear()
      router.push('/login')
    }

    return {
      user,
      allUser,
      selecteUser,
      selecteCreate,
      ...toRefs(data),
      toogleMenu,
      logout
    }
  }
}
</script>

<style scoped lang="css">

a:link, a:visited {
  color: var(--color-yellow-bat);
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: 0.5s;
}
a:hover {
  color: var(--color-shadow-yellow-bat);
  transition: color .3s;
}
.nav-right a::after {
  position: absolute;
  content: "";
  top: 130%;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-yellow-bat);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .5s;
}
a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  display: flex;
  align-items: center;
  gap: 2rem;
  text-align: start;
}

.flex {
  display: flex;
  gap: 5rem;
}
.nav {
  box-sizing: border-box;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;

  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 3.3rem;
  padding-inline: 20px;
  margin: 0;

  background-color: var(--color-dark-bat);
}
.shadow {
  border-bottom: 1px solid rgb(111, 111, 111);
}
.nav-left {
  display: flex !important;
  align-items: center;
  gap: 0.5em;
  font-size: 1.2rem;
}
.nav-right {
  position: fixed;
  inset: 3.25rem 0 0 70%;

  background-color: var(--color-dark-bat);
  backdrop-filter: blur(0.5rem);
  border-top: 1px solid rgb(55, 55, 55);
  border-left: 1px solid rgb(111, 111, 111);

  padding: min(30vh, 10rem) 3rem;
  flex-direction: column;
  width: 30%;
}
.nav-right li {
  padding-top: 1rem;
}
.active {
  transform: translateX(0%);
  transition: transform 600ms ease-out;
}
.notActive {
  transform: translateX(100%);
  transition: transform 600ms ease-out;
}
.nav-top {
  padding-right: 3.7rem;
}
.nav-top-on-right {
  display: none;
}
.logo {
  width: 4rem;
  margin-inline: 5%;
  vertical-align: middle;
}
.icon-toggle {
  position: absolute;
  display: block;
  z-index: 9999;

  top: 0px;
  right: 0px;
  border: 1px solid;
  border-radius: 4px;
  border-color: var(--color-shadow-yellow-bat);
  outline: none;
  background: transparent;
}
.icon-toggle:hover {
  cursor:pointer;
  border-color: var(--color-yellow-bat);
}
.icon-toggle:active {
  transform: translateY(1.5px);
}

.drop-down {
  color: var(--color-yellow-bat);
  background-color: var(--color-dark-bat);
  outline: none;
  cursor:pointer;

  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  border: 1px solid;
  border-radius: 6px;
  border-color: var(--color-shadow-yellow-bat);
  padding: 6px;
}
.drop-down:hover {
  color: var(--color-shadow-yellow-bat);
  border-color: var(--color-yellow-bat);
  transition: color .3s;
}

.gap {
  display: flex;
  gap: 1.5rem;
}

@media (max-width: 60em) {
  .nav-right {
    inset: 3.25rem 0 0 50%;
    width: 50%;
  }
}
@media (max-width: 42em) {
  .nav-top {
    display: none;
  }
  .nav-top-on-right {
    display: block;
  }
  .icon-toggle{
    position: relative;
  }
}
@media (max-width: 35em) {
  .nav-right {
    inset: 3.25rem 0 0 30%;
    width: 70%;
  }
}
</style>