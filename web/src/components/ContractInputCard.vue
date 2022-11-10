<template>
  <div class="card">
    <div class="title">
        Contract : {{ dailyHours * dayPerWeek}} hours/week
    </div>
    <div class="groupItem">
      <div class="item">
        <label>Daily Hours :</label>
        <input v-model='dailyHours' placeholder="edit me" />
      </div>
      <div class="item">
        <label>Day per Week :</label>
        <input v-model='dayPerWeek' placeholder="edit me" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
export default {
  setup (props) {
    const dailyHours = ref(0);
    const dayPerWeek = ref(0);
      return {
        dailyHours,
        dayPerWeek
    }
  }
}
</script>

<style scoped lang="css">
.card{
    background-color: #282E3C;
    background: #282E3C;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    color: #FDFF00;
    padding: 10px;
    margin-bottom: 10px;
    width: 95%;
}.title{
    font-style: normal;
    font-weight: 750;
    font-size: 16px;
    padding-bottom: 5px;
}
.item{
    font-style: normal;
    font-weight: 750;
    font-size: 13px;
    padding-bottom: 3px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    align-items: center;
}

.groupItem{
  display: flex;
  flex-direction:row;
}

input{
  width: 60%;
  color: #505C7C;
  background: #FDFF00;
  border-radius: 5px;
  text-align: center;
}

</style>
