<template>
  <div v-if="allWorkingTime[0]?.id">
    <table>
      <thead>
        <tr>
          <th v-for="value in columns">
            <span>{{ value }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in allWorkingTime">
          <td>
            <span>{{ item.start }}</span>
            <span>{{ item.end }}</span>
            <span>{{ item.id }}</span>
            <span>{{ item.user }}</span>
            <span><button @click="deleteWorkingTime(<number>item.id)">Delete</button></span>
            <span><button @click="update(<number>item.id)">Update</button></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script lang="ts">
import { useWorkingTime } from '@/store/workingTime';
import router from '@/router'
import { computed } from '@vue/reactivity';
import { deletedWorkingTime } from '@/helpers/workingtime-helper';

export default {
  props: {
    userId: Number
  },
  setup(props) {
    const workingTimeStore = useWorkingTime();
    const allWorkingTime = computed(() => workingTimeStore.allWorkingTime)

    workingTimeStore.getAll(<number>props.userId);

    function deleteWorkingTime(idWorkingTime: number) {
      deletedWorkingTime(idWorkingTime).then(() => workingTimeStore.getAll(<number>props.userId));
    }
    function update(id: number) {
      router.push({ name: 'UpdateWorkingTime', params: { userId: <number>props.userId, workingtimeId: id }})
    }

    return {
      allWorkingTime,
      columns: ["start", "end", "id", "userId", "Delete", "Update"],
      deleteWorkingTime,
      update,
    }
  }
}
</script>
  
<style scoped lang="css">
td>span {
  padding-left: 50px;

}
</style>
  