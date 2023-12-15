<template>
  <div class="flex flex-col w-full gap-3 md:gap-2">
    <!-- Judul Halaman -->
    <h1 class="text-lg font-bold lg:text-3xl md:text-2xl sm:text-xl">Photo</h1>

    <!-- Dropdown untuk Pemilihan Kamera -->
    <Listbox v-model="selectedCamera">
      <ListboxButton
        class="flex justify-between w-full p-2 text-left border-2 border-black rounded-sm">
        <p class="text-md md:text-lg">{{ selectedCamera.name }}</p>
      </ListboxButton>

      <ListboxOptions class="w-full border-2 border-black shadow-lg inset-4">
        <ListboxOption
          v-for="camera in cameras"
          :key="camera.id"
          :value="camera"
          class="cursor-pointer hover:bg-blue-300"
          @input.prevent="handleCameraSelection">
          <p class="p-2">{{ camera.name }}</p>
        </ListboxOption>
      </ListboxOptions>
      
    </Listbox>

    <!-- Tampilan pratinjau kamera atau ikon kamera -->
    <div class="flex items-center justify-center h-auto min-w-full border-2 border-black">
      <p v-if="!cameraIsOn">
        <!-- Ikon Kamera -->
        <font-awesome-icon :icon="['fas', 'camera']" class="text-7xl"></font-awesome-icon>
      </p>
      <p v-else>
        <!-- Video dari Kamera -->
        <video ref="videoElement" class="w-full h-auto" autoplay></video>
      </p>
    </div>

    <!-- Tampilkan gambar yang diambil -->
    <img v-if="capturedImage" :src="capturedImage" alt="Captured Image" class="w-full h-auto" />

    <!-- Tombol untuk Mengambil Gambar -->
    <button class="min-w-full p-1 text-center text-white bg-blue-800 md:p-2 text-md sm:text-lg md:text-xl" @click.prevent="captureImage">
      Capture
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect, defineEmits } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'

// Konstanta untuk Jenis-jenis Kamera
const cameras = [
  { id: 1, name: 'FRONT CAMERA', type: 'front' },
  { id: 2, name: 'BACK CAMERA', type: 'back' }
]

// Variabel Reaktif
const selectedCamera = ref(cameras[0])
const cameraIsOn = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)
const capturedImage = ref<string | null>(null)
const emit = defineEmits(['storePhotoUrl'])

// Hooks untuk Siklus Hidup Komponen
onMounted(() => {
  startCamera()
})

onBeforeUnmount(() => {
  stopCamera()
})

// Fungsi-fungsi
const startCamera = async () => {
  cameraIsOn.value = true
  try {
    // Mengakses perangkat kamera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: selectedCamera.value.type }
    })
    if (videoElement.value) {
      // Menetapkan objek aliran ke elemen video
      videoElement.value.srcObject = stream
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
  }
}

const captureImage = () => {
  if (videoElement.value) {
    // Membuat elemen canvas untuk menggambar gambar
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (context) {
      // Menetapkan ukuran canvas sesuai ukuran video
      canvas.width = videoElement.value.videoWidth
      canvas.height = videoElement.value.videoHeight
      // Menggambar frame video pada canvas
      context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height)
      // Mendapatkan data URL gambar dalam format PNG
      capturedImage.value = canvas.toDataURL('image/png')
      // Mengirimkan data URL ke komponen induk
      emit('storePhotoUrl', capturedImage.value)
    }
  }
}

const stopCamera = () => {
  const stream = videoElement.value?.srcObject as MediaStream | null
  if (stream) {
    // Menghentikan semua trek pada aliran
    const tracks = stream.getTracks()
    tracks.forEach((track) => track.stop())
  }
}

const switchCamera = () => {
  // Menghentikan kamera saat ini dan memulai kamera baru
  stopCamera()
  startCamera()
}

// Mengamati perubahan pada selectedCamera dan mengganti kamera sesuai
watchEffect(switchCamera)

// Menangani pemilihan kamera
const handleCameraSelection = () => {
  console.log(selectedCamera)
}
</script>
