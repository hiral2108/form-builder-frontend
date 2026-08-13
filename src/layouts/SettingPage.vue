<template>
  <div id="root">
    <div class="flex h-screen bg-white relative font-sans">
      <div
        v-if="isMobile && isMobileSidebarOpen"
        @click="isMobileSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden transition-opacity"></div>

      <aside
        class="setting-sidebar fixed top-0 left-0 h-full z-40 flex flex-col bg-white text-slate-800 transition-all duration-300 ease-in-out w-60 lg:translate-x-0"
        :class="[
          { 'collapse-sidebar': isCollapsed },
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ]">
        <div class="h-16 flex items-center px-6 justify-between app-icon">
          <router-link to="/dashboard" class="flex items-center gap-2.5 min-w-0">
            <div
              class="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40">
              <img v-svg-inline src="@/assets/icons/settingpage/file-list-3-line.svg" class="text-white w-5 h-5" />
            </div>
            <span
              class="font-bold text-teal-900 text-xl tracking-tight truncate collapse-hidden-item"
              style="font-family: math">
              {{ appName }}
            </span>
          </router-link>
        </div>

        <nav class="flex-1 py-4 px-2 space-y-1">
          <div v-for="item in navItems" :key="item.routeName" class="relative tooltip-wrapper">
            <router-link
              :to="item.path"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer relative whitespace-nowrap text-slate-600 hover:bg-slate-50 hover:text-slate-900 setting-sidebar-item"
              :class="{ active: activeLink === item.routeName }">
              <span
                v-if="activeLink === item.routeName"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-600 rounded-r-full"></span>

              <div class="w-5 h-5 flex items-center justify-center flex-shrink-0 text-lg">
                <img v-svg-inline :src="item.icon" :alt="item.label" />
              </div>
              <span class="collapse-hidden-item">{{ item.label }}</span>
            </router-link>

            <span class="sidebar-tooltip">{{ item.label }}</span>
          </div>
        </nav>

       <!-- Bottom User details -->
        <div class="p-2 border-t border-slate-100/50">
          <!-- Skeleton state shown while fetching user -->
          <div
            v-if="!id"
            class="flex items-center gap-3 px-3 py-2.5 user-detail-section animate-pulse">
            <div class="w-8 h-8 flex-shrink-0 rounded-full bg-slate-200"></div>
            <div class="collapse-hidden-item flex-1 min-w-0 space-y-1.5">
              <div class="h-3 bg-slate-200 rounded w-16"></div>
              <div class="h-2.5 bg-slate-200 rounded w-24"></div>
            </div>
          </div>

          <!-- Real loaded state -->
          <div
            v-else
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors user-detail-section">
            <div class="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
              <div
                class="w-full h-full flex items-center justify-center bg-teal-50 text-teal-700 text-xs font-semibold">
                {{ userInitials }}
              </div>
            </div>
            <div class="collapse-hidden-item min-w-0">
              <p class="text-xs font-semibold text-slate-800 truncate">{{ name }}</p>
              <p class="text-[10px] text-slate-400 truncate">{{ email }}</p>
            </div>
          </div>
        </div>

        <template v-if="route.name !== 'FormSettingsPage'">
          <template v-if="!isCollapsed">
            <button
              @click="collapseMenu"
              :class="{ hidden: isCollapsed || isMobile }"
              class="hidden lg:flex absolute right-[-18px] bottom-20 w-8.5 h-8.5 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm cursor-pointer z-50 transition-all duration-300 hover:scale-105">
              <img
                v-svg-inline
                src="@/assets/icons/settingpage/arrow-left-s-line.svg"
                alt="Hide Icon"
                class="h-5 w-5 text-slate-600" />
            </button>
          </template>
          <template v-else>
            <button
              @click="collapseMenu"
              class="hidden lg:flex absolute right-[-18px] bottom-20 w-8.5 h-8.5 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm cursor-pointer z-50 transition-all duration-300 hover:scale-105">
              <img
                v-svg-inline
                src="@/assets/icons/settingpage/arrow-right-s-line.svg"
                alt="Show Icon"
                class="h-5 w-5 text-slate-600" />
            </button>
          </template>
        </template>
      </aside>

      <main
        class="flex-1 flex flex-col relative h-screen transition-all duration-300 bg-white overflow-x-hidden"
        :class="[isMobile ? '' : isCollapsed ? 'pl-20' : 'pl-60']">
        <Header
          @toggle-mobile-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen"
          :title="pageTitle"
          :subtitle="pageSubtitle" />

        <div class="flex-1 pt-0 pb-2 px-2 sm:px-4 lg:pl-0 bg-white relative overflow-y-auto">
          <div
            class="w-full bg-slate-50 border border-slate-200/50 rounded-[20px] relative p-3 lg:p-5 min-h-[calc(100vh-80px)]"
            :class="{ 'h-[calc(100vh-100px)] overflow-hidden': isRouteLoading }">
            <div
              v-if="isRouteLoading"
              class="absolute inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-[1.5px] z-[35] rounded-[20px]">
              <div class="flex flex-col items-center gap-4">
                <div class="meta-loader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span class="text-sm font-semibold text-slate-500 tracking-wide select-none">Loading...</span>
              </div>
            </div>

            <router-view v-slot="{ Component }">
              <component :is="Component" :is-collapsible="isCollapsed" />
            </router-view>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, computed, inject } from "vue";
  import { useRoute } from "vue-router";
  import Header from "./Header.vue";
  import dashboardNav from "@/assets/icons/settingpage/dashboard-line.svg";
  import formNav from "@/assets/icons/settingpage/file-list-2-line.svg";
  import submissionNav from "@/assets/icons/settingpage/task-line.svg";
  import PlanPageIcon from "@/assets/icons/trigger-targeting/crown.svg";
  import { useShopUser } from "@/composable/useShopUser";
  import { isRouteLoading } from "@/composable/useRouteLoader.ts";

  const route = useRoute();
  const isCollapsed = ref(false);
  const userCollapsedChoice = ref(false);
  const isMobile = ref(false);
  const isMobileSidebarOpen = ref(false);

  const appName = inject("appName");

  const { name, email, getCurrentUser, id } = useShopUser();

  const userInitials = computed(() => {
    if (!name.value) return "U";
    const parts = name.value.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  });

  const activeLink = ref(String(route.name || ""));

  const collapseMenu = () => {
    isCollapsed.value = !isCollapsed.value;
    userCollapsedChoice.value = isCollapsed.value; 
  };

  const handleResize = () => {
    isMobile.value = window.innerWidth < 1024;
    if (route.name === "FormSettingsPage") {
      isCollapsed.value = true;
    } else if (isMobile.value) {
      isCollapsed.value = false;
    } else {
      isCollapsed.value = userCollapsedChoice.value;
    }
  };
  const navItems = [
    {
      label: "Dashboard",
      routeName: "DashboardPage",
      path: "/dashboard",
      icon: dashboardNav,
    },
    {
      label: "Forms",
      routeName: "FormsPage",
      path: "/forms",
      icon: formNav,
    },
    {
      label: "Submissions",
      routeName: "SubmissionsPage",
      path: "/submissions",
      icon: submissionNav,
    },
    {
      label: "Change Your Plan",
      routeName: "PlanPage",
      path: "/plan",
      icon: PlanPageIcon,
    },
  ];
  const pageMeta: Record<string, { title: string; subtitle?: string }> = {
    DashboardPage: { title: "Dashboard", subtitle: "Build, manage, and track all your forms." },
    FormsPage: { title: "Forms", subtitle: "Manage your active and draft forms in one place." },
    SubmissionsPage: { title: "Submissions", subtitle: "Review and analyze form user responses." },
    PlanPage: {
      title: "Plans & Pricing",
      subtitle: "Choose the perfect plan to scale your forms and boost conversions.",
    },
  };
  const pageTitle = computed(() => pageMeta[route.name as string]?.title || "");
  const pageSubtitle = computed(() => pageMeta[route.name as string]?.subtitle || "");

  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    getCurrentUser();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  watch(
    () => route.name,
    (newName) => {
      const scrollContainer = document.querySelector(".overflow-y-auto");
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }

      isMobileSidebarOpen.value = false;
      if (newName === "FormSettingsPage") {
        isCollapsed.value = true;
        activeLink.value = "FormsPage"; 
      } else {
        isCollapsed.value = userCollapsedChoice.value;
        activeLink.value = String(newName || "");
      }
    },
    { immediate: true }
  );
</script>

<style scoped>
  .meta-loader {
    position: relative;
    width: 48px;
    height: 48px;
  }

  .meta-loader span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #0d9488; 
    animation: meta-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  .meta-loader span:nth-child(1) {
    animation-delay: -0.45s;
    opacity: 1;
  }

  .meta-loader span:nth-child(2) {
    animation-delay: -0.3s;
    opacity: 0.7;
  }

  .meta-loader span:nth-child(3) {
    animation-delay: -0.15s;
    opacity: 0.4;
  }

  .meta-loader span:nth-child(4) {
    animation-delay: 0s;
    opacity: 0.2;
  }

  @keyframes meta-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
