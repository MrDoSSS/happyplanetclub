import Web3 from 'web3'

const providerUrl = process.env.FUNCTIONS_EMULATOR
  ? 'ws://localhost:8545'
  : `wss://${process.env.ETH_NETWORK}.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`

const provider = new Web3.providers.WebsocketProvider(providerUrl, {
  clientConfig: { keepalive: true, keepaliveInterval: -1 },
  reconnect: { auto: true, delay: 1000 },
})

export const web3 = new Web3(provider)

export const getAccount = () => {
  const account = web3.eth.accounts.wallet.add({
    address: process.env.OWNER_ADDRESS!,
    privateKey: process.env.OWNER_PK!,
  })

  return account
}
