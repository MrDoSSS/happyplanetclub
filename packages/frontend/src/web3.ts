import type Web3 from 'web3/dist/web3.min'
import { ethereum } from '@/ethereum'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { abi } from '../../truffle/build/contracts/HappyPlanetClub.json'

export let web3: Web3, contract: Contract

export const initWeb3 = async (address: string) => {
  const { default: Web3 } = await import('web3/dist/web3.min')
  web3 = new Web3(ethereum!)
  contract = new web3.eth.Contract(
    abi as unknown as AbiItem,
    import.meta.env.VITE_CONTRACT_ADDRESS,
    {
      from: address,
    }
  )
}
