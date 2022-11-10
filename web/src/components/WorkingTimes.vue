<template>
  <div class="container">
    <ul class="responsive-table">
      <li class="table-header">
          <th>
            <div class="col col-1">start</div>
            <div class="col col-2">end</div>
            <div class="col col-3">id</div>
            <div class="col col-4">userId</div>
            <div class="col col-5">Delete</div>
            <div class="col col-6">Update</div>
          </th>
      </li>
      <li class="table-row" v-for="item in allWorkingTime">
        <div class="col col-1" data-label="start">{{item.start}}</div>
        <div class="col col-2" data-label="end">{{item.end}}</div>
        <div class="col col-3" data-label="id">{{item.id}}</div>
        <div class="col col-4" data-label="userId">{{item.user}}</div>
        <button class="col col-5" style="background-color: #282e3c;" @click="deleteWorkingTime(<number>item.id)">Delete</button>
        <button class="col col-6" style="background-color: #505c7c;" @click="update(<number>item.id)">Update</button>
      </li>
    </ul>
  </div>
      <button style="background-color: #505c7c;" v-on:click="createWorkingTime()">Create</button>

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

    function createWorkingTime(){
      router.push({ name: 'workingtime', params: { status: 'new' }})
    }

    return {
      allWorkingTime,
      columns: ["start", "end", "id", "userId", "Delete", "Update"],
      deleteWorkingTime,
      createWorkingTime,
      update,
    }
  }
}
</script>
  
<style scoped lang="css">
body {
	 font-family: 'lato', sans-serif;
   color: black;
}
 .container {
  margin-top: 10%;
	 width: 1000px;
	 margin-left: auto;
	 margin-right: auto;
	 padding-left: 10px;
	 padding-right: 10px;
}
 h2 {
	 font-size: 26px;
	 margin: 20px 0;
	 text-align: center;
}

li div{
  color: black;
}

button{
  padding: 0.5em;
  border: 20px #6c7a89 ;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

 h2 small {
	 font-size: 0.5em;
}
 .responsive-table li {
	 border-radius: 3px;
	 padding: 25px 30px;
	 display: flex;
	 justify-content: space-between;
	 margin-bottom: 25px;
}
 .responsive-table .table-header {
	 background-color: #988829;
	 font-size: 14px;
	 text-transform: uppercase;
	 letter-spacing: 0.03em;
}
 .responsive-table .table-row {
	 background-color: #fff;
	 box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}
 .responsive-table .col-1 {
	 flex-basis: 30%;
}
 .responsive-table .col-2 {
	 flex-basis: 30%;
}
 .responsive-table .col-3 {
	 flex-basis: 10%;
}
 .responsive-table .col-4 {
	 flex-basis: 10%;
}
.responsive-table .col-5 {
	 flex-basis: 10%;
   height: 100%;
  width: 100%;
}
.responsive-table .col-6 {
	 flex-basis: 10%;
}
 @media all and (max-width: 767px) {
	 .responsive-table .table-header {
		 display: none;
	}
	 .responsive-table li {
		 display: block;
	}
	 .responsive-table .col {
		 flex-basis: 100%;
	}
	 .responsive-table .col {
		 display: flex;
		 padding: 10px 0;
	}
	 .responsive-table .col:before {
		 color: #6c7a89;
		 padding-right: 10px;
		 content: attr(data-label);
		 flex-basis: 50%;
		 text-align: right;
	}
}
</style>
  