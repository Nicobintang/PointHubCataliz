<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="text-sm lg:text-xl md:text-lg sm:text-md">{{ label }}</label>
    <div>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        class="border-2 border-slate-400 md:w-64 lg:w-[25rem] px-2"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLButtonElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  label: String,
  placeholder: String,
  type: String,
  id: String,
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>
