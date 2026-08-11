import { defineStore } from 'pinia'
import type {DateRuleSettings} from '@/types/widgetSetting.ts'

export const useDateTimeSettingsStore = defineStore('dateTimeSettings', {
  state: () => ({
    dateTimeSetting: {
      has_date_rule: 0,
      timezone: '0',
      rule_setting: []
    } as DateRuleSettings
  })
})
