<template>
  <div class = "content card column">
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
  <button  class = "btn" @click="onClick">
    Create Clock
  </button>
  </div>
</template>

<script>

import {useClockStore} from "@/store/clock";
import {useUserStore} from "@/store/user";
import {computed, onMounted} from "vue";
import {createClockByUserId} from "@/helpers/clock-helpers";

export default {
  props: {
    time: String,
    status: Boolean,
    userId: Number,
    username: String,
    email: String
  },
  setup (props) {
    const clockStore = useClockStore();
    const userStore = useUserStore();
    onMounted(() => {
      clockStore.getClockByUserId(props.userId)
      userStore.get(props.userId)
    });
    const clocks = computed(() => clockStore.clock)
    const users = computed(() => userStore.user)

      function onClick() {
        createClock()
        console.log(props.userId)
      };
      function createClock() {
        createClockByUserId(props.userId).then(() => clockStore.getClockByUserId(props.userId))
      };

      return {
        clocks,
        users,
        onClick
      };
    }
}
</script>
<style>
</style>