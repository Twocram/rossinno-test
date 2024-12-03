<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuth } from './composables/useAuth'

const { checkUserHandler } = useAuth()

onMounted(async () => {
  await checkUserHandler()
})
</script>

<style scoped></style>
