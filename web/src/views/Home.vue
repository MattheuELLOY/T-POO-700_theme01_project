<template>
  <h1>{{  }}</h1>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user';

export default {
  setup () {
    const userStore = useUserStore();
    console.log(userStore.user)
  }
}
</script>

<style scoped lang="css">
</style>
