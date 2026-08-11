import { defaultRule, defaultDateRule, defaultDayHourRule } from '@/data/triggersTargeting'
import { formSetting } from '@/composable/useFormSettings'
import type { PageRule, CountryListMap } from '@/types/widgetSetting'
import countryListData from '@/data/CountryList.json'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountryTargetingStore } from '@/stores/countryTargeting'

export function targetingSetting() {
  const { pageRuleSetting, dateTimeSetting, dayHourSetting , validationErrors } = formSetting()

  const addRule = () => {
    if (!pageRuleSetting.value.rule_setting) {
      pageRuleSetting.value.rule_setting = [];
    }
    pageRuleSetting.value.rule_setting.push(defaultRule());
  }

  const removeRule = (ruleId: string) => {
    pageRuleSetting.value.rule_setting =
      pageRuleSetting.value.rule_setting.filter((r: PageRule) => r.id !== ruleId)

    if (validationErrors && validationErrors[`rule_value_${ruleId}`]) {
      delete validationErrors[`rule_value_${ruleId}`]
    }
  }

  const addDateRule = () => {
    if (!dateTimeSetting.value.rule_setting) {
      dateTimeSetting.value.rule_setting = [];
    }
    dateTimeSetting.value.rule_setting.push(defaultDateRule());
  }

  const removeDateRule = (ruleId: string) => {
    dateTimeSetting.value.rule_setting =
      dateTimeSetting.value.rule_setting.filter(r => r.id !== ruleId)

    delete validationErrors[`date_rule_start_date_${ruleId}`]
    delete validationErrors[`date_rule_end_date_${ruleId}`]
  }

  const normalizeToDate = (v: unknown): Date | null => {
    if (!v && v !== 0) return null;
    if (v instanceof Date && !isNaN(v.getTime())) {
      return new Date(v.getFullYear(), v.getMonth(), v.getDate());
    }
    if (typeof v === 'string') {
      const fallback = new Date(v);
      if (!isNaN(fallback.getTime())) return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate());
    }
    return null;
  };

  function disabledStartDateFactory(dayKey: number) {
    return (date: Date) => {
      const storedEnd = dateTimeSetting.value.rule_setting?.[dayKey]?.end_date;
      const endDate = normalizeToDate(storedEnd);
      if (!endDate) return false;
      const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return d.getTime() > endDate.getTime();
    };
  }

  function disabledEndDateFactory(dayKey: number) {
    return (date: Date) => {
      const storedStart = dateTimeSetting.value.rule_setting?.[dayKey]?.start_date;
      const startDate = normalizeToDate(storedStart);
      if (!startDate) return false;
      const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return d.getTime() < startDate.getTime();
    };
  }

  function onEndDateChange(dayKey: number, newVal: Date | string | null): void {
    if (!dateTimeSetting.value.rule_setting?.[dayKey]) return;
    const normalized = normalizeToDate(newVal);
    const rule = dateTimeSetting.value.rule_setting[dayKey];
    rule.end_date = normalized ? normalized : null;

    const s = normalizeToDate(rule.start_date);
    if (normalized && s && s.getTime() > normalized.getTime()) {
      rule.start_date = normalized;
    }
  }

  function onStartDateChange(dayKey: number, newVal: Date | string | null): void {
    if (!dateTimeSetting.value.rule_setting?.[dayKey]) return;
    const normalized = normalizeToDate(newVal);
    const rule = dateTimeSetting.value.rule_setting[dayKey];
    rule.start_date = normalized ? normalized : null;

    const e = normalizeToDate(rule.end_date);
    if (normalized && e && e.getTime() < normalized.getTime()) {
      rule.end_date = normalized;
    }
  }

  const timeToMinutes = (t: string | null): number | null => {
    if (!t) return null
    const parts = t.split(':')
    if (parts.length !== 2) return null
    return Number(parts[0]) * 60 + Number(parts[1])
  }

  const minutesToTime = (m: number | null): string => {
    if (m === null) return '00:00'
    const hh = Math.floor(m / 60).toString().padStart(2, '0')
    const mm = (m % 60).toString().padStart(2, '0')
    return `${hh}:${mm}`
  }

  function onDateStartChange(dayKey: number, newVal: string | null): void {
    if (!dateTimeSetting.value.rule_setting?.[dayKey]) return;
    const formattedTime = newVal ?? '00:00'
    dateTimeSetting.value.rule_setting[dayKey].start_time = formattedTime;
    const sMin = timeToMinutes(formattedTime);
    const eMin = timeToMinutes(dateTimeSetting.value.rule_setting[dayKey].end_time);
    if (sMin !== null && (eMin === null || eMin < sMin)) {
      dateTimeSetting.value.rule_setting[dayKey].end_time = minutesToTime(sMin);
    }
  }

  function onDateEndChange(dayKey: number, newVal: string | null): void {
    if (!dateTimeSetting.value.rule_setting?.[dayKey]) return;
    const formattedTime = newVal ?? '00:00'
    dateTimeSetting.value.rule_setting[dayKey].end_time = formattedTime;
    const sMin = timeToMinutes(dateTimeSetting.value.rule_setting[dayKey].start_time);
    const eMin = timeToMinutes(formattedTime);
    if (sMin !== null && eMin !== null && eMin < sMin) {
      dateTimeSetting.value.rule_setting[dayKey].end_time = minutesToTime(sMin);
    }
  }

  const addDayHourRule = (dayKey: number | string): void => {
    const daySchedule = dayHourSetting.value.time_schedule[Number(dayKey)];
    if (!daySchedule) return;
    daySchedule.rule_setting.push(defaultDayHourRule());
  }
  const removeDayHourRule = (dayKey: number | string, key: number): void => {
    const daySchedule = dayHourSetting.value.time_schedule[Number(dayKey)];
    if (!daySchedule) return;
    daySchedule.rule_setting.splice(key, 1);
  }

  const getDayName = (dayKey: number | string): string => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return days[Number(dayKey)] || ''
  }

  function onDayStartChange(dayKey: number | string, timeKey: number, newVal: string | null): void {
    const daySchedule = dayHourSetting.value.time_schedule[Number(dayKey)];
    if (!daySchedule) return;
    const rule = daySchedule.rule_setting[timeKey];
    if (!rule) return;
    const formattedTime = newVal ?? '00:00';
    rule.start_time = formattedTime;
    const sMin = timeToMinutes(formattedTime);
    const eMin = timeToMinutes(rule.end_time);
    if (sMin !== null && (eMin === null || eMin < sMin)) {
      rule.end_time = minutesToTime(sMin);
    }
  }
  function onDayEndChange(dayKey: number | string, timeKey: number, newVal: string | null): void {
    const daySchedule = dayHourSetting.value.time_schedule[Number(dayKey)];
    if (!daySchedule) return;
    const rule = daySchedule.rule_setting[timeKey];
    if (!rule) return;
    const formattedTime = newVal ?? '00:00';
    rule.end_time = formattedTime;
    const sMin = timeToMinutes(rule.start_time);
    const eMin = timeToMinutes(formattedTime);
    if (sMin !== null && eMin !== null && eMin < sMin) {
      rule.end_time = minutesToTime(sMin);
    }
  }

    const countryStore = useCountryTargetingStore()
  const { countryTargeting } = storeToRefs(countryStore)
  const isOpen = ref(false)
  const search = ref('')
  const dropdownRef = ref<HTMLElement | null>(null)
  const searchInputRef = ref<HTMLInputElement | null>(null)
  const CountryList = ref<CountryListMap>({})

  const selectedCountry = computed<string[]>({
    get() {
      return countryTargeting.value.countries ?? []
    },
    set(val) {
      countryTargeting.value.countries = [...val]
    }
  })

  function toggleCountry(code: string): void {
    const idx = selectedCountry.value.indexOf(code)
    if (idx === -1) {
      selectedCountry.value.push(code)
    } else {
      selectedCountry.value.splice(idx, 1)
    }
  }

  function removeBadge(code: string): void {
    selectedCountry.value = selectedCountry.value.filter(c => c !== code)
  }

  const allSelected = computed(() => {
    const total = Object.keys(CountryList.value).length
    return selectedCountry.value.length === total
  })

  function selectAll() {
    const list = CountryList.value || {}
    selectedCountry.value = Object.keys(list)
  }

  function clearAll() {
    selectedCountry.value = []
    search.value = ''
  }

  const toggleDropdown = async () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      setTimeout(() => {
        if (searchInputRef.value) searchInputRef.value.focus()
      }, 0)
    }
  }

  const filteredCountries = computed(() => {
  const q = (search.value || '').trim().toLowerCase();
  const entries = Object.entries(CountryList.value || {}) as [string, string][];
  if (!q) return entries;
  return entries.filter(([code, name]) => {
    return code.toLowerCase().includes(q) || String(name).toLowerCase().includes(q);
  });
});

  const countryLabel = computed(() => {
    const count = selectedCountry.value.length
    if (count === 0) return 'No country selected'
    if (count === 1) return '1 country selected'
    return `${count} countries selected`
  })

  function isSelected(code: string): boolean {
    return selectedCountry.value.includes(code)
  }

  function onDocumentClick(e: MouseEvent): void {
    const el = dropdownRef.value
    if (!el) return
    if (!el.contains(e.target as Node)) {
      isOpen.value = false
    }
  }

  const fetchCountryList = () => {
    CountryList.value = countryListData.countryList
  }

  onMounted(() => {
    document.addEventListener('click', onDocumentClick)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', onDocumentClick)
  })

  return {
    addRule,
    removeRule,
    addDateRule,
    removeDateRule,
    disabledStartDateFactory,
    disabledEndDateFactory,
    onEndDateChange,
    onStartDateChange,
    onDateStartChange,
    onDateEndChange,
    addDayHourRule,
    removeDayHourRule,
    getDayName,
    onDayStartChange,
    onDayEndChange,
    isOpen,
    search,
    dropdownRef,
    searchInputRef,
    CountryList,
    selectedCountry,
    toggleCountry,
    removeBadge,
    allSelected,
    selectAll,
    clearAll,
    toggleDropdown,
    filteredCountries,
    countryLabel,
    isSelected,
    fetchCountryList,
  }
}