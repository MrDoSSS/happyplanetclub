<script lang="ts" setup>
import { emitter } from '@/event-bus'
import { useWalletStore } from '@/store/wallet'
import { useAuthStore } from '@/store/auth'
import { computed } from 'vue'

const showConnectModal = () => emitter.emit('ConnectModal:show', false)

const walletStore = useWalletStore()
const authStore = useAuthStore()
const slisedWallet = computed(
  () => `${walletStore.currentAccount.slice(0, 9)}...`
)
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div
      class="container-xl flex-lg-row justify-content-lg-center align-items-lg-center flex-column"
    >
      <router-link :to="{ name: 'home' }" class="navbar-brand me-0 me-lg-3">
        <img src="/logo.png" alt="Happy planet club" />
      </router-link>
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#mint">Mint (Soon)</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#learn">Learn</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item ms-lg-2 full-width">
          <span
            class="text-primary fw-bolder"
            v-if="walletStore.connected && authStore.loggedIn"
          >
            {{ slisedWallet }}
          </span>
          <button class="btn btn-primary" @click="showConnectModal" v-else>
            Connect Wallet
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
