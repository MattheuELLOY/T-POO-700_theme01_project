<template>
  <div class="profile-content">
    <UserVue title="Change" status="update"/>
    <UserVue title="Delete" status="delete"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted} from 'vue'
import UserVue from '@/components/User.vue';
import { useUserStore } from '@/store/user';
import { getAllUsers } from '@/helpers/user-helper';

export default defineComponent({
  name: 'Profile',
  components: {
    UserVue
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
