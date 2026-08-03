<template>
  <div>
    <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
      <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-700 text-white mb-4 shadow-lg shadow-teal-700/20">
        <i class="ri-file-list-3-line text-2xl"></i>
      </div>
      <h1 class="text-2xl font-bold text-slate-800">Create your account</h1>
      <p class="text-slate-500 mt-1 text-sm">Start building forms in minutes</p>
    </div>
      <form>
        <div class="mb-4">
          <label for="reg-name" class="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
          <input
            id="reg-name"
            class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
            placeholder="John Doe"
            type="text"
            value="" 
          />
        </div>
        <div class="mb-4">
          <label for="reg-email" class="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
          <input
            id="reg-email"
            class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
            placeholder="you@company.com"
            autocomplete="email"
            type="email"
            value="" 
          />
        </div>
        <div class="mb-4">
          <label for="reg-pw" class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div class="relative">
            <input
              id="reg-pw"
              class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 pr-10 transition-all"
              placeholder="Min. 8 characters"
              autocomplete="new-password"
              type="password"
              value="" 
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <i class="ri-eye-off-line text-lg"></i>
            </button>
          </div>
        </div>
        <div class="mb-5">
          <label for="reg-cpw" class="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
          <div class="relative">
            <input
              id="reg-cpw"
              class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 pr-10 transition-all"
              placeholder="Re-enter your password"
              autocomplete="new-password"
              type="password"
              value="" 
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <i class="ri-eye-off-line text-lg"></i>
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-teal-700/10 hover:shadow-teal-700/20 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          Create Account
        </button>
      </form>
       <p class="text-center text-sm text-slate-500 mt-4">
      Already have an account?
      <router-link class="text-teal-700 hover:text-teal-800 font-medium" to="/login">Sign in</router-link>
    </p>
    </div>

   
  </div>
</template>