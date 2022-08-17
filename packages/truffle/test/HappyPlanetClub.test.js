require('dotenv').config()
const HappyPlanetClub = artifacts.require('HappyPlanetClub')
const truffleAssert = require('truffle-assertions')
const bip39 = require('bip39')
const { hdkey } = require('ethereumjs-wallet')

const getAccounts = async (count) => {
  const seed = await bip39.mnemonicToSeed(process.env.MNEMONIC)
  const hdk = hdkey.fromMasterSeed(seed)
  const accounts = []

  for (let i = 0; i < count; i++) {
    const addressNode = hdk.derivePath(`m/44'/60'/0'/0/${i}`)
    const address = addressNode.getWallet().getAddressString()
    const pk = addressNode.getWallet().getPrivateKeyString()

    accounts.push({
      address,
      pk,
    })
  }

  return accounts
}

contract('HappyPlanetClub', () => {
  let contract, deployer, holderOne, holderTwo

  before(async () => {
    ;[deployer, holderOne, holderTwo] = await getAccounts(3)
  })

  beforeEach(async () => (contract = await HappyPlanetClub.new('')))

  describe('Presalable', () => {
    it('must be default presale', async () => {
      const res = await contract.presaled()
      assert.equal(res, true)
    })

    describe('presale', () => {
      describe('when not presaled', () => {
        beforeEach(() => {
          return contract.unpresale()
        })

        it('must be set presale as true', async () => {
          await truffleAssert.passes(contract.presale())
          const res = await contract.presaled()
          assert.equal(res, true)
        })
      })

      describe('when presaled', () => {
        it('must be fails', async () => {
          await truffleAssert.fails(contract.presale())
        })
      })
    })

    describe('unpresale', () => {
      describe('when not presaled', () => {
        beforeEach(() => {
          return contract.unpresale()
        })

        it('must be fails', async () => {
          await truffleAssert.fails(contract.unpresale())
        })
      })

      describe('when presaled', () => {
        it('must be set presale as false', async () => {
          await truffleAssert.passes(contract.unpresale())
          const res = await contract.presaled()
          assert.equal(res, false)
        })
      })
    })
  })

  describe('Pausable', () => {
    describe('pause', () => {
      describe('when not paused', () => {
        it('must be set presale as true', async () => {
          await truffleAssert.passes(contract.pause())
          const res = await contract.paused()
          assert.equal(res, true)
        })
      })

      describe('when paused', () => {
        beforeEach(() => contract.pause())

        it('must be fails', async () => {
          await truffleAssert.fails(contract.pause())
        })
      })
    })

    describe('unpause', () => {
      describe('when not paused', () => {
        it('must be fails', async () => {
          await truffleAssert.fails(contract.unpause())
        })
      })

      describe('when paused', () => {
        beforeEach(() => {
          return contract.pause()
        })

        it('must be set presale as false', async () => {
          await truffleAssert.passes(contract.unpause())
          const res = await contract.paused()
          assert.equal(res, false)
        })
      })
    })
  })

  describe('setBaseURI', () => {
    it('must be set baseTokenURI', async () => {
      const baseURI = 'baseURI'
      await truffleAssert.passes(contract.setBaseURI(baseURI))
      assert.equal(await contract.baseTokenURI(), baseURI)
    })
  })

  describe('mint', () => {
    let validSign, unvalidSign

    beforeEach(() => contract.unpresale())

    before(async () => {
      validSign = (
        await web3.eth.accounts.sign(
          web3.utils.keccak256(holderOne.address),
          deployer.pk
        )
      ).signature

      unvalidSign = (
        await web3.eth.accounts.sign(
          web3.utils.keccak256(holderOne.address),
          holderOne.pk,
          ''
        )
      ).signature
    })

    it('when everything is ok must be minted token', async () => {})
  })

  describe('presaleMint', () => {
    let validSign, unvalidSign

    before(async () => {
      validSign = (
        await web3.eth.accounts.sign(
          web3.utils.keccak256(holderOne.address),
          deployer.pk
        )
      ).signature

      unvalidSign = (
        await web3.eth.accounts.sign(
          web3.utils.keccak256(holderOne.address),
          holderOne.pk,
          ''
        )
      ).signature
    })

    it('when valid sign must be minted', async () => {})
  })

  describe('airdrop', () => {
    it('must be minted', async () => {
      await contract.airdrop(holderOne.address, 1)
    })
  })
})
