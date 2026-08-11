import type { PageRule, DateRule, DayTimeRule } from '@/types/widgetSetting.ts'
import { ref } from 'vue'

export const defaultRule = (): PageRule => ({
  id: crypto.randomUUID(),
  rule_show_hide: 'show_on',
  url_rule: 'contains',
  rule_value: ''
})

export const urlRule = ref({
  'equal' : 'URL Is',
  'contains' : 'URL Contains',
  'begin' : 'URL Begins With',
  'end' : 'URL Ends With'
})

export const defaultDateRule = (): DateRule => ({
  id: crypto.randomUUID(),
  start_date: null,
  end_date: null,
  start_time: '10:00',
  end_time: '19:00'
})

export const defaultDayHourRule = (): DayTimeRule => ({
  start_time: '10:00',
  end_time: '19:00'
})