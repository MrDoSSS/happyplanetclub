const ganache = require('ganache')
const accountKeys = require('./account-keys.json')
const Web3 = require('web3')
const path = require('path')

const accounts = Object.values(accountKeys.private_keys).map((secretKey) => ({
  secretKey,
  balance: BigInt(Web3.utils.toWei('100')),
}))

const options = {
  wallet: {
    accounts,
  },
  database: {
    dbPath: path.join(__dirname, 'ganache-db'),
  },
}
const server = ganache.server(options)
const PORT = 8545

server.listen(PORT, async (err) => {
  if (err) throw err

  console.log(`ganache listening on port ${PORT}...`)
})

server.provider.on('ganache:vm:tx:console.log', (event) => {
  console.log(...event.logs)
})
