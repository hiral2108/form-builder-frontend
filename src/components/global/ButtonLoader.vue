<template>
    <div class="loader w-4.5 h-4.5 animate-spin border-2 border-white rounded-full border-b-transparent" :class="classes" >

    </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    classes?: any
  }>(),
  {
    classes: []
  }
)
</script>

<style scoped>

</style>
