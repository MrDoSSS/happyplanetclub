<script lang="ts" setup>
import { emitter } from '@/event-bus'
import { useWalletStore } from '@/store/wallet'
import { useAuthStore } from '@/store/auth'
import { useWhitelistStore } from '@/store/whitelist'
import { computed } from 'vue'

const showConnectModal = () => emitter.emit('ConnectModal:show', false)

const walletStore = useWalletStore()
const authStore = useAuthStore()
const whitelistStore = useWhitelistStore()

const slisedWallet = computed(
  () => `${walletStore.currentAccount.slice(0, 9)}...`
)
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark">
    <div
      class="container-xl flex-lg-row justify-content-lg-center align-items-lg-center flex-column"
    >
      <router-link :to="{ name: 'home' }" class="navbar-brand me-0 me-lg-3">
        <picture>
          <source srcset="/logo.webp" type="image/webp" />
          <source srcset="/logo.png" type="image/png" />
          <img src="/logo.png" />
        </picture>
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
        <template v-if="walletStore.connected && authStore.loggedIn">
          <li class="nav-item">
            <span class="text-success nav-link" v-if="whitelistStore.exists">
              Whitelisted
            </span>
            <span class="text-danger nav-link" v-else>Not Whitelisted</span>
          </li>
          <li class="nav-item">
            <span class="text-primary fw-bolder nav-link">
              {{ slisedWallet }}
            </span>
          </li>
        </template>
        <li class="nav-item ms-lg-2 full-width" v-else>
          <button class="btn btn-primary" @click="showConnectModal">
            Connect Wallet
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
