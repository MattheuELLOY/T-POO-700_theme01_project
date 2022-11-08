<template>
  <div class="content card column gap-profile">
    <img class="img" src="/src/assets/bat.png">
    <div style="padding-top: 0.5rem;">
      <h2 class="white-text">Clock Manager For :</h2>
      <h3 class="white-text" style="text-align: center">{{ user.username }}</h3>
    </div>
    <div class="time">
      <img class="icon" src="@/assets/clock.png">
      <div class="border-middle" ></div>
      <h4 v-if="clocks.time" class="white-text">
        {{ moment(clocks.time).format("HH:mm:ss dddd Do MMMM YYYY") }}
      </h4>
    </div>
    <label>
      <input @click="onClick" type="checkbox" v-model="clocks.status">
      <span class="white-text">{{ textCheckbox }}</span>
    </label>
  </div>

</template>


<script lang="ts">

import moment from "moment";
import {useClockStore} from "@/store/clock";
import {useUserStore} from "@/store/user";
import {computed, onMounted, reactive, toRefs} from "vue";
import {createClockByUserId} from "@/helpers/clock-helpers";

export default {
  props: {
    userId: Number,
  },
  setup (props) {
    const data = reactive({
      textCheckbox: '' as string
    })
    const clockStore = useClockStore();
    const userStore = useUserStore();

    const clocks = computed(() => clockStore.clock)
    const user = computed(() => userStore.user)


    onMounted(() => {
      var id: number = 0
      userStore.getByToken().then(() => {
        id = (props.userId) ? props.userId : user.value.id
        clockStore.getClockByUserId(id).then(() => changeTextCheckBox())
      })
    });

    function onClick() {
      createClockByUserId(user.value.id).then(() => clockStore.getClockByUserId(user.value.id)).then(() => changeTextCheckBox())
    };
    function changeTextCheckBox(): void {
      data.textCheckbox = (clocks.value.status === false) ? 'Inactive' : 'Active'
    }

    // const startTime = clocks.value.time.split('T')[1];

    return {
      moment,
      ...toRefs(data),
      clocks,
      user,
      onClick
    };
  }
}
</script>

<style>
.img {
  position: absolute;
	top: 0;
	margin-top: -2.5rem;
  width: 8.5rem;
}
.gap-profile {
  gap: 1rem !important;
}
.time {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  max-width: 12rem;
  text-align: center;
  overflow-wrap: break-word;
  border: 1px solid;
  border-radius: 4px;
  border-color: var(--color-shadow-yellow-bat);
}
.border-middle {
  min-height: 3rem;
  border-left: 1px solid;
  border-color: var(--color-shadow-yellow-bat);
}
</style>