<template>
  <div>
    <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white mb-4 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40">
          <img v-svg-inline src="@/assets/icons/settingpage/file-list-3-line.svg" class="text-white w-6 h-6"/>
        </div>
        <h1 class="text-2xl font-bold text-slate-800">{{ appName }}</h1>
        <p class="text-slate-500 mt-1 text-sm">Sign in to your account to continue</p>
      </div>
      <form autocomplete="off" @submit.prevent="handleLogin">
        <div class="mb-5">
          <InputFieldWithIcon
            type="email"
            icon="email"
            label="Email Address"
            :has-icon="true"
            placeholder="Enter your email"
            :hasError="$v.email.$dirty && $v.email.$error"
            :validationMessage="$v.email.$errors"
            :value="form.email"
            @input="form.email = $event"
            @blur="$v.email.$touch" />
        </div>
        <div class="mb-3">
          <InputFieldWithIcon
            label="Password"
            type="password"
            icon="password"
            :has-icon="true"
            placeholder="Enter your password"
            :hasError="$v.password.$dirty && $v.password.$error"
            :validationMessage="$v.password.$errors"
            :value="form.password"
            @input="form.password = $event"
            @blur="$v.password.$touch" />
        </div>
        <div class="flex items-center justify-between mb-3.5 mt-3.5">
          <CustomDefaultCheckbox
            label="Remember me"
            v-model="form.remember_me"
            :trueValue="1"
            :falseValue="0"
            size="sm"
            labelClass="text-sm text-gray-700" />
        </div>
        <div
          v-if="form.remember_me === 1"
          class="flex items-center justify-center text-center text-xs text-teal-600 transition-all duration-200 mb-3">
          <span>You will remain logged in for 30 days</span>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="relative w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-teal-500/30 transition-all duration-200 whitespace-nowrap disabled:cursor-pointer"
          :class="[
            isLoading
              ? 'blur-[0.5px] opacity-80 cursor-pointer'
              : 'cursor-pointer hover:shadow-xl hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]',
          ]">
          <span class="flex items-center justify-center gap-2"
            >Sign In
            <img v-svg-inline src="@/assets/icons/auth/right-arrow.svg" alt="Right Arrow" />
            <ButtonLoader v-if="isLoading" :classes="['absolute', 'right-4']" />
          </span>
        </button>
      </form>
      <p class="text-center text-sm text-slate-500 mt-4">
        Don't have an account?
        <router-link class="text-teal-600 hover:text-teal-700 font-medium" to="/register">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, inject, ref, nextTick } from "vue";
  import { useRouter } from "vue-router";
  import { useShopUser } from "@/composable/useShopUser";
  import { useToast } from "vue-toastification";

  // Validators
  import useVuelidate from "@vuelidate/core";
  import { email, helpers, required } from "@vuelidate/validators";

  // Fields
  import AuthService from "@/services/api/auth-services";
  import { showErrorMessage, showSuccessMessage } from "@/utils";

  const appName = inject("appName");
  const toast = useToast();

  const isLoading = ref<boolean>(false);
  const router = useRouter();
  const { getCurrentUser } = useShopUser();

  const form = reactive({
    email: "",
    password: "",
    remember_me: 0,
  });

  const rules = computed(() => {
    return {
      email: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("Please enter a valid email address", email),
      },
      password: { required: helpers.withMessage("Password is required", required) },
    };
  });

  const $v = useVuelidate(rules, form);

  const handleLogin = async () => {
    $v.value.$touch();
    if ($v.value.$pending || $v.value.$error) {
      return false;
    }

    await userLogin();
  };

  const userLogin = async () => {
    isLoading.value = true;
    try {
      const { access_token, message } = await new AuthService().login({
        email: form.email,
        password: form.password,
        remember_me: form.remember_me,
      });
      if (!access_token) {
        toast.error(message);
        isLoading.value = false;
      } else {
        if (form.remember_me === 1) {
          localStorage.setItem("authToken", access_token);
        } else {
          sessionStorage.setItem("authToken", access_token);
        }
        showSuccessMessage(message);
        await getCurrentUser();
        await nextTick();
        await router.push("/dashboard").catch(() => {});
        isLoading.value = false;
      }
    } catch (error: any) {
      showErrorMessage(error);
      isLoading.value = false;
    }
  };
</script>
