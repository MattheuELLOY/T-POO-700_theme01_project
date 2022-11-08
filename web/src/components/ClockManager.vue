<template>
  <div class="card">
    <div>
      <div class=" p-10" style="cursor: auto;">
        <div>
          <img src="/src/assets/userLogo.png">
        </div>
        <div>
          {{user.email}}
        </div>
        <div>Hello, {{user.username}}.</div>

        <div>Time: {{clocks.time}}</div>

        <div>
          <a :href=" 'http://localhost:5173/workingTimes/'+user.id ">My WorkingTimes</a>
          <div >
            <label v-if="clocks.status==true" >
              <input @click="onClick" type="checkbox" value="{{clocks.status}}" id="yellow-toggle" checked>
              <span>Active</span>
            </label>
            <label v-if="clocks.status!=true" for="yellow-toggle">
              <input @click="onClick" type="checkbox" value="{{clocks.status}}" id="yellow-toggle" >
              <span>Inactive</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

import {useClockStore} from "@/store/clock";
import {useUserStore} from "@/store/user";
import {useWorkingTime} from "@/store/workingTime";
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
    const workingTimeStore = useWorkingTime();


    onMounted(() => {
      clockStore.getClockByUserId(props.userId)
      userStore.get(props.userId)
    });

    const clocks = computed(() => clockStore.clock)
    const user = computed(() => userStore.user)

      function onClick() {
        createClock()
      };
      function createClock() {
          createClockByUserId(user.value.id).then(() => clockStore.getClockByUserId(user.value.id))
      };

      // const startTime = clocks.value.time.split('T')[1];

      return {
        clocks,
        user,
        onClick
      };
    }
}
</script>

<style>
.card {
  background: #282E3C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  color: #FDFF00;
  padding: 10px;
  margin-bottom: 10px;
  width: 95%;
}
</style>