import { defineStore } from 'pinia'

export type DevicesStoreType = {
  has_desktop: number
  has_mobile: number
}

export const useDevicesStore = defineStore('deviceSetting', {
  state: () => ({
    deviceSetting: {
      has_desktop: 1,
      has_mobile: 1,
    } as DevicesStoreType,
  }),
})