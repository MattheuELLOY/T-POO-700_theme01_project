<template>
  <div>
  Clocks Time: {{clocks.time}}
  </div>
  <div>
  Clocks Status: {{clocks.status}}
  </div>
  <div>
    Username: {{users.username}}
  </div>
  <div>
    Email: {{users.email}}
  </div>
</template>

<script>

import {useClockStore} from "@/store/clock";
import {useUserStore} from "@/store/user";
import {computed, onMounted} from "vue";

export default {
  props: {
    time: String,
    status: Boolean,
    userId: Number,
    username: String,
    email: String
  },
  setup(props){
    const clockStore = useClockStore();
    const userStore = useUserStore();
    onMounted(() => {
      clockStore.getClockByUserId(props.userId)
      userStore.get(props.userId)
    })
    const clocks = computed(() => clockStore.clock)
    const users = computed(() => userStore.user);
    return {
      clocks,
      users
    }
  }
}
</script>