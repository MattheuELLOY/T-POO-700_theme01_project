<template>
  <header>
    <nav class="navbar">
      <div v-if="!user?.username" class="gap">
        <router-link to="/sign-up">Sign up</router-link>
        <router-link to="/Login">Login</router-link>
      </div>
      <div v-else class="gap">
        <router-link to="/profile">Profile</router-link>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'
import { computed } from '@vue/runtime-core';

export default {
  setup () {
    const userStore = useUserStore();
    const user = computed(() => userStore.user)

    return {
      user
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
  .gap {
    display: flex;
    gap: 1.5rem;
  }
</style>
