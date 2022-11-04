<template>
  <div class="content card-workingtime">
    <div>
      <h1>Working time for:</h1>
      <h2 style="text-align: center">{{ user.username }}</h2>
    </div>
    <div>
      <h2>Start :</h2>
      <input class="workingtime-input" type="datetime-local" v-model="start" />
    </div>
    <div>
      <h2>End :</h2>
      <input class="workingtime-input" type="datetime-local" v-model="end" />
    </div>
    <button class="workingtime-btn" @click="manageWorkingTime(start, end)">Validate</button>
    <el-moment v-model="start" format="MMMM Do YYYY, h:mm:ss a">
      <el-date-picker></el-date-picker>
    </el-moment>
  </div>
</template>
  
<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import moment from 'moment'
import { postWorkingTime, putWorkingTime } from '@/helpers/workingtime-helper';
import { useUserStore } from '@/store/user';
import { computed } from '@vue/reactivity';

export default {
  props: {
    userId: Number,
    workingtimeId: Number,
  },
  setup(props) {
    const data = reactive({
      start: 0 as number,
      end: 0 as number
    });

    const userStore = useUserStore()
    const user = computed(() => userStore.user)

    onMounted(() => {
      userStore.get(<number>props.userId)
    })

    // Mes méthoes
    function manageWorkingTime(start: Date, end: Date) {
      const startStr = moment(start).format('YYYY-MM-DD HH:mm:ss')
      const endtStr = moment(end).format('YYYY-MM-DD HH:mm:ss')

      if (data.start && data.end) {
        if (props.workingtimeId) {
          putWorkingTime(<number>props.workingtimeId, startStr, endtStr)
        } else {
          postWorkingTime(user.value.id, startStr, endtStr)
        }
        data.start = 0
        data.end = 0
      }
    }

    return {
      // Mes vars et méthodes à redonner au html
      user,
      ...toRefs(data),
      manageWorkingTime
    }
  }
}
</script>
  
<style scoped lang="css">
.content {
  min-width: 30rem;
  min-height: 23rem;

  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.card-workingtime {
  flex-direction: column;

  border: 0px solid;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.workingtime-input {
  padding: 7px;
  border: 2px solid gainsboro;
  background-color: white;
  border-radius: 15px;
}

.workingtime-btn {
  padding: 10px;
  border: 2px solid gainsboro;
  background-color: white;
  border-radius: 15px;
}

.workingtime-btn:hover {
  cursor: pointer;
  background-color: rgb(240, 240, 240);
}

.workingtime-btn:active {
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  transform: translateY(3px);
}

td>span {
  padding-left: 50px;
}
</style>