<template>
  <div class="flex flex-col w-full gap-3 md:gap-2">
    <h1 class="text-3xl font-bold">Location</h1>
    <div ref="mapDiv" id="map" class="w-full h-64"></div>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/map'
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted, onUnmounted, ref, defineEmits } from 'vue'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// kunci API Google Maps
const apiKey = 'AIzaSyDKNvZnlF_ZblRewkskT7h3vK1640qWCiU'

// Inisialisasi loader untuk Google Maps API
const loader = new Loader({
  apiKey,
  version: 'weekly'
})

// Menggunakan store untuk mendapatkan data geolocation
const { useGeolocation } = useMapStore()
const { coords } = useGeolocation()

// Ref untuk elemen peta dan objek peta
const mapDiv = ref<HTMLDivElement | null>(null)
const map = ref<google.maps.Map | null>(null)

// Array untuk menyimpan marker
const markers: google.maps.Marker[] = []

// Emit untuk mengirimkan data latLng
const emits = defineEmits(['latLngData'])

// Inisialisasi peta
const initializeMap = async () => {
  if (mapDiv.value) {
    // Membuat objek peta dengan API Loader
    map.value = await loader.importLibrary('maps').then(
      (maps) =>
        new maps.Map(mapDiv.value!, {
          center: { lat: coords.value.latitude, lng: coords.value.longitude },
          zoom: 15
        })
    )

    // Menambahkan penanganan klik pada peta
    setupClickEventListener()
  }
}

// Menambahkan penanda
const placeMarker = (lat: number, lng: number) => {
  // Menghapus marker yang sudah ada
  markers.forEach((marker) => marker.setMap(null))
  markers.length = 0

  // Menambahkan marker baru dengan ikon times dari Font Awesome
  const newMarker = new google.maps.Marker({
    map: map.value,
    position: { lat, lng },
    icon: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      fillColor: 'blue',
      fillOpacity: 1,
      strokeColor: 'white',
      strokeWeight: 1,
      scale: 6
    },
    label: {
      text: '\uf00d', // Unicode karakter untuk ikon times
      fontFamily: 'Font Awesome 5 Free',
      fontWeight: '900',
      fontSize: '14px',
      color: 'white'
    }
  })

  // Menyimpan marker baru ke dalam array
  markers.push(newMarker)
}


// Menambahkan event klik pada peta
const setupClickEventListener = () => {
  google.maps.event.addListener(map.value!, 'click', (event: any) => {
    const { latLng } = event
    // Menambahkan marker pada lokasi yang diklik
    placeMarker(latLng.lat(), latLng.lng())
    // Mengirimkan data latLng melalui emit
    emits('latLngData', latLng)
  })
}

// Saat komponen dimuat
onMounted(async () => {
  // Inisialisasi peta saat komponen dimuat
  await initializeMap()
  // Menambahkan marker pada lokasi awal (geolocation)
  placeMarker(coords.value.latitude, coords.value.longitude)
})

// Saat komponen diunmount
onUnmounted(() => {
  // Menghapus semua marker saat komponen diunmount
  markers.forEach((marker) => marker.setMap(null))
})
</script>



