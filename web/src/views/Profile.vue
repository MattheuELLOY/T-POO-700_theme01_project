<template>
  <div class="profile-content">
    <ClockManager :user-id="userId" />
    <UserVue title="Change" status="update"/>
    <UserVue title="Delete" status="delete"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted} from 'vue'
import UserVue from '@/components/User.vue';
import ClockManager from "@/components/ClockManager.vue";

export default defineComponent({
  name: 'ClocksVue',
  components: {ClockManager, UserVue},
  props: {
    userId: Number
  }
})
import { getAllUsers } from '@/helpers/user-helper';
import { useUserStore } from '@/store/user';
export default defineComponent({
  name: 'Profile',
    UserVue
  components: {
  },
  setup() {
    const userStore = useUserStore()
    onMounted(() => {

      getAllUsers().then((response) => userStore.get(response.data.data[0].id))
    })
  }
})
</script>

<style scoped lang="css">
  .profile-content {
    display: flex;
    flex-direction: column;
  }
</style>
