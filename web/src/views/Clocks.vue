<template>
  <div>
    <ClockManager :user-id="userId"/>
  </div>
</template>

<script lang="ts">
  import ClockManager from '@/components/ClockManager.vue'
  import { defineComponent } from "vue";

export default defineComponent({
  name: 'ClocksVue',
  components: { ClockManager },
    props: {
      userId: Number
    }
  })
</script>