import type Web3 from 'web3/dist/web3.min'
import { ethereum } from '@/ethereum'
import { Contract } from 'web3-eth-contract'

export let web3: Web3, contract: Contract

export const initWeb3 = async (address: string = '') => {
  const { default: Web3 } = await import('web3/dist/web3.min')
  web3 = new Web3(ethereum!)
}
