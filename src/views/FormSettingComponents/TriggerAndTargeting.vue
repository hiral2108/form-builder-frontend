<template>
  <div class="grid grid-cols-12 gap-6 h-full relative items-start">
    <!-- Left Panel (Settings Cards) -->
    <section
      class="col-span-12 lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-3 sm:p-5 shadow-sm space-y-4">
      <!-- Devices Card -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="flex items-center gap-3 p-4 sm:p-5">
          <div class="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center flex-[0_0_40px]">
            <!-- Device Icon -->
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.83 6.66666H17.4963C17.7295 6.66666 17.9267 6.74722 18.0878 6.90833C18.2488 7.06944 18.3294 7.26666 18.3294 7.5V17.5C18.3294 17.7333 18.2488 17.9306 18.0878 18.0917C17.9267 18.2528 17.7295 18.3333 17.4963 18.3333H10.8313C10.598 18.3333 10.4008 18.2528 10.2397 18.0917C10.0787 17.9306 9.99813 17.7333 9.99813 17.5V16.6667H3.33313C3.09985 16.6667 2.90268 16.5861 2.74161 16.425C2.58054 16.2639 2.5 16.0667 2.5 15.8333V2.5C2.5 2.26666 2.58054 2.06944 2.74161 1.90833C2.90268 1.74722 3.09985 1.66666 3.33313 1.66666H14.9969C15.2302 1.66666 15.4273 1.74722 15.5884 1.90833C15.7495 2.06944 15.83 2.26666 15.83 2.5V6.66666ZM14.1638 6.66666V3.33333H4.16625V15H9.99813V7.5C9.99813 7.26666 10.0787 7.06944 10.2397 6.90833C10.4008 6.74722 10.598 6.66666 10.8313 6.66666H14.1638ZM11.6644 8.33333V16.6667H16.6631V8.33333H11.6644Z"
                fill="currentColor" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-700">Devices</h3>
            <p class="text-sm text-slate-500 mt-0.5">Choose which devices will display the form</p>
          </div>
        </div>
        <div class="p-4 sm:p-5 border-t border-slate-200 bg-white">
          <div class="flex items-center gap-3">
            <!-- Desktop Checkbox Pill -->
            <div>
              <input type="checkbox" v-model="deviceSetting.has_desktop" class="sr-only" id="desktop_device"
                :true-value="1" :false-value="0" />
              <label for="desktop_device"
                class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer select-none"
                :class="deviceSetting.has_desktop === 1 ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'">
                <svg width="16" height="16" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.63183 9.04166H11.9618V2.62499H2.63183V9.04166ZM7.87995 10.2083V11.375H10.2125V12.5417H4.3812V11.375H6.7137V10.2083H2.0487C1.88543 10.2083 1.74742 10.1519 1.63468 10.0392C1.52194 9.92638 1.46558 9.78832 1.46558 9.62499V2.04166C1.46558 1.8861 1.52194 1.74999 1.63468 1.63332C1.74742 1.51666 1.88543 1.45832 2.0487 1.45832H12.545C12.7082 1.45832 12.8462 1.51471 12.959 1.62749C13.0717 1.74027 13.1281 1.87832 13.1281 2.04166V9.62499C13.1281 9.78055 13.0717 9.91666 12.959 10.0333C12.8462 10.15 12.7082 10.2083 12.545 10.2083H7.87995Z"
                    :fill="deviceSetting.has_desktop === 1 ? '#ffffff' : '#4b5563'" />
                </svg>
                Desktop
              </label>
            </div>

            <!-- Mobile Checkbox Pill -->
            <div>
              <input type="checkbox" v-model="deviceSetting.has_mobile" class="sr-only" id="mobile_device"
                :true-value="1" :false-value="0" />
              <label for="mobile_device"
                class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer select-none"
                :class="deviceSetting.has_mobile === 1 ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'">
                <svg width="16" height="16" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.47509 2.33334V11.6667H10.3063V2.33334H4.47509ZM3.89196 1.16668H10.8895C11.0527 1.16668 11.1907 1.22307 11.3035 1.33584C11.4162 1.44862 11.4726 1.58668 11.4726 1.75001V12.25C11.4726 12.4133 11.4162 12.5514 11.3035 12.6642C11.1907 12.777 11.0527 12.8333 10.8895 12.8333H3.89196C3.72869 12.8333 3.59068 12.777 3.47794 12.6642C3.36521 12.5514 3.30884 12.4133 3.30884 12.25V1.75001C3.30884 1.58668 3.36521 1.44862 3.47794 1.33584C3.59068 1.22307 3.72869 1.16668 3.89196 1.16668ZM7.39071 9.91668C7.55399 9.91668 7.69199 9.97307 7.80473 10.0858C7.91747 10.1986 7.97384 10.3367 7.97384 10.5C7.97384 10.6633 7.91747 10.8014 7.80473 10.9142C7.69199 11.027 7.55399 11.0833 7.39071 11.0833C7.22744 11.0833 7.08943 11.027 6.97669 10.9142C6.86396 10.8014 6.80759 10.6633 6.80759 10.5C6.80759 10.3367 6.86396 10.1986 6.97669 10.0858C7.08943 9.97307 7.22744 9.91668 7.39071 9.91668Z"
                    :fill="deviceSetting.has_mobile === 1 ? '#ffffff' : '#4b5563'" />
                </svg>
                Mobile
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 1. Trigger Settings Card -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-auto">
        <div class="flex items-center gap-3 p-4">
          <div class="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center flex-[0_0_40px]">
            <img v-svg-inline src="@/assets/icons/trigger-targeting/flashlight-line.svg" class="w-5 h-5"
              alt="trigger settings" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-700">Trigger Settings</h3>
            <p class="text-sm text-slate-500 mt-0.5">Configure when the form should appear</p>
          </div>
        </div>

        <div class="space-y-4 sm:space-y-5 p-3 sm:p-5 border-t border-slate-200 bg-white">
          <!-- Time Delay Trigger -->
          <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div class="flex items-center justify-between p-3 sm:p-4 bg-slate-50/50 gap-2">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center flex-[0_0_40px]">
                  <img v-svg-inline src="@/assets/icons/trigger-targeting/time_delay.svg" class="text-slate-400 w-5 h-5"
                    alt="Time Delay" />
                </div>
                <div>
                  <h4 class="font-semibold text-base text-slate-700">Time Delay Trigger</h4>
                  <p class="text-sm mt-0.5 text-slate-500">Show form after a delay</p>
                </div>
              </div>
              <div class="toggle-checkbox">
                <CheckboxToggle v-model="timeDelaySetting.is_time_delay" :trueValue="1" :falseValue="0"
                  id="enable_time_delay_trigger" />
              </div>
            </div>

            <div class="p-4 border-t border-slate-200 bg-white" v-show="timeDelaySetting.is_time_delay === 1">
              <label class="block text-xs font-semibold text-slate-500 tracking-wider mb-2 flex items-center gap-1"
                for="delay_duration">
                Delay Duration
                <div class="relative group cursor-pointer leading-none mt-auto">
                  <img v-svg-inline src="@/assets/icons/trigger-targeting/info.svg" class="w-3.5 h-3.5"
                    alt="Info Tooltip" />
                  <div
                    class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-44 text-center z-10 font-normal leading-relaxed">
                    How long to wait before showing the form
                    <div
                      class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900">
                    </div>
                  </div>
                </div>
              </label>
              <div class="flex items-center gap-5 max-[500px]:gap-2.5">
                <input type="range" class="w-full flex-1" min="0" max="60" v-model="timeDelaySetting.seconds" />
                <div class="flex-[0_0_88px]">
                  <InputFieldWithBadge type="number" :min="0" :max="60" badge="SEC" v-model="timeDelaySetting.seconds"
                    width="w-22" focusColor="teal" id="delay_duration"
                    :classes="validationErrors.delay_duration ? 'border-red-500' : ''" />
                </div>
              </div>
              <p v-if="validationErrors.delay_duration" class="text-xs text-red-500 mt-1">
                {{ validationErrors.delay_duration }}
              </p>
            </div>
          </div>

          <!-- Scroll Based Trigger -->
          <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div class="flex items-center justify-between p-4 bg-slate-50/50">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center flex-[0_0_40px]">
                  <img v-svg-inline src="@/assets/icons/trigger-targeting/scroll_based.svg"
                    class="text-slate-400 w-5 h-5" alt="Scroll Based Trigger" />
                </div>
                <div>
                  <h4 class="font-semibold text-base text-slate-700">Scroll Based Trigger</h4>
                  <p class="text-sm mt-0.5 text-slate-500">Show form based on scroll percentage</p>
                </div>
              </div>
              <div class="toggle-checkbox">
                <CheckboxToggle v-model="scrollBasedSetting.is_scroll_trigger" :trueValue="1" :falseValue="0"
                  id="enable_scroll_trigger" />
              </div>
            </div>

            <div class="p-4 border-t border-slate-200 bg-white" v-show="scrollBasedSetting.is_scroll_trigger === 1">
              <label class="block text-xs font-semibold text-slate-500 tracking-wider mb-2 flex items-center gap-1"
                for="scroll_percentage">
                Scroll Percentage
                <div class="relative group cursor-pointer leading-none mt-auto">
                  <img v-svg-inline src="@/assets/icons/trigger-targeting/info.svg" class="w-3.5 h-3.5"
                    alt="Info Tooltip" />
                  <div
                    class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 text-center z-10 font-normal leading-relaxed">
                    Show form when user scrolls this percentage of the page
                    <div
                      class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900">
                    </div>
                  </div>
                </div>
              </label>
              <div class="flex items-center gap-5 max-[500px]:gap-2.5">
                <input type="range" class="w-full flex-1" min="0" max="100" v-model="scrollBasedSetting.scroll" />
                <div class="flex-[0_0_88px]">
                  <InputFieldWithBadge type="number" :min="0" :max="100" badge="%" v-model="scrollBasedSetting.scroll"
                    width="w-22" focusColor="teal" id="page_scroll"
                    :classes="validationErrors.page_scroll ? 'border-red-500' : ''" />
                </div>
              </div>
              <p v-if="validationErrors.page_scroll" class="text-xs text-red-500 mt-1">
                {{ validationErrors.page_scroll }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Page Rules Card -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible">
        <div class="flex items-center justify-between p-5">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center flex-[0_0_40px]">
              <img v-svg-inline src="@/assets/icons/trigger-targeting/page_rules.svg" alt="Page Rule" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-700 flex items-center flex-wrap gap-1">
                <span>Page Rules</span>
                <span v-if="userStore.plan_id === 1"
                  class="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-sm pointer-events-none">Upgrade
                  to Pro</span>
              </h3>
              <p class="text-sm text-slate-500 mt-0.5">Control which pages display the form</p>
            </div>
          </div>
          <CheckboxToggle v-model="pageRuleSetting.has_page_rule" :trueValue="1" :falseValue="0"
            id="enable_page_rules" />
        </div>

        <div class="border-t border-gray-200" v-show="pageRuleSetting.has_page_rule === 1">
          <div class="p-5 relative" :class="userStore.plan_id === 1 ? 'pro-content' : ''">
            <div class="space-y-3">
              <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl"
                v-for="(rule, key) in pageRuleSetting.rule_setting" :key="rule.id">
                <div class="flex items-center flex-wrap gap-2.5 sm:gap-3 w-full">
                  <!-- 1. Radio Selector (compact fixed width) -->
                  <div class="shrink-0">
                    <RadioTypeSelector v-model="rule.rule_show_hide" :columns="2" :options="[
                      { label: 'Show On', value: 'show_on' },
                      { label: 'Hide On', value: 'hide_on' },
                    ]" :name="`rule_${key}`" />
                  </div>

                  <!-- 2. Select Dropdown (fixed width) -->
                  <div class="w-[145px] shrink-0 relative">
                    <SelectField v-model="rule.url_rule" :options="urlRule" customClass="h-10" />
                  </div>

                  <!-- 3. URL Input (flex-1, min 160px) -->
                  <div class="flex-1 min-w-[160px]">
                    <InputField type="text" @input="clearValidationError(`rule_value_${rule.id}`)"
                      placeholder="Enter URL or path..." focusColor="teal" v-model="rule.rule_value"
                      :fieldId="`rule_value_${rule.id}`"
                      :classes="`h-10 ${validationErrors[`rule_value_${rule.id}`] ? 'border-red-500' : ''}`" />
                    <p v-if="validationErrors[`rule_value_${rule.id}`]" class="text-xs text-red-500 mt-1">
                      {{ validationErrors[`rule_value_${rule.id}`] }}
                    </p>
                  </div>

                  <!-- 4. Delete Button -->
                  <div class="shrink-0 flex justify-end">
                    <button type="button" @click="removeRule(rule.id)"
                      class="w-10 h-10 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center cursor-pointer">
                      <img v-svg-inline src="@/assets/icons/form-list/delete.svg" alt="" class="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" @click="addRule"
              class="w-full flex items-center justify-center gap-2 px-4 py-2 mt-4 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer text-slate-600 hover:border-teal-400 hover:text-teal-600 transition-all font-semibold text-sm bg-white">
              <img v-svg-inline src="@/assets/icons/dashboardpage/add-line.svg" alt="" class="h-5 w-5" />
              Add Rule
            </button>

            <!-- PRO Upgrade Overlay -->
            <div v-if="userStore.plan_id === 1"
              class="pro-overlay absolute hidden inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-b-xl">
              <router-link to="/plan"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-semibold text-sm shadow-md transition-transform hover:scale-[1.03]">
                <img v-svg-inline src="@/assets/icons/auth/password.svg" />
                Upgrade to Pro
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Date & Time Scheduling Card -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible">
        <div class="flex items-center justify-between p-5">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center flex-[0_0_40px]">
              <img v-svg-inline src="@/assets/icons/trigger-targeting/date_rule.svg" alt="Date Rule" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-700 flex items-center flex-wrap gap-1">
                <span>Date &amp; Time Scheduling</span>
                <span v-if="userStore.plan_id === 1"
                  class="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-sm pointer-events-none">Upgrade
                  to Pro</span>
              </h3>
              <p class="text-sm text-slate-500 mt-0.5">Set when the form should be active</p>
            </div>
          </div>
          <CheckboxToggle v-model="dateTimeSetting.has_date_rule" :trueValue="1" :falseValue="0"
            id="enable_date_scheduling" />
        </div>
        <div class="border-t border-gray-200" v-show="dateTimeSetting.has_date_rule === 1">
          <div class="p-5 relative" :class="userStore.plan_id === 1 ? 'pro-content' : ''">
            <div class="date-time-rule-container space-y-3">
              <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-6 min-w-50">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      for="date_rule_timezone">Timezone</label>
                    <UTCSelectField :options="UTCTimes" v-model="dateTimeSetting.timezone" />
                  </div>
                </div>
              </div>
              <div class="space-y-3 mt-5 date-time-rules">
                <div class="p-4 bg-gray-50 rounded-xl date-time-rule"
                  v-for="(dateRule, key) in dateTimeSetting.rule_setting" :key="dateRule.id">

                  <div
                    class="grid grid-cols-1 min-[750px]:max-[1024px]:grid-cols-2 min-[1325px]:grid-cols-2 gap-3 w-full min-w-0">
                    <!-- 1. Dates Group (Start & End Date in one div) -->
                    <div class="grid grid-cols-1 min-[500px]:grid-cols-2 gap-3">
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2"
                          :for="`date_rule_start_date_${dateRule.id}`">Start Date</label>
                        <div class="calender-input relative">
                          <el-date-picker v-model="dateRule.start_date" :id="`date_rule_start_date_${dateRule.id}`"
                            type="date" placeholder="Start date" :disabled-date="disabledStartDateFactory(key)"
                            @change="onStartDateChange(key, $event)" class="w-full" clearable />
                          <p v-if="validationErrors[`date_rule_start_date_${dateRule.id}`]"
                            class="text-xs text-red-500 mt-1">
                            {{ validationErrors[`date_rule_start_date_${dateRule.id}`] }}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2"
                          :for="`date_rule_end_date_${dateRule.id}`">End Date</label>
                        <div class="calender-input relative">
                          <el-date-picker v-model="dateRule.end_date" :id="`date_rule_end_date_${dateRule.id}`"
                            type="date" placeholder="End date" :disabled-date="disabledEndDateFactory(key)"
                            @change="onEndDateChange(key, $event)" class="w-full" clearable />
                          <p v-if="validationErrors[`date_rule_end_date_${dateRule.id}`]"
                            class="text-xs text-red-500 mt-1">
                            {{ validationErrors[`date_rule_end_date_${dateRule.id}`] }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- 2. Times & Delete Group (Start Time, End Time & Delete Button in one div) -->
                    <div class="flex flex-col min-[500px]:flex-row items-end gap-3 w-full">
                      <!-- Start Time -->
                      <div class="w-full min-[500px]:flex-1">
                        <label class="block text-sm font-medium text-slate-700 mb-2"
                          :for="`date_rule_start_time_${key}`">Start Time</label>
                        <div class="relative">
                          <el-time-select v-model="dateRule.start_time" :placeholder="'Start'" :start="'00:00'"
                            :step="'00:15'" :end="'23:59'" format="HH:mm" @change="onDateStartChange(key, $event)"
                            :clearable="false" :editable="false" class="w-full" />
                          <span
                            class="w-[18px] h-[18px] absolute top-1/2 transform -translate-y-1/2 right-1.5 pointer-events-none">
                            <img v-svg-inline src="@/assets/icons/trigger-targeting/clock.svg" alt="Clock" />
                          </span>
                        </div>
                      </div>

                      <!-- End Time -->
                      <div class="w-full min-[500px]:flex-1">
                        <label class="block text-sm font-medium text-slate-700 mb-2"
                          :for="`date_rule_end_time_${key}`">End Time</label>
                        <div class="relative">
                          <el-time-select v-model="dateRule.end_time" placeholder="End"
                            :start="dateRule.start_time || '00:00'" :end="'23:59'" :step="TIME_SELECT_STEP"
                            @change="onDateEndChange(key, $event)" :clearable="false" :editable="false"
                            class="w-full" />
                          <span
                            class="w-[18px] h-[18px] absolute top-1/2 transform -translate-y-1/2 right-1.5 pointer-events-none">
                            <img v-svg-inline src="@/assets/icons/trigger-targeting/clock.svg" alt="Clock" />
                          </span>
                        </div>
                      </div>

                      <!-- Delete Button -->
                      <div class="w-full min-[500px]:w-auto flex-shrink-0 flex justify-start">
                        <button type="button" @click="removeDateRule(dateRule.id)"
                          class="w-10 h-10 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center cursor-pointer">
                          <img v-svg-inline src="@/assets/icons/form-list/delete.svg" alt="" class="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" @click="addDateRule"
              class="w-full flex items-center justify-center gap-2 px-4 py-2 mt-4 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer text-slate-600 hover:border-teal-400 hover:text-teal-600 transition-all font-semibold text-sm bg-white">
              <img v-svg-inline src="@/assets/icons/dashboardpage/add-line.svg" alt="" class="h-5 w-5" />
              Add Rule
            </button>

            <!-- PRO Upgrade Overlay -->
            <div v-if="userStore.plan_id === 1"
              class="pro-overlay absolute hidden inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-b-xl">
              <router-link to="/plan"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-semibold text-sm shadow-md transition-transform hover:scale-[1.03]">
                <img v-svg-inline src="@/assets/icons/auth/password.svg" /> Upgrade to Pro
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Days & Hours Schedule Card -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible">
        <div class="flex items-center justify-between p-5">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center flex-[0_0_40px]">
              <img v-svg-inline src="@/assets/icons/trigger-targeting/day_hour_rule.svg" alt="Day & Hour Rule" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-700 flex items-center flex-wrap gap-1">
                <span>Days &amp; Hours Schedule</span>
                <span v-if="userStore.plan_id === 1"
                  class="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-sm pointer-events-none">Upgrade
                  to Pro</span>
              </h3>
              <p class="text-sm text-slate-500 mt-0.5">Set daily time ranges</p>
            </div>
          </div>
          <CheckboxToggle v-model="dayHourSetting.has_day_hour_rule" :trueValue="1" :falseValue="0"
            id="enable_days_and_hours_schedule" />
        </div>
        <div class="border-t border-gray-200" v-show="dayHourSetting.has_day_hour_rule === 1">
          <div class="p-5 relative" :class="userStore.plan_id === 1 ? 'pro-content' : ''">
            <div class="day-hours-rule-container space-y-3">
              <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-6 min-w-50">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="day_rule_timezone">Timezone</label>
                    <UTCSelectField :options="UTCTimes" v-model="dayHourSetting.timezone" />
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col min-[651px]:flex-row items-stretch min-[651px]:items-center gap-3 lg:gap-0 min-[1124px]:gap-3 p-3 bg-gray-50 rounded-xl min-h-[66px] days-and-hours-schedule"
                v-for="(dayRule, dayKey) in dayHourSetting.time_schedule" :key="dayKey">
                <div class="flex items-center gap-4 flex-shrink-0">
                  <CheckboxToggle v-model="dayRule.status" :trueValue="1" :falseValue="0"
                    :id="`day_time_status_${dayKey}`" />
                  <div class="w-23 text-sm font-medium text-slate-700">{{ getDayName(dayKey) }}</div>
                </div>
                <div v-show="dayRule.status === 1"
                  class="days-and-hours-time-section day-schedule-rules space-y-2 flex-1 w-full">
                  <div
                    class="flex flex-col min-[426px]:flex-row items-stretch min-[426px]:items-center gap-2 flex-1 day-schedule-rule"
                    v-for="(timeRule, key) in dayRule.rule_setting" :key="key">
                    <div class="relative flex-1">
                      <el-time-select v-model="timeRule.start_time" :placeholder="'Start'" :start="'00:00'"
                        :step="'00:15'" :end="'23:59'" format="HH:mm" @change="onDayStartChange(dayKey, key, $event)"
                        :clearable="false" :editable="false" class="w-full" />
                      <span class="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-[5px] pointer-events-none">
                        <img v-svg-inline src="@/assets/icons/trigger-targeting/clock.svg" alt="Clock" />
                      </span>
                    </div>
                    <span
                      class="text-slate-500 text-sm text-center min-[426px]:text-left font-medium select-none px-1">to</span>
                    <div class="relative flex-1">
                      <el-time-select v-model="timeRule.end_time" :placeholder="'End'" :start="'00:00'" :step="'00:15'"
                        :end="'23:59'" format="HH:mm" @change="onDayEndChange(dayKey, key, $event)" :clearable="false"
                        :editable="false" class="w-full" />
                      <span class="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-[5px] pointer-events-none">
                        <img v-svg-inline src="@/assets/icons/trigger-targeting/clock.svg" alt="Clock" />
                      </span>
                    </div>
                    <div v-if="key !== dayRule.rule_setting.length - 1"
                      class="flex-shrink-0 flex min-[426px]:justify-start">
                      <button type="button" @click="removeDayHourRule(dayKey, key)"
                        class="w-10 h-10 bg-red-100 text-red-700 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center cursor-pointer">
                        <img v-svg-inline src="@/assets/icons/form-list/delete.svg" alt="" class="text-lg" />
                      </button>
                    </div>
                    <div v-else class="flex-shrink-0 flex min-[426px]:justify-start">
                      <button type="button" @click="addDayHourRule(dayKey)"
                        class="bg-teal-100 hover:bg-teal-200 text-teal-700 h-10 w-10 rounded-xl cursor-pointer transition-colors flex items-center justify-center">
                        <img v-svg-inline src="@/assets/icons/dashboardpage/add-line.svg" alt="" class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PRO Upgrade Overlay -->
            <div v-if="userStore.plan_id === 1"
              class="pro-overlay absolute hidden inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-b-xl">
              <router-link to="/plan"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-semibold text-sm shadow-md transition-transform hover:scale-[1.03]">
                <img v-svg-inline src="@/assets/icons/auth/password.svg" /> Upgrade to Pro
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Country Targeting Card -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible">
        <div class="flex items-center justify-between p-5">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center flex-[0_0_40px]">
              <img v-svg-inline src="@/assets/icons/trigger-targeting/country_rule.svg" alt="Country Rule" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-700 flex items-center flex-wrap gap-1">
                <span>Country Targeting</span>
                <span v-if="userStore.plan_id === 1"
                  class="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-sm pointer-events-none">Upgrade
                  to Pro</span>
              </h3>
              <p class="text-sm text-slate-500 mt-0.5">Choose which countries to show the form</p>
            </div>
          </div>
          <CheckboxToggle v-model="countryTargeting.has_country_rule" :trueValue="1" :falseValue="0"
            id="enable_country_targeting" />
        </div>
        <div class="border-t border-gray-200" v-show="countryTargeting.has_country_rule === 1">
          <div class="p-5 relative country-dropdown-box" :class="userStore.plan_id === 1 ? 'pro-content' : ''">
            <div class="country-rule-container space-y-3">
              <!-- Selected Badges Grid -->
              <div class="flex flex-wrap gap-2 mb-2 max-h-48 overflow-y-auto"
                v-show="selectedCountry.length > 0 && !allSelected && selectedCountry.length <= 4">
                <div v-for="code in selectedCountry" :key="code"
                  class="flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-800 border border-teal-100 rounded-full text-xs font-semibold">
                  <span class="opacity-60">{{ code }}</span>
                  <span>{{ CountryList?.[code] || "" }}</span>
                  <button type="button" @click="removeBadge(code)"
                    class="ml-1 hover:bg-teal-100 rounded-full p-0.5 cursor-pointer">
                    <img v-svg-inline src="@/assets/icons/submission-page/close-line.svg" class="w-3.5 h-3.5"
                      alt="Close" />
                  </button>
                </div>
              </div>

              <!-- Multi-select Dropdown box -->
              <div class="relative" ref="dropdownRef">
                <button type="button"
                  class="w-full flex items-center justify-between p-3 bg-white border border-solid! border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  @click.stop="toggleDropdown">
                  <span class="text-sm font-medium text-slate-700">{{ countryLabel }}</span>
                  <svg width="22" height="22" class="transition-all duration-300" :class="{ 'rotate-[180deg]': isOpen }"
                    viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.32036 8.70667L11.6116 5.41334L12.5577 6.34667L8.32036 10.5867L4.08301 6.34667L5.02908 5.41334L8.32036 8.70667Z"
                      fill="#9CA3AF"></path>
                  </svg>
                </button>
                <div :class="[
                  'absolute top-full left-0 right-0 mt-1 bg-white overflow-x-hidden border border-solid! border-slate-200 rounded-xl shadow-lg z-50 max-h-68 overflow-y-auto',
                  { hidden: !isOpen },
                ]" @click.stop>
                  <div
                    class="sticky top-0 bg-slate-50 border-b border-slate-200 p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 z-10">
                    <input type="text" ref="searchInputRef" v-model="search" placeholder="Search country..."
                      class="w-full sm:flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white outline-none focus:border-teal-500 transition-all" />
                    <div class="flex items-center justify-start gap-1.5 shrink-0">
                      <button type="button" @click="selectAll"
                        class="px-2 py-1 bg-teal-100 text-teal-700 hover:bg-teal-200 rounded-lg text-xs font-semibold cursor-pointer">
                        Select All
                      </button>
                      <button type="button" @click="clearAll"
                        class="px-2 py-1 bg-teal-100 text-teal-700 hover:bg-teal-200 rounded-lg text-xs font-semibold cursor-pointer">
                        Clear
                      </button>
                    </div>
                  </div>
                  <div class="divide-y divide-slate-100">
                    <button v-for="[code, name] in filteredCountries" :key="code" type="button"
                      class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer"
                      :class="isSelected(code) ? 'bg-teal-50/40' : 'bg-white'" @click="toggleCountry(code)">
                      <span class="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded">{{
                        code
                      }}</span>
                      <span class="flex-1 text-left text-sm text-slate-700 font-medium">{{ name }}</span>
                      <span v-show="isSelected(code)" class="text-teal-600">
                        <img v-svg-inline src="@/assets/icons/trigger-targeting/checkMark.svg" class="w-4 h-4"
                          alt="Checked" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- PRO Upgrade Overlay -->
            <div v-if="userStore.plan_id === 1"
              class="pro-overlay absolute hidden inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-b-xl">
              <router-link to="/plan"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-semibold text-sm shadow-md transition-transform hover:scale-[1.03]">
                <img v-svg-inline src="@/assets/icons/auth/password.svg" /> Upgrade to Pro
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="col-span-12 lg:col-span-5 w-full flex flex-col items-center bg-transparent border-none lg:bg-slate-100/50 lg:border lg:border-slate-200/60 rounded-2xl p-0 lg:p-6 min-h-0 lg:min-h-[400px] lg:sticky lg:top-24">
      <PreviewTemplate>
        <DisplayRulePreview :allowOpen="true" />
      </PreviewTemplate>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from "vue";
import PreviewTemplate from "@/views/FormSettingComponents/PreviewTemplate.vue";
import DisplayRulePreview from "@/views/FormSettingComponents/DisplayRulePreview.vue";
import { formSetting } from "@/composable/useFormSettings.ts";
import { useTimeDelaySettingStore } from "@/stores/timeDelaySetting.ts";
import { useScrollBasedSettingStore } from "@/stores/scrollBasedSetting.ts";
import { usePageRuleSettingStore } from "@/stores/pageRuleSetting.ts";
import { useUserStore } from "@/stores/user.ts";
import { urlRule } from "@/data/triggersTargeting.ts";
import { targetingSetting } from "@/composable/useTriggersTargetingSettings.ts";
import UTCSelectField from "@/components/global/fields/UTCSelectField.vue";
import UTCTimesData from "@/data/UTCTimes.json";
import { useDateTimeSettingsStore } from "@/stores/dateTimeSettings";
import { useDayHourSettingsStore } from "@/stores/dayHourSettings";
import { useCountryTargetingStore } from "@/stores/countryTargeting";
import { useDevicesStore } from "@/stores/deviceSetting";
import { ElTimeSelect, ElDatePicker } from "element-plus";

const {
  timeDelaySetting,
  scrollBasedSetting,
  pageRuleSetting,
  dateTimeSetting,
  dayHourSetting,
  countryTargeting,
  deviceSetting,
  validationErrors,
} = formSetting();

const timeDelaySettingStore = useTimeDelaySettingStore();
const scrollBasedSettingStore = useScrollBasedSettingStore();
const pageRuleSettingStore = usePageRuleSettingStore();
const dateTimeSettingStore = useDateTimeSettingsStore();
const dayHourSettingStore = useDayHourSettingsStore();
const countryTargetingStore = useCountryTargetingStore();
const deviceStore = useDevicesStore();
const userStore = useUserStore();

const {
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
} = targetingSetting();

void dropdownRef;
void searchInputRef;

const UTCTimes = ref<Array<{ title: string; value: string }>>([]);
const TIME_SELECT_STEP = "00:15";

const clearValidationError = (key: string) => {
  if (validationErrors && validationErrors[key]) {
    delete validationErrors[key];
  }
};

const fetchUTCTimes = () => {
  const raw = UTCTimesData.UTCTimes as Record<string, string>;
  UTCTimes.value = Object.entries(raw)
    .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
    .map(([key, label]) => ({
      title: label,
      value: key,
    }));
  if (!dateTimeSetting.value.timezone) {
    dateTimeSetting.value.timezone = "0";
  }
};
onMounted(() => {
  fetchUTCTimes();
  fetchCountryList();
});
watch(
  dateTimeSetting,
  (newVal) => {
    if (!newVal) return;
    Object.assign(dateTimeSettingStore.dateTimeSetting, newVal);
  },
  { deep: true, immediate: true }
);

watch(
  timeDelaySetting,
  (newVal) => {
    Object.assign(timeDelaySettingStore.timeDelaySetting, newVal);
  },
  { deep: true, immediate: true }
);

watch(
  scrollBasedSetting,
  (newVal) => {
    Object.assign(scrollBasedSettingStore.scrollBasedSetting, newVal);
  },
  { deep: true, immediate: true }
);

watch(
  pageRuleSetting,
  (newVal) => {
    if (!newVal) return;
    Object.assign(pageRuleSettingStore.pageRuleSetting, newVal);
  },
  { deep: true, immediate: true }
);

watch(
  dayHourSetting,
  (newVal) => {
    if (!newVal) return;
    Object.assign(dayHourSettingStore.dayHourSetting, newVal);
  },
  { deep: true, immediate: true }
);

watch(
  countryTargeting,
  (newVal) => {
    if (!newVal) return;
    Object.assign(countryTargetingStore.countryTargeting, newVal);
  },
  { deep: true, immediate: true }
);

watch(
  deviceSetting,
  (newVal) => {
    if (!newVal) return;
    Object.assign(deviceStore.deviceSetting, newVal);
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #ccfbf1;
  border-radius: 9999px;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border: 1px solid #0d9488;
  border-radius: 50%;
  cursor: pointer;
  background: radial-gradient(circle, #0d9488 4px, #ffffff 4px);
}

input[type="range"]::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: 1px solid #0d9488;
  background: radial-gradient(circle, #0d9488 4px, #ffffff 4px);
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-track {
  height: 6px;
  background: #f0fdfa;
  border-radius: 9999px;
}

.date-time-rules :deep(.el-select) {
  width: 100% !important;
}

.date-time-rules .calender-input {
  width: 100% !important;
}

.day-schedule-rules :deep(.el-input) {
  height: 42px !important;
}

.day-schedule-rules :deep(.el-input__wrapper) {
  border-radius: 12px !important;
  height: 42px !important;
  box-shadow: 0 0 0 1px #d1d5db inset !important;
  background-color: #ffffff !important;
}

.day-schedule-rules :deep(.el-input__wrapper:focus-within) {
  box-shadow: 0 0 0 2px #0d9488 inset !important;
}

/* PRO Upgrade Hover Blur & Overlay Reveal */
.pro-content:hover .pro-overlay {
  display: flex !important;
}

.pro-content:hover .page-rules-container,
.pro-content:hover .date-time-rule-container,
.pro-content:hover .day-hours-rule-container,
.pro-content:hover .country-rule-container {
  filter: blur(3px);
  pointer-events: none;
  /* Prevents clicking fields when blurred */
  transition: filter 0.2s ease-in-out;
}
</style>
