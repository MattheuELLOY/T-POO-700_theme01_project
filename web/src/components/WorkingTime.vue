<template>
    <div>
      <p>Workingtime</p>
    
      <div>
        
        <h2>CREATE NEW WORKING TIME</h2>
        <input type="date" v-model="data.start" />
        <input type="date" v-model="data.end" />
        <button @click="manageWorkingTime(data.start, data.end)">VALIDATE</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { reactive } from 'vue'
  import { useWorkingTime } from '@/store/workingTime';
    import { useUserStore } from '@/store/user';


  export default {
    props: {
        
      idWorkingTime : {
        type : Number,
        required : false
      },
    },
    setup (props) {
        const data = reactive({
        start : new Date(),
        end : new Date()
        });

        const workingTimeStore = useWorkingTime();
        const userStore = useUserStore();

        // Mes méthoes
        function manageWorkingTime(start : Date, end : Date){

            //userStore.user.id
            if ( props.idWorkingTime){
                workingTimeStore.put(props.idWorkingTime, start, end)
                console.log("put")

            } else {
                workingTimeStore.post(1, start, end)
                console.log("post")

            }
        }
        return {
            // Mes vars et méthodes à redonner au html
            manageWorkingTime,
            data,
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

      td > span {
        padding-left: 50px;

      }
  </style>
  