<template>
  <h1>home vue</h1>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user';

export default {
  setup () {
    const userStore = useUserStore();
    console.log(userStore.user)
    console.log("Je suis là")
  }
}
</script>

<style scoped lang="css">
</style>
