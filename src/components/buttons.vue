<template>
  <button class="px-5 py-2 bg-blue-500 rounded-sm sm:w-50 font-semibold text-white hover:bg-green-600 transition duration-300">
  {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  text: String
})

</script>
