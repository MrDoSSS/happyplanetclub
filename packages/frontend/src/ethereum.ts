import WalletLink from 'walletlink'
import { Buffer } from 'buffer'

window.Buffer = Buffer

export let ethereum: typeof window.ethereum

export const setInbrowserProvider = () => {
  ethereum = window.ethereum
}

export const setWalletLinkProvider = () => {
  const APP_NAME = 'Happy Planet Club'
  const APP_LOGO_URL = 'https://happyplanetclub.io/logo.png'
  const ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/${
    import.meta.env.VITE_INFURA_PROJECT_ID
  }`
  const CHAIN_ID = 1

  const walletLink = new WalletLink({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
    overrideIsMetaMask: false,
  })

  ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)
}
