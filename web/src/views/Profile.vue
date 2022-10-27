<template>
  <div class="profile-content">
    <UserVue title="Change"/>
    <UserVue title="Delete"/>
  </div>
</template>

<script setup lang="ts">
import UserVue from '@/components/User.vue';
</script>

<style scoped lang="css">
  .profile-content {
    display: flex;
    gap: 5rem;
  }
</style>
