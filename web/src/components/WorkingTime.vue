<template>
  <div class="content card column">
    <div>
      <h2 class="white-text">Working Time For :</h2>
      <h3 class="white-text" style="text-align: center">{{ user.username }}</h3>
    </div>
    <div>
      <input class="input" type="datetime-local" v-model="start" />
    </div>
    <div>
      <input class="input" type="datetime-local" v-model="end" />
    </div>
    <button class="btn" @click="manageWorkingTime(start, end)">Validate</button>
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
      start: '' as string,
      end: '' as string
    });

    const userStore = useUserStore()
    const user = computed(() => userStore.selectedUser)
    userStore.getSelected(<number>props.userId)

    onMounted(() => {
        userStore.getSelected(<number>props.userId)
    })

    // Mes méthoes
    function manageWorkingTime(start: string, end: string) {
      const startStr = moment(start).format('YYYY-MM-DD HH:mm:ss')
      const endtStr = moment(end).format('YYYY-MM-DD HH:mm:ss')

      if (data.start && data.end) {
        if (props.workingtimeId) {
          putWorkingTime(<number>props.workingtimeId, startStr, endtStr)
        } else {
          postWorkingTime(user.value.id, startStr, endtStr)
        }
        data.start = ''
        data.end = ''
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

td>span {
  padding-left: 50px;
}
</style>