<template>
  <!-- Tampilan section dengan informasi pengguna -->
  <section class="max-w-lg p-5 mx-auto border-2 border-black -z-50">
    <!-- Baris pertama dengan informasi tanggal -->
    <div class="flex justify-between">
      <!-- Kotak info tanggal -->
      <div class="flex flex-col items-center gap-2 p-2 border-2 border-black rounded-md min-w-[13rem] mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <!-- Tanggal rentang informasi -->
        <p class="justify-self-center text-sm sm:text-md md:text-lg text-green-700">12/08/2023 - 12/08/2023</p>
      </div>

      <!-- Kotak info pengguna -->
      <div class="flex flex-col items-center gap-2 p-2 border-2 border-black rounded-md min-w-[13rem]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 h-12">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/>
        </svg>
        <!-- Nama pengguna -->
        <p class="text-sm sm:text-md md:text-lg text-green-700">{{ username }}</p>
      </div>
    </div>

    <!-- Bagian konten utama -->
    <div class="pt-5">
      <div class="min-w-[13rem] min-h-[29rem] flex flex-col gap-2 justify-center items-center">
        <!-- Tempatkan konten utama di sini -->
        <div class="flex items-center justify-center w-full h-screen p-2 text-3xl font-bold border-2 border-black rounded-md">
          <!-- Isi konten utama -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

// Menggunakan store untuk data pengguna
const { userData } = useUserStore()
const { username } = useAuthStore()
</script>
