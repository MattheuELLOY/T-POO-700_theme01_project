<template>
  <div>
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
            <span><button v-on:click="deleteWorkingTime(item.id)">Delete</button></span>
            <span><button v-on:click="update(item.id)">Update</button></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script lang="ts">
import { reactive } from 'vue'
import type { Workingtime } from '@/models/workingtime'
import { useWorkingTime } from '@/store/workingTime';
import router from '@/router'
import { computed, toRefs } from '@vue/reactivity';
import { deletedWorkingTime } from '@/helpers/workingtime-helper';

export default {
  props: {
    userid: Number
  },
  setup(props) {
    const data = reactive({
      workinTime: {} as Workingtime,
      userID: null,
      start: '',
      end: '',
      listWorkingTime: {} as Array<Workingtime>,
      columns: ["start", "end", "id", "userId", "Delete", "Update"],
    });
    const workingTimeStore = useWorkingTime();
    const allWorkingTime = computed(() => workingTimeStore.allWorkingTime)

    workingTimeStore.getAll(<number>props.userid);

    function deleteWorkingTime(idWorkingTime: number) {
      deletedWorkingTime(idWorkingTime);
    }
    function update(id: number) {
      router.push({ name: 'workingtime', params: { status: 'edit' }})
    }

    return {
      allWorkingTime,
      ...toRefs(data),
      deleteWorkingTime,
      update,
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

.card-user {
  flex-direction: column;

  border: 0px solid;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.user-input {
  padding: 7px;
  border: 2px solid gainsboro;
  background-color: white;
  border-radius: 15px;
}

.user-btn {
  padding: 10px;
  border: 2px solid gainsboro;
  background-color: white;
  border-radius: 15px;
}

.user-btn:hover {
  cursor: pointer;
  background-color: rgb(240, 240, 240);
}

.user-btn:active {
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  transform: translateY(3px);
}

td>span {
  padding-left: 50px;

}
</style>
  