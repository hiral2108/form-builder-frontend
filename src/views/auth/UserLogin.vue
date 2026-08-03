<template>
  <div>
    

    <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-700 text-white mb-4 shadow-lg shadow-teal-700/20">
        <i class="ri-file-list-3-line text-2xl"></i>
      </div>
      <h1 class="text-2xl font-bold text-slate-800">FormFlow</h1>
      <p class="text-slate-500 mt-1 text-sm">Sign in to your account to continue</p>
    </div>
      <form>
        <div class="mb-5">
          <label for="login-email" class="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
          <input
            id="login-email"
            class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
            placeholder="admin@formflow.io"
            autocomplete="email"
            type="email"
            value="" 
          />
        </div>
        <div class="mb-3">
          <label for="login-pw" class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div class="relative">
            <input
              id="login-pw"
              class="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
              placeholder="••••••••"
              autocomplete="current-password"
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
        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <div class="w-9 h-5 rounded-full relative transition-colors bg-slate-300">
              <div class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform left-0.5"></div>
            </div>
            <span class="text-sm text-slate-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-teal-700 hover:text-teal-800 font-medium">Forgot password?</a>
        </div>
        <button
          type="submit"
          class="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-teal-700/10 hover:shadow-teal-700/20 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          Sign In
        </button>
      </form>
       <p class="text-center text-sm text-slate-500 mt-4">
      Don't have an account?
      <router-link class="text-teal-700 hover:text-teal-800 font-medium" to="/register">Create one</router-link>
    </p>
    </div>

   
  </div>
</template>