<template>
  <!-- Komponen Tag Location -->
  <div class="flex flex-col w-full gap-3 md:gap-2">
    <!-- Judul -->
    <h1 class="text-lg font-bold lg:text-3xl md:text-2xl sm:text-xl">Tag Location</h1>

    <!-- Daftar lokasi dengan opsi pemilihan dan tombol "New Tag" -->
    <div class="p-2 border-2 border-black">
      <!-- Loop untuk menampilkan setiap lokasi -->
      <div v-show="LocationData.length > 0" v-for="data in LocationData" @change.prevent="storeLocationData" class="mb-2">
        <!-- Input radio untuk pemilihan lokasi -->
        <div class="flex items-center">
          <input

            type="radio"
            :value="data"
            class="text-sm bg-gray-500 border-[1px] border-black me-1"
            name="address"
            v-model="selectedTag"
          />
          <!-- Label untuk menampilkan nama lokasi -->
          <label >{{ data.name }}</label>
        </div>
      </div>

      <!-- Tombol untuk menambah lokasi baru -->
      <button class="border-black border-[1px] p-1 text-sm rounded-sm bg-gray-400 w-full" @click.prevent="openModal">New Tag</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { useLocationDataStore } from '@/stores/LocationData'

// Mendefinisikan properti yang diterima
defineProps({
  modalIsOpened: Boolean
})

// Menggunakan emitters untuk mengirim sinyal ke komponen induk
const emit = defineEmits(['openModal', 'storeLocationData'])

// Menggunakan store untuk data lokasi
const { LocationData } = useLocationDataStore()

// Membuat referensi untuk menyimpan lokasi terpilih
const selectedTag = ref('')

// Fungsi untuk membuka modal tambah lokasi baru
const openModal = () => {
  emit('openModal', true)
}

// Fungsi untuk menyimpan data lokasi terpilih
const storeLocationData = () => {
  emit('storeLocationData', selectedTag.value)
}
</script>
