<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'
import { useWalletStore } from '@/store/wallet'
import { useRouter } from 'vue-router'
import { setInbrowserProvider } from '@/ethereum'

const router = useRouter()

const walletStore = useWalletStore()
const authStore = useAuthStore()

const signIn = async () => {
  setInbrowserProvider()
  await walletStore.connect()
  await authStore.signIn(walletStore.currentAccount!)
  router.replace({ name: 'admin-dashboard' })
}
</script>
<template>
  <div
    class="vw-100 vh-100 bg-dark d-flex justify-content-center align-items-center"
  >
    <button class="btn btn-primary btn-lg" @click="signIn">Sign in</button>
  </div>
</template>
