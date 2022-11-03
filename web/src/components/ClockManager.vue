<template>
  <div class="container w-full">
    <div style='background-color:rgb(255, 255, 255)'>
      <div class=" p-10" style="cursor: auto;">
        <div class="w-28 mx-auto relative -mt-24">
          <img class="-mt-1" src="/src/assets/userLogo.png">
        </div>
        <div class="text-center">
          {{user.email}}
        </div>
        <div class="mb-10 mt-5">Hello, {{user.username}}. Today you have been working for</div>
        <div class="mb-10 mt-10">I start my day at: {{workingtime.start}}</div>
        <div class="flex items-center justify-between">
          <a class="text-xs text-gray-400 mr-1 hover:text-gray-800" href="#">My WorkingTimes</a>
          <div class="w-1/2">
            <label v-if="clocks.status==true" for="yellow-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input @click="onClick" type="checkbox" value="{{clocks.status}}" id="yellow-toggle" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
            </label>
            <label v-if="clocks.status!=true" for="yellow-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input @click="onClick" type="checkbox" value="{{clocks.status}}" id="yellow-toggle" class="sr-only peer" >
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</span>
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
    const workingtime = computed(() => workingTimeStore.allWorkingTime)

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
        workingtime,
        onClick
      };
    }
}
</script>

<style>
.container {
  flex-direction: column;

  border: 0px solid;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>