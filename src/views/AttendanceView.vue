<template>
  <section id="attendance">
    <!-- Komponen untuk menambahkan tag baru -->
    <NewTagSection v-show="modalIsOpened" @openModal="openModal" />

    <!-- Bagian untuk foto -->
    <div class="flex flex-col items-start max-w-lg gap-3 p-5 mx-auto border-2 border-black md:gap-2 -z-50">
      <Camera @storePhotoUrl="storePhotoUrl" />

      <!-- Peta untuk menunjukkan lokasi -->
      <googlemap @latLngData="storeLatLngData" />

      <!-- Komponen untuk menambahkan tag lokasi -->
      <TagLocation @openModal="openModal" @storeTagData="storeTagData" />

      <!-- Tombol untuk mengirim data -->
      <button @click.prevent="handleSubmit" class="w-full p-1 text-center text-white bg-green-600 rounded-sm md:p-2 md:text-xl sm:text-lg text-md">Submit</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, type Ref, defineEmits } from 'vue'
import { useToast, POSITION } from 'vue-toastification'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import Camera from '@/components/Camera.vue'
import googlemap from '@/components/googlemap.vue'
import TagLocation from '@/components/TagLocation.vue'
import NewTagSection from '@/components/NewTagSection.vue'

// Tipe data untuk koordinat geografis
interface LatLng {
  lat: number
  lng: number
}

// Tipe data untuk data pengguna
interface UserData {
  id: number
  photoUrl: string | null
  latLng: LatLng | null
  tag: string | null
  date: string
  time: string
  email: string
  username: string
}

// Penggunaan ref untuk variabel reaktif
const modalIsOpened = ref(false)
const latLngData: Ref<LatLng | null> = ref(null)
const tagData: Ref<string | null> = ref(null)
const photoUrl: Ref<string | null> = ref(null)
const userStore = useUserStore()
const { emailUser, username } = useAuthStore()

// Penggunaan Toast untuk memberikan umpan balik kepada pengguna
const toast = useToast()
const emits = defineEmits(['latLngData'])

// Fungsi untuk menampilkan Toast
const showToast = (type: 'success' | 'error') => {
  const options = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    draggable: true,
    draggablePercent: 60,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    title: type === 'success' ? 'Success' : 'Error',
    description: 'Some description' // Gantilah dengan deskripsi yang sesuai
  }
  toast[type](options)
}

// Fungsi untuk menyimpan URL foto
const storePhotoUrl = (url: string) => {
  photoUrl.value = url
}

// Fungsi untuk membuka atau menutup modal
const openModal = (value: boolean) => {
  modalIsOpened.value = value
}

// Fungsi untuk menyimpan data koordinat geografis
const storeLatLngData = (latLng: LatLng) => {
  latLngData.value = latLng
  emits('latLngData', latLng)
}

// Fungsi untuk menyimpan data tag
const storeTagData = (tag: string) => {
  tagData.value = tag
}

// Fungsi untuk mendapatkan tanggal dan waktu saat ini
const getCurrentDateTime = () => {
  const currentDate = new Date()
  return {
    date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
    time: `${currentDate.getHours()}:${currentDate.getMinutes()}`
  }
}

// Fungsi untuk menangani pengiriman data
const handleSubmit = () => {
  if (photoUrl.value && latLngData.value && tagData.value) {
    // Membuat objek data pengguna
    const { date, time } = getCurrentDateTime()
    const userData: UserData = {
      id: userStore.userData.length + 1,
      photoUrl: photoUrl.value,
      latLng: latLngData.value,
      tag: tagData.value,
      date,
      time,
      email: emailUser,
      username
    }

    // Menambahkan data pengguna ke penyimpanan pengguna
    userStore.userData.push(userData)
    showToast('success')

    // Mengatur ulang nilai-nilai
    latLngData.value = null
    photoUrl.value = null
    tagData.value = null
  } else {
    showToast('error')
  }
}
</script>
