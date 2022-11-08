<template>
  <div class="profile-content">
    <ClockManager :user-id="userId" />
    <UserVue title="Change" status="update"/>
    <UserVue title="Delete" status="delete"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue'
import UserVue from '@/components/User.vue';
import ClockManager from "@/components/ClockManager.vue";
import { getAllUsers } from '@/helpers/user-helper';
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: 'Profile',
  components: {ClockManager, UserVue},
  props: {
    userId: Number
  },
  setup() {
    const userStore = useUserStore()
    onMounted(() => {

      getAllUsers().then((response) => userStore.get(response.data.data[0].id))
    })
    const user = computed(() => userStore.user)
    return {
      user
    }
  },

})


</script>

<style scoped lang="css">
  .profile-content {
    display: flex;
  }
</style>
