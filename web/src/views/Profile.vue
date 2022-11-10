<template>
  <div class="profile-content column">
    <ClockManager :user-id="userId" />
    <UserVue title="Change" status="update"/>
    <UserVue v-if="user.role === 'admin'" title="Delete" status="delete"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted} from 'vue'
import UserVue from '@/components/User.vue';
import ClockManager from "@/components/ClockManager.vue";
import { useUserStore } from '@/store/user';
import { computed } from '@vue/reactivity';

export default defineComponent({
  name: 'Profile',
  components: {ClockManager, UserVue},
  props: {
    userId: Number
  },
  setup() {
    const userStore = useUserStore()
    const user = computed(() => userStore.user)
    onMounted(() => {
      userStore.getByToken()
    })

    return {
      user
    }
  }
})


</script>

<style scoped lang="css">
  .profile-content {
    top: 6rem;
    display: flex;
  }
</style>
