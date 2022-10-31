<template>
  <div class = "content card-clock">
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
  <button  class = "clock-btn" @click="onClick">
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
.content {
  min-width: 30rem;
  min-height: 23rem;

  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.card-clock {
  flex-direction: column;

  border: 0px solid;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.clock-btn {
  padding: 10px;
  border: 2px solid gainsboro;
  background-color: white;
  border-radius: 15px;
}
.clock-btn:hover {
  cursor:pointer;
  background-color: rgb(240, 240, 240);
}
.clock-btn:active {
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  transform: translateY(3px);
}
</style>