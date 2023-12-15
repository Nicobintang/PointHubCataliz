import { onUnmounted, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const useGeolocation = () => {
    const coords = ref({ latitude: 0, longitude: 0 })
    const isSupported = 'navigator' in window && 'geolocation' in navigator

    onMounted(() => {
      if (isSupported) {
        const watcher = navigator.geolocation.watchPosition((position: GeolocationPosition) => {
          coords.value = position.coords
        })
        onUnmounted(() => {
          navigator.geolocation.clearWatch(watcher)
        })
      }
    })

    return { coords, isSupported }
  }

  return { useGeolocation }
})
