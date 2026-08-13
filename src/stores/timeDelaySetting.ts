import { defineStore } from 'pinia'

export type TimeDelaySettingStoreType = {
  is_time_delay: number
  seconds: number
}

export const useTimeDelaySettingStore = defineStore('timeDelaySetting', {
  state: () => ({
    timeDelaySetting: {
      is_time_delay: 0,
      seconds: 0,
    } as TimeDelaySettingStoreType
  })
})