<template>
  <!-- Modal untuk menambah tag lokasi baru -->
  <div class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none">
    <!-- Kontainer utama modal -->
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <!-- Header modal dengan judul dan tombol close -->
      <div class="flex justify-between p-5 shadow-md">
        <h1 class="text-3xl font-bold">New Tag</h1>
        <!-- Tombol close modal -->
        <font-awesome-icon :icon="['fas', 'times']" class="text-3xl cursor-pointer" @click.prevent="openModal" />
      </div>

      <!-- Isi modal dengan input nama dan tombol simpan -->
      <div class="flex flex-col gap-6 p-5">
        <!-- Bagian input untuk nama tag -->
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-semibold">Name</h1>
          <!-- Input untuk memasukkan nama tag -->
          <input v-model="inputValue" type="text" placeholder="Rumah" class="border-[1px] border-black p-2 rounded-sm" />
        </div>

        <!-- Tombol untuk menyimpan data -->
        <button @click.prevent="saveData" class="p-2 text-white bg-blue-600">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useLocationDataStore } from '@/stores/LocationData'

// Menggunakan emitters untuk mengirim sinyal ke komponen induk
const emit = defineEmits(['openModal', 'storeLocationData'])

// Fungsi untuk menutup modal
function openModal() {
  emit('openModal', false)
}

// Menggunakan store untuk data lokasi
const { LocationData } = useLocationDataStore()

// Referensi untuk menyimpan nilai input
const inputValue = ref('')

// Fungsi untuk menyimpan data ke dalam store
const saveData = () => {
  LocationData.push({
    id: LocationData.length + 1,
    name: inputValue.value
  })
}
</script>
