<template>
  <div class="max-w-5xl mx-auto">
    <header class="text-center pt-6 pb-10 md:pt-10 md:pb-14">
      <div
        class="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-6">
        <i class="ri-information-line mr-1.5 text-sm"></i>Simple, transparent pricing
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Flexible Plans for Growing Businesses</h2>
      <p class="text-base text-slate-500 max-w-lg mx-auto mb-8">
        Start for free and upgrade as your audience grows. No hidden fees.
      </p>
      <div class="inline-flex items-center gap-3 bg-white rounded-full border border-slate-200 p-1 shadow-sm">
        <button
          class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer bg-teal-700 text-white shadow-sm">
          Monthly</button
        ><button
          class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 text-slate-600 hover:text-slate-800">
          Yearly<span
            class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700"
            >Save 20%</span
          >
        </button>
      </div>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-16 md:mb-20">
      <div class="relative bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col">
        <div class="mb-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full"
            >Starter</span
          >
        </div>
        <h3 class="text-xl font-bold text-slate-800 mt-3">Free</h3>
        <p class="text-sm text-slate-500 mt-1">Ideal for individuals and small businesses just getting started.</p>
        <div class="mt-6 mb-1 flex items-baseline gap-1">
          <span class="text-4xl md:text-5xl font-extrabold text-slate-800">$0</span
          ><span class="text-sm text-slate-500">/ month</span>
        </div>
        <p class="text-xs text-slate-400 mb-6">Forever free. No credit card needed.</p>
        <button
          class="w-full py-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all duration-200 whitespace-nowrap cursor-pointer mb-8">
          Get Started Free
        </button>
        <div class="space-y-3.5 mt-auto">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">What's included</p>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-slate-400"
              ><i class="ri-check-line text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-600">Up to 3 Active Forms</span>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-slate-400"
              ><i class="ri-check-line text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-600">500 Submissions / month</span>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-slate-400"
              ><i class="ri-check-line text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-600">Standard Form Fields &amp; Library</span>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-slate-400"
              ><i class="ri-check-line text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-600">Basic Form Styling &amp; Color Customization</span>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-slate-400"
              ><i class="ri-check-line text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-600">Standard Time Delay Triggers</span>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-slate-400"
              ><i class="ri-check-line text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-600">Community Support</span>
          </div>
        </div>
      </div>
      <div
        class="relative bg-white rounded-2xl p-6 md:p-8 flex flex-col border-2 border-teal-500 shadow-xl shadow-teal-500/10">
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            class="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-semibold shadow-md shadow-teal-500/30 whitespace-nowrap"
            ><i class="ri-star-fill text-[10px]"></i>Most Popular</span
          >
        </div>
        <div class="mb-1 mt-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full"
            >Pro</span
          >
        </div>
        <h3 class="text-xl font-bold text-slate-800 mt-3">Professional</h3>
        <p class="text-sm text-slate-500 mt-1">Full power of FormFlow with advanced targeting and unlimited growth.</p>
        <div class="mt-6 mb-1 flex items-baseline gap-1">
          <span class="text-4xl md:text-5xl font-extrabold text-slate-800">$19</span
          ><span class="text-sm text-slate-500">/ month</span>
        </div>
        <p class="text-xs text-slate-400 mb-6">Billed monthly. Cancel anytime.</p>
        <button
          class="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-md shadow-teal-600/20 transition-all duration-200 hover:shadow-lg hover:shadow-teal-600/25 whitespace-nowrap cursor-pointer hover:scale-[1.02] mb-8">
          Upgrade to Pro
        </button>
        <div class="space-y-3.5 mt-auto">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Everything in Starter, plus</p>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium"
              >Unlimited Active Forms &amp; Submissions</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium"
              >Advanced Page Rules (Show / Hide on specific URLs)</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium"
              >Date &amp; Time Scheduling (Specific active date ranges)</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium"
              >Days &amp; Hours Target Schedule (Mon-Sun custom time slots)</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium">Country &amp; Geolocation Targeting</span>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium"
              >Cart &amp; Order Value Targeting (Shopify integration)</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium">Remove FormFlow Branding</span>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-100 text-teal-600"
              ><i class="ri-check-fill text-xs"></i></span
            ><span class="text-sm leading-relaxed text-slate-800 font-medium">Priority 24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
    <section class="mb-16 md:mb-20">
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
        <p class="text-sm text-slate-500">Have questions? We're here to help.</p>
      </div>
      <div class="max-w-3xl mx-auto space-y-3">
        <div class="bg-white rounded-xl border transition-all duration-300 border-slate-200 hover:border-slate-300">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group">
            <span class="text-sm font-semibold text-slate-800 pr-4 group-hover:text-teal-700 transition-colors"
              >Can I switch between Free and Pro plans at any time?</span
            ><span
              class="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-300 bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600"
              ><i class="ri-arrow-down-s-line text-sm"></i
            ></span>
          </button>
          <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
            <p class="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
              Absolutely. You can upgrade to Pro or downgrade back to Free at any point from your account settings. When
              you upgrade, all your existing forms, submissions, and settings carry over seamlessly. If you downgrade,
              any Pro-only features will be paused but not deleted — your data stays safe and accessible.
            </p>
          </div>
        </div>
        <div class="bg-white rounded-xl border transition-all duration-300 border-slate-200 hover:border-slate-300">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group">
            <span class="text-sm font-semibold text-slate-800 pr-4 group-hover:text-teal-700 transition-colors"
              >What happens when I reach my monthly submission limit on the Free plan?</span
            ><span
              class="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-300 bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600"
              ><i class="ri-arrow-down-s-line text-sm"></i
            ></span>
          </button>
          <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
            <p class="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
              When you hit the 500 submission monthly cap, new submissions will be paused until the next billing cycle.
              You'll receive an email notification at 80% and 100% of your limit so you have time to upgrade. Upgrading
              to Pro removes all limits instantly, and all submissions queued during the pause are retroactively
              accepted.
            </p>
          </div>
        </div>
        <div class="bg-white rounded-xl border transition-all duration-300 border-slate-200 hover:border-slate-300">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group">
            <span class="text-sm font-semibold text-slate-800 pr-4 group-hover:text-teal-700 transition-colors"
              >Do you offer a free trial for the Pro plan?</span
            ><span
              class="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-300 bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600"
              ><i class="ri-arrow-down-s-line text-sm"></i
            ></span>
          </button>
          <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
            <p class="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
              Yes. Every new FormFlow account gets a 14-day free trial of the Pro plan with full access to all features
              — no credit card required. You can explore advanced page rules, geolocation targeting, and custom
              scheduling before deciding if Pro is right for you.
            </p>
          </div>
        </div>
        <div class="bg-white rounded-xl border transition-all duration-300 border-slate-200 hover:border-slate-300">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group">
            <span class="text-sm font-semibold text-slate-800 pr-4 group-hover:text-teal-700 transition-colors"
              >How does country and page rule targeting work?</span
            ><span
              class="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-300 bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600"
              ><i class="ri-arrow-down-s-line text-sm"></i
            ></span>
          </button>
          <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
            <p class="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
              Advanced Targeting lets you control exactly where and when your forms appear. Page Rules allow you to show
              or hide forms on specific URLs or URL patterns (e.g., only on /checkout pages). Country Targeting uses
              IP-based geolocation to display forms to visitors from selected countries. You can also set Date &amp;
              Time schedules and even target by cart value when integrated with Shopify. All targeting rules can be
              combined for precise control.
            </p>
          </div>
        </div>
        <div class="bg-white rounded-xl border transition-all duration-300 border-teal-200 shadow-sm">
          <button class="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group">
            <span class="text-sm font-semibold text-slate-800 pr-4 group-hover:text-teal-700 transition-colors"
              >Can I cancel my subscription anytime?</span
            ><span
              class="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-300 bg-teal-100 text-teal-700 rotate-180"
              ><i class="ri-arrow-down-s-line text-sm"></i
            ></span>
          </button>
          <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-96 opacity-100">
            <p class="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
              Of course. There are no long-term contracts or cancellation fees. You can cancel your Pro subscription at
              any time from your billing settings, and you'll continue to have Pro access until the end of your current
              billing period. After that, your account gracefully reverts to the Free plan.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="mb-10">
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 p-8 md:p-12 text-center">
        <div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4"></div>
        <div class="relative z-10">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Ready to build high-converting forms?</h2>
          <p class="text-teal-100 text-sm md:text-base mb-7 max-w-md mx-auto">
            Start building in 2 minutes — no credit card required.
          </p>
          <button
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-teal-700 text-sm font-semibold hover:bg-teal-50 transition-all duration-200 shadow-lg shadow-black/10 hover:scale-[1.03] whitespace-nowrap cursor-pointer">
            <i class="ri-rocket-line text-base"></i>Start Building Free
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
