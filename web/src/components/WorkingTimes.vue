<template>
  <div class="container card">
    <ul class="responsive-table flex column white-text">
      <li class="table-header flex">
          <th class="flex center">
            <div class="col col-1">Start</div>
            <div class="col col-1">End</div>
            <div class="col col-2"></div>
            <div class="col col-2">
              </div>
          </th>
      </li>
      <li class="table-row flex gap" v-for="item in allWorkingTime">
        <div class="col col-1" data-label="start">{{ moment(item.start).format("YYYY-MM-DD, HH:mm:ss") }}</div>
        <div class="col col-1" data-label="end">{{ moment(item.end).format("YYYY-MM-DD, HH:mm:ss") }}</div>
        <button class="col col-2 btn" @click="deleteWorkingTime(<number>item.id)"><img class="icon" src="@/assets/trash.png"></button>
        <button class="col col-2 btn" @click="update(<number>item.id)"><img class="icon" src='@/assets/pen.png'></button>
      </li>
    </ul>
  </div>
</template>
  
<script lang="ts">
import { useWorkingTime } from '@/store/workingTime';
import router from '@/router'
import { computed } from '@vue/reactivity';
import { deletedWorkingTime } from '@/helpers/workingtime-helper';
import moment from 'moment';

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

    function createWorkingTime() {
      router.push({ name: 'workingtime', params: { status: 'new' }})
    }

    return {
      allWorkingTime,
      deleteWorkingTime,
      createWorkingTime,
      update,
      moment
    }
  }
}
</script>
  
<style scoped lang="css">
.flex {
  display: flex;
}
.row {
  flex-direction: row;
}
.center {
  align-items: center;
  justify-content: center;
}
.container {
  min-width: 60rem;
  max-height: 40rem;
  overflow: scroll;
  overflow-x: auto;
}
.card {
  border-top: none;
  box-shadow: none;
}
.card:hover {
  box-shadow: none;
}
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color-yellow-bat); 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--color-shadow-yellow-bat); 
}
.table-header {
  border: 2px solid;
  border-color: var(--color-yellow-bat);
}
.col {
  text-align: center;
}
.responsive-table .col-1 {
  flex-basis: 30%;
}
 .responsive-table .col-2 {
	 flex-basis: 3rem;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  border-radius: 4px;
  border-bottom: 1.5px solid;
  border-color: var(--color-yellow-bat);
}
li:hover {
  border-color: var(--color-shadow-yellow-bat);
}
.icon {
  width: 1.30rem;
}
.btn {
  border-color: var(--color-shadow-yellow-bat);
}
.btn:hover {
  border-color: var(--color-yellow-bat);
}
</style>
  