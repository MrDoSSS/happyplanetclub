<script lang="ts" setup>
import { contract } from '@/web3'
import { ref } from 'vue'
import { estimateGas } from '@/utils'

const address = ref('')
const amount = ref(1)

const airdrop = async () => {
  const method = contract.methods.airdrop(address.value, amount.value)
  const gas = await estimateGas(method, 80000 * amount.value)
  await method.send({
    gas,
    maxPriorityFeePerGas: null,
    maxFeePerGas: null,
  })
}
</script>

<template>
  <input class="form-control" v-model="address" />
  <input class="form-control" v-model.number="amount" />
  <button class="btn btn-primary" @click="airdrop">Drop</button>
</template>

<style lang="scss" scoped></style>
