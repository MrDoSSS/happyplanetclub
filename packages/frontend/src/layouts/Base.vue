<script lang="ts" setup>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheConnectModal from '@/components/TheConnectModal.vue'
</script>

<template>
  <div class="layout h-100 d-flex flex-column">
    <TheNavbar class="mb-3" />
    <main class="flex-grow-1 d-flex flex-column">
      <Suspense>
        <RouterView />
        <template #fallback>Loading...</template>
      </Suspense>
    </main>
    <TheFooter />
  </div>
  <TheConnectModal />
</template>
