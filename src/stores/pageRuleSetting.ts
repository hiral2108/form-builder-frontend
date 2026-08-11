import { defineStore } from 'pinia'
import type { PageRuleSettings } from '@/types/widgetSetting'

export const usePageRuleSettingStore = defineStore('pageRuleSetting', {
  state: () => ({
    pageRuleSetting: {
      has_page_rule: 0,
      rule_setting: []
    } as PageRuleSettings
  })
})
