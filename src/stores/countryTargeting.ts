import { defineStore } from 'pinia'
import type {CountryRuleSetting} from '@/types/widgetSetting.ts'

export const useCountryTargetingStore = defineStore('countryTargeting', {
  state: () => ({
    countryTargeting: {
      has_country_rule: 0,
      countries: []
    } as CountryRuleSetting
  })
})
