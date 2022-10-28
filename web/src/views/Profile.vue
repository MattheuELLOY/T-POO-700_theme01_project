<template>
  <div class="profile-content">
    <UserVue title="Change" status="update"/>
    <UserVue title="Delete" status="delete"/>
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
