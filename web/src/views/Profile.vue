<template>
  <div class="profile-content">
    <ClockManager :user-id="userId" />
    <UserVue title="Change" status="update"/>
    <UserVue title="Delete" status="delete"/>
  </div>
</template>

<script>
import UserVue from '@/components/User.vue';
import ClockManager from "@/components/ClockManager.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ClocksVue',
  components: {ClockManager, UserVue},
  props: {
    userId: Number
  }
})
</script>

<style scoped lang="css">
.profile-content {
  display: flex;
  gap: 5rem;
}
</style>
