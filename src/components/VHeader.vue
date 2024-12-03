<template>
  <header
    class="surface-200 px-4 py-2 flex justify-content-between align-items-center shadow-2 mb-3"
  >
    <h1 class="text-800 text-lg font-medium">Привет, {{ userLogin }}</h1>
    <Button
      label="Выйти"
      icon="pi pi-sign-out"
      class="p-button-danger p-button-sm"
      @click="logoutHandler"
    />
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useUserStore } from '@/stores/user'
import Button from 'primevue/button'
import { computed } from 'vue'

const userStore = useUserStore()

const userLogin = computed(() => {
  return userStore.user?.login
})

const { logoutHandler } = useAuth()
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
