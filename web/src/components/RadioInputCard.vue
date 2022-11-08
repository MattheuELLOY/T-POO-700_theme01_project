<template>
  <div class="card">
    <div class="title">
        {{ title }} : {{ picked }}
    </div>
    <div class="item" v-for="item in items">
        <label>{{item}}</label>
        <input type="radio" :value='item' v-model="picked" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
export default {
props: {
    title: String,
    field: String,
    table: String,
    items: Array<String>,
  },
  setup (props) {
    const picked = ref('')
    return {
        picked,
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
}

label{
    min-width: 40%;
}

</style>
