<template>
  <footer class="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white shadow-black shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)] z-50">
  <div class="relative flex items-center justify-center px-4 py-2 sm:py-3 lg:px-8 lg:py-4 sm-px-6">
      <div class="flex items-center gap-2">
      <RouterLink to="/"><div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
          </svg>
          <span class="text-xs">HOME</span>
      </div>
      </RouterLink>

      <RouterLink to="/attendance">
          <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          </svg>
          <span class="text-xs">Attendance</span>
      </div>
      </RouterLink>
      <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
          </svg>
          <span class="text-xs">Account</span>
      </div>
      </div>
  </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid #000000; /* Garis di atas */
  border-left: 1px solid #787878; /* Garis di kiri */
  border-right: 1px solid #787878; /* Garis di kanan */
}

footer div {
  text-align: center; /* Pusatkan teks */
}

footer svg {
  width: 18px;
  height: 18px;
  margin-right: 62px;
  margin-left: 62px; /* Tambahkan jarak samping di sini */
}

span {
  margin-right: 62px;
  margin-left: 62px;
}

@media only screen and (min-width: 640px) {
  footer svg {
  /* Sesuaikan ukuran ikon untuk layar yang lebih besar */
  width: 24px;
  height: 24px;
  }
}
</style>

