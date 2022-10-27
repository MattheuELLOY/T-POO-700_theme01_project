<template>
  <h1>home vue</h1>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user';

export default {
  setup () {
    const userStore = useUserStore();
  }
}
</script>

<style scoped lang="css">
</style>
