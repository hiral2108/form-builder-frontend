<template>
  <div id="root">
    <div class="flex h-screen bg-slate-50 overflow-hidden relative">
      <!-- Mobile Sidebar Backdrop overlay -->
      <div
        v-if="isMobile && isMobileSidebarOpen"
        @click="isMobileSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden transition-opacity"
      ></div>

      <!-- Collapsible Sidebar contained directly in layout -->
      <aside
        class="setting-sidebar fixed top-0 left-0 h-full z-40 flex flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out w-60 lg:translate-x-0"
        :class="[{ 'collapse-sidebar': isCollapsed }, isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
      >
        <!-- Branding Icon & Title -->
        <div class="h-16 flex items-center px-4 border-b border-slate-700/50 justify-between app-icon">
          <template v-if="!isCollapsed">
            <router-link to="/dashboard" class="flex items-center gap-3 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center flex-shrink-0">
                <i class="ri-file-list-3-line text-white text-base"></i>
              </div>
              <span class="font-semibold text-white whitespace-nowrap text-sm truncate collapse-hidden-item">FormFlow</span>
            </router-link>
            <button
              @click="collapseMenu"
              :class="{ hidden: isCollapsed || isMobile }"
              class="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer menu-close"
            >
              <i class="ri-menu-fold-line text-lg"></i>
            </button>
          </template>
          <template v-else>
            <button
              @click="collapseMenu"
              class="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer menu-open mx-auto"
            >
              <i class="ri-menu-unfold-line text-lg"></i>
            </button>
          </template>
        </div>

        <!-- Navigation list -->
        <nav class="flex-1 py-4 px-2 space-y-1">
          <div v-for="item in navItems" :key="item.routeName" class="relative tooltip-wrapper">
            <router-link
              :to="item.path"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer relative whitespace-nowrap text-slate-300 hover:bg-slate-800 hover:text-white setting-sidebar-item"
              :class="[route.path === item.path ? 'active' : '']"
            >
              <span
                v-if="route.path === item.path"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-teal-500 rounded-r-full"
              ></span>
              <div class="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i :class="[item.icon, 'text-lg']"></i>
              </div>
              <span class="collapse-hidden-item">{{ item.label }}</span>
            </router-link>
            
            <!-- Tooltip visible on collapse hover -->
            <span class="sidebar-tooltip">{{ item.label }}</span>
          </div>
        </nav>

        <!-- Bottom User details wrapper -->
        <div class="p-2 border-t border-slate-700/50">
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors user-detail-section">
            <div class="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
              <div class="w-full h-full flex items-center justify-center bg-teal-100 text-teal-700 text-xs font-semibold">
                JD
              </div>
            </div>
            <div class="collapse-hidden-item min-w-0">
              <p class="text-xs font-semibold text-white truncate">John Doe</p>
              <p class="text-[10px] text-slate-400 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main workspace frame -->
      <main
        class="flex-1 flex flex-col relative h-screen overflow-hidden transition-all duration-300 bg-white"
        :class="[isMobile ? 'pl-0' : isCollapsed ? 'pl-20' : 'pl-60']"
      >
        <!-- Separate Header component -->
        <Header @toggle-mobile-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen" />

        <!-- Router pages content outlet -->
        <div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden relative p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import Header from "./Header.vue";

const route = useRoute();
const isCollapsed = ref(false);
const isMobile = ref(false);
const isMobileSidebarOpen = ref(false);

const collapseMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 1024;
  if (isMobile.value) {
    isCollapsed.value = false;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

watch(
  () => route.name,
  () => {
    isMobileSidebarOpen.value = false;
  }
);

const navItems = [
  {
    label: "Dashboard",
    routeName: "DashboardPage",
    path: "/dashboard",
    icon: "ri-dashboard-line",
  },
  {
    label: "Forms",
    routeName: "FormsPage",
    path: "/forms",
    icon: "ri-file-list-3-line",
  },
  {
    label: "Submissions",
    routeName: "SubmissionsPage",
    path: "/submissions",
    icon: "ri-inbox-archive-line",
  },
  {
    label: "Settings",
    routeName: "SettingsPage",
    path: "/settings",
    icon: "ri-settings-4-line",
  },
];
</script>

<style scoped>
.collapse-sidebar {
  width: 80px !important;
  .collapse-hidden-item {
    display: none !important;
  }
  .app-icon {
    justify-content: center;
  }
  .setting-sidebar-item {
    padding-left: 0 !important;
    padding-right: 0 !important;
    justify-content: center !important;
  }
  .user-detail-section {
    padding: 3px 0 !important;
    justify-content: center;
  }
  .setting-sidebar-item.active {
    background-color: transparent !important;
    box-shadow: none !important;
  }
}

.setting-sidebar-item.active {
  background-color: rgba(20, 184, 166, 0.15); 
  color: #5eead4 !important; 
}

/* Sidebar tooltips */
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
  background-color: #0d9488;
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
  border-right: 5px solid #0d9488;
}

.collapse-sidebar .tooltip-wrapper:hover .sidebar-tooltip {
  opacity: 1;
  transform: translateY(-50%) scaleX(1);
}
</style>