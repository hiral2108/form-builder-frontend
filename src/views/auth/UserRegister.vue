<template>
  <div>
    <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white mb-4 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40">
         <img v-svg-inline src="@/assets/icons/settingpage/file-list-3-line.svg" class="text-white w-6 h-6"/>
        </div>
        <h1 class="text-2xl font-bold text-slate-800">Create your account</h1>
        <p class="text-slate-500 mt-1 text-sm">Start building forms in minutes</p>
      </div>
      <form autocomplete="off" @submit.prevent="handleRegister">
        <div class="mb-4">
          <InputFieldWithIcon
            type="text"
            icon="user"
            label="Name"
            :has-icon="true"
            placeholder="Enter your name"
            :hasError="$v.name.$dirty && $v.name.$error"
            :validationMessage="$v.name.$errors"
            :value="form.name"
            @input="form.name = $event"
            @blur="$v.name.$touch" />
        </div>
        <div class="mb-4">
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
        <div class="mb-4">
          <InputFieldWithIcon
            type="password"
            icon="password"
            label="Password"
            :has-icon="true"
            placeholder="Enter your password"
            :hasError="$v.password.$dirty && $v.password.$error"
            :validationMessage="$v.password.$errors"
            :value="form.password"
            @input="form.password = $event"
            @blur="$v.password.$touch" />
        </div>
        <div class="mb-5">
          <InputFieldWithIcon
            type="password"
            icon="password"
            label="Confirm Password"
            :has-icon="true"
            placeholder="Confirm your password"
            :hasError="$v.confirmPassword.$dirty && $v.confirmPassword.$error"
            :validationMessage="$v.confirmPassword.$errors"
            :value="form.confirmPassword"
            @input="form.confirmPassword = $event"
            @blur="$v.confirmPassword.$touch" />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="relative w-full cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-teal-500/30 transition-all duration-200 whitespace-nowrap disabled:cursor-pointer"
          :class="[
            isLoading
              ? 'blur-[0.5px] opacity-80 cursor-pointer'
              : 'cursor-pointer hover:shadow-xl hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]',
          ]">
          <span class="flex items-center justify-center gap-2">
            Create Account
            <img v-svg-inline src="@/assets/icons/auth/user-plus.svg" />
            <ButtonLoader v-if="isLoading" :classes="['absolute', 'right-4']" />
          </span>
        </button>
      </form>
      <p class="text-center text-sm text-slate-500 mt-4">
        Already have an account?
        <router-link class="text-teal-600 hover:text-teal-700 font-medium" to="/login">Sign in</router-link>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, reactive, ref } from "vue";
  import { showErrorMessage, showSuccessMessage } from "@/utils";
  import AuthService from "@/services/api/auth-services";
  import { useShopUser } from "@/composable/useShopUser";

  // Validators
  import useVuelidate from "@vuelidate/core";
  import { email, helpers, required, minLength, sameAs } from "@vuelidate/validators";
  import { useRouter } from "vue-router";

  const isLoading = ref<boolean>(false);
  const router = useRouter();
  const { getCurrentUser } = useShopUser();

  const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const rules = computed(() => {
    return {
      name: { required: helpers.withMessage("Name is required", required) },
      email: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("Please enter a valid email address", email),
      },
      password: {
        required: helpers.withMessage("Password is required", required),
        minLength: helpers.withMessage("Password must contain at least 6 characters", minLength(6)),
      },
      confirmPassword: {
        required: helpers.withMessage("Confirm password is required", required),
        sameAsPassword: helpers.withMessage("Passwords do not match", sameAs(computed(() => form.password))),
      },
    };
  });

  const $v = useVuelidate(rules, form);

  const handleRegister = async () => {
    $v.value.$touch();
    if ($v.value.$pending || $v.value.$error) {
      return false;
    }

    await registerUser();
  };

  const registerUser = async () => {
    isLoading.value = true;
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        src: "Shopify",
      };
      const { access_token, message } = await new AuthService().register(payload);
      sessionStorage.setItem("authToken", access_token);
      showSuccessMessage(message);
      await getCurrentUser();
      isLoading.value = false;
      return router.push("/dashboard");
    } catch (error: any) {
      console.log(error.response.data.message);
      showErrorMessage(error);
      isLoading.value = false;
    }
  };
</script>
