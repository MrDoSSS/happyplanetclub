import { defineStore } from 'pinia'
import { contract } from '@/web3'

export const useContractStore = defineStore('contract', {
  state: () => ({
    paused: false,
    presaled: false,
    allowedPublic: false,
    price: 0,
    presalePrice: 0,
    totalSupply: 0,
    maxTotalSupply: 0,
    numberMinted: 0,
    tokens: [],
  }),

  actions: {
    async init(address: string) {
      this.totalSupply = await contract.methods
        .totalSupply()
        .call()
        .then(parseInt)
      this.presaled = await contract.methods.presaled().call()
      this.paused = await contract.methods.paused().call()
      this.allowedPublic = await contract.methods.allowedPublic().call()
      this.maxTotalSupply = await contract.methods
        .maxTotalSupply()
        .call()
        .then(parseInt)
      this.price = await contract.methods.price().call().then(parseInt)
      this.presalePrice = await contract.methods
        .presalePrice()
        .call()
        .then(parseInt)

      await this.fetchTokensOfOwner(address)
    },
    async fetchTokensOfOwner(address: string) {
      this.tokens = await contract.methods.tokensOfOwner(address).call()
    },
  },
})
