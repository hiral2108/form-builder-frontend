import { defineStore } from 'pinia'

export type ScrollBasedSettingStoreType = {
  is_scroll_trigger: number
  scroll: number
}

export const useScrollBasedSettingStore = defineStore('scrollBasedSetting', {
  state: () => ({
    scrollBasedSetting: {
      is_scroll_trigger: 0,
      scroll: 0
    } as ScrollBasedSettingStoreType
  })
})