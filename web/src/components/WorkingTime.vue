<template>
    <div>
      <p>Workingtime</p>
    
      <div>
        Afficher tout les workingtime.
        <table>
        <thead>
          <tr>
            <th v-for="value in columns">
                <span>{{value}}</span>
            </th>
          </tr>
        </thead>
            <tbody>
            <tr v-for="items in listWorkingTime">
                <td>
                    <span>{{items.start}}</span>
                    <span>{{items.end}}</span>
                    <span>{{items.id}}</span>
                    <span>{{items.user}}</span>
                    <span><button action="del({{items.id}})"></button></span>
                </td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { reactive } from 'vue'
  import type { Workingtime } from '@/models/workingtime'
  import { useWorkingTime } from '@/store/workingTime';
  
  export default {
    data() {
        return {
            columns : ["start", "end", "id", "userId"],
        }
    },
    props: {
        
      user : {
        type : Number,
        required : true
      },
      title: String,
    },
    setup (props) {
      const data = reactive({
        workinTime: {} as Workingtime,
        userID: null,
        start: '',
        end: ''
      });
      const workingTimeStore = useWorkingTime();

      const listWorkingTime = workingTimeStore.getAll(props.user) as Array<Workingtime>;
        console.log(listWorkingTime)
        return {
            workingTimeStore,
            listWorkingTime
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
          cursor:pointer;
          background-color: rgb(240, 240, 240);
      }
      .user-btn:active {
          box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
        transform: translateY(3px);
      }
  </style>
  