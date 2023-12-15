import { defineStore } from 'pinia'

export const useLocationDataStore = defineStore('LocationData', () => {
  const LocationData: object[] = []

  return { LocationData }
})
