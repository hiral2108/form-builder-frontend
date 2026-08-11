import { defineStore } from 'pinia'
import type {DayHourRuleSettings} from '@/types/widgetSetting.ts'

export const useDayHourSettingsStore = defineStore('dayHourSettings', {
  state: () => ({
    dayHourSetting: {
      has_day_hour_rule: 0,
      timezone: '0',
      time_schedule: {
        0: {
          status: 1,
          rule_setting: [
            { start_time: '10:00', end_time: '19:00' }
          ]
        },
        1: {
          status: 1,
          rule_setting: [
            { start_time: '10:00', end_time: '19:00' }
          ]
        },
        2: {
          status: 1,
          rule_setting: [
            { start_time: '10:00', end_time: '19:00' }
          ]
        },
        3: {
          status: 1,
          rule_setting: [
            { start_time: '10:00', end_time: '19:00' }
          ]
        },
        4: {
          status: 1,
          rule_setting: [
            { start_time: '10:00', end_time: '19:00' }
          ]
        },
        5: {
          status: 1,
          rule_setting: [
            { start_time: '10:00', end_time: '19:00' }
          ]
        },
        6: {
          status: 1,
          rule_setting: [
            { start_time: '10:00', end_time: '19:00' }
          ]
        }
      }
    } as DayHourRuleSettings
  })
})
