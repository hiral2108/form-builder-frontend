<template>
  <div id="root">
    <div class="flex h-screen bg-white overflow-hidden relative font-sans">
      <!-- Mobile Sidebar Backdrop overlay -->
      <div
        v-if="isMobile && isMobileSidebarOpen"
        @click="isMobileSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden transition-opacity"
      ></div>

      <!-- Collapsible White Sidebar (No Right Border Partition) -->
      <aside
        class="setting-sidebar fixed top-0 left-0 h-full z-40 flex flex-col bg-white text-slate-800 transition-all duration-300 ease-in-out w-60 lg:translate-x-0"
        :class="[{ 'collapse-sidebar': isCollapsed }, isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
      >
        <!-- Branding Header -->
        <div class="h-16 flex items-center px-6 justify-between app-icon">
          <router-link to="/dashboard" class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40">
              <img v-svg-inline src="@/assets/icons/settingpage/file-list-3-line.svg" class="text-white w-5 h-5"/>
            </div>
            <!-- <span class="font-bold text-teal-900 text-xl tracking-tight truncate collapse-hidden-item">{{appName}}</span> -->
             <span 
              class="font-bold text-teal-900 text-xl tracking-tight truncate collapse-hidden-item"
              style="font-family: math;">
              {{appName}}
            </span>
          </router-link>
        </div>

        <!-- Navigation list -->
        <nav class="flex-1 py-4 px-2 space-y-1">
          <div v-for="item in navItems" :key="item.routeName" class="relative tooltip-wrapper">
            <router-link
              :to="item.path"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer relative whitespace-nowrap text-slate-600 hover:bg-slate-50 hover:text-slate-900 setting-sidebar-item"
              :class="[route.path === item.path ? 'active' : '']"
            >
              <!-- Teal left indicator bar -->
              <span
                v-if="route.path === item.path"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-600 rounded-r-full"
              ></span>
              
              <div class="w-5 h-5 flex items-center justify-center flex-shrink-0 text-lg">
                <img v-svg-inline :src="item.icon" :alt="item.label" />
              </div>
              <span class="collapse-hidden-item">{{ item.label }}</span>
            </router-link>
            
            <!-- Tooltip visible on collapse hover -->
            <span class="sidebar-tooltip">{{ item.label }}</span>
          </div>
        </nav>

        <!-- Bottom User details -->
        <div class="p-2 border-t border-slate-100/50">
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors user-detail-section">
            <div class="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
              <div class="w-full h-full flex items-center justify-center bg-teal-50 text-teal-700 text-xs font-semibold">
                JD
              </div>
            </div>
            <div class="collapse-hidden-item min-w-0">
              <p class="text-xs font-semibold text-slate-800 truncate">John Doe</p>
              <p class="text-[10px] text-slate-400 truncate">john@example.com</p>
            </div>
          </div>
        </div>

        <!-- Floating Sidebar Collapse Toggle Button (Sticks on the border) -->
        <template v-if="!isCollapsed">
            <button
              @click="collapseMenu"
              :class="{ hidden: isCollapsed || isMobile }"
              class="hidden lg:flex absolute right-[-18px] bottom-20 w-8.5 h-8.5 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm cursor-pointer z-50 transition-all duration-300 hover:scale-105"
            >
              <img v-svg-inline :src="arrowLeft" alt="Hide Icon" class="h-5 w-5 text-slate-600" />
            </button>
          </template>
          <template v-else>
            <button
              @click="collapseMenu"
              class="hidden lg:flex absolute right-[-18px] bottom-20 w-8.5 h-8.5 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm cursor-pointer z-50 transition-all duration-300 hover:scale-105"
            >
              <img v-svg-inline :src="arrowRight" alt="Show Icon"  class="h-5 w-5 text-slate-600"/>
            </button>
          </template>
      </aside>

      <!-- Main Panel area (No partition background) -->
      <main
        class="flex-1 flex flex-col relative h-screen overflow-hidden transition-all duration-300 bg-white"
        :class="[isMobile ? 'pl-0' : isCollapsed ? 'pl-20' : 'pl-60']"
      >
        <!-- Header -->
        <Header @toggle-mobile-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen" :title="pageTitle" :subtitle="pageSubtitle" />

        <!-- Curved Content Container -->
        <div class="flex-1 pt-0 pr-4 pb-4 pl-0 bg-white min-h-0 relative">
          <div class="w-full h-full bg-slate-50 border border-slate-200/50 rounded-[20px] overflow-auto p-6 relative">
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
import arrowLeft from "@/assets/icons/settingpage/arrow-left-s-line.svg"
import arrowRight from "@/assets/icons/settingpage/arrow-right-s-line.svg"

const route = useRoute();
const isCollapsed = ref(false);
const isMobile = ref(false);
const isMobileSidebarOpen = ref(false);

const appName = inject("appName");

const collapseMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1024;
  if (isMobile.value) {
    isCollapsed.value = false;
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
];
const pageMeta: Record<string, { title: string; subtitle?: string }> = {
    DashboardPage: { title: "Dashboard", subtitle: "Build, manage, and track all your forms." },
    FormsPage: { title: "Forms", subtitle: "Manage your active and draft forms in one place." },
    SubmissionsPage: { title: "Submissions", subtitle: "Review and analyze form user responses." },
};
const pageTitle = computed(() => pageMeta[route.name as string]?.title || "");
const pageSubtitle = computed(() => pageMeta[route.name as string]?.subtitle || "");

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

watch(
  () => route.name,
  (newName) => {
    isMobileSidebarOpen.value = false;
    // Automatically collapse sidebar on FormSettingsPage
    if (newName === "FormSettingsPage") {
      isCollapsed.value = true;
    } else {
      isCollapsed.value = false;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.collapse-sidebar.setting-sidebar {
  width: 80px !important;
}

.collapse-sidebar .collapse-hidden-item {
  display: none !important;
}

.collapse-sidebar .app-icon {
  justify-content: center;
}

.collapse-sidebar .setting-sidebar-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  justify-content: center !important;
}

.collapse-sidebar .user-detail-section {
  padding: 3px 0 !important;
  justify-content: center;
}

.collapse-sidebar .setting-sidebar-item.active {
  background-color: transparent !important;
  box-shadow: none !important;
}

.setting-sidebar-item.active {
  background-color: #f0fdfa; /* Light Teal-50 background */
  color: #0d9488 !important; /* Teal-600 text */
  font-weight: 600;
}

/* Sidebar tooltips when collapsed */
.sidebar-tooltip {
  display: none;
}

.collapse-sidebar .sidebar-tooltip {
  display: inline-flex;
  position: absolute;
  left: 80px;
  top: 50%;
  transform: translateY(-50%) scaleX(0);
  transform-origin: left;
  background-color: #0f172a;
  color: #ffffff;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.2s linear;
  z-index: 9999;
  align-items: center;
  justify-content: center;
}

.collapse-sidebar .sidebar-tooltip::before {
  content: "";
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #0f172a;
}

.collapse-sidebar .tooltip-wrapper:hover .sidebar-tooltip {
  opacity: 1;
  transform: translateY(-50%) scaleX(1);
}

.menu-close img,
.menu-open img {
  height: 16px !important;
  width: 16px !important;
}
</style>