<template>
  <div>
    <div>
      <RadioInputCard :title="'Working Times Filling Mode'" :items="['Manually', 'By Click']" :field="'filling_mode'" :table="'Parameters'"/>
    </div>
    <div>
      <ContractInputCard/>
    </div>
    <div>
      <RadioInputCard :title="'Allowed to modify Working Times'" :items="['Yes', 'No']" :field="'allowed_to_modify_WT'" :table="'Parameters'"/>
    </div>
    <div>
      <RadioInputCard :title="'Role'" :items="['Employee', 'Manager', 'Administrator']" :field="'role'" :table="'Users'"/>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  import RadioInputCard from '@/components/RadioInputCard.vue';
  import ContractInputCard from '@/components/ContractInputCard.vue';
</script>

<style scoped lang="css">

</style>
