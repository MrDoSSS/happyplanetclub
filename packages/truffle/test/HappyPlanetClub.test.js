require('dotenv').config()
const HappyPlanetClub = artifacts.require('HappyPlanetClub')
const truffleAssert = require('truffle-assertions')
const bip39 = require('bip39')
const { hdkey } = require('ethereumjs-wallet')
const fs = require('fs')
const basePath = process.cwd()

const getAccounts = async (count) => {
  const buff = fs.readFileSync(`${basePath}/account-keys.json`)
  const json = JSON.parse(buff)
  const accounts = Object.entries(json.private_keys).map(([address, pk]) => ({
    address,
    pk,
  }))

  return accounts
}

contract('HappyPlanetClub', () => {
  let contract, deployer, holderOne, holderTwo

  before(async () => {
    ;[deployer, holderOne, holderTwo] = await getAccounts()
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

  describe('setPrice', () => {
    it('must be set price', async () => {
      const price = web3.utils.toWei('0.05')
      await truffleAssert.passes(contract.setPrice(price))
      assert.equal(await contract.price(), price)
    })
  })

  describe('setPresalePrice', () => {
    it('must be set presalePrice', async () => {
      const price = web3.utils.toWei('0.05')
      await truffleAssert.passes(contract.setPresalePrice(price))
      assert.equal(await contract.presalePrice(), price)
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

    beforeEach(() => contract.allowPublic())

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

    it('when everything is ok must be minted token', async () => {
      await truffleAssert.passes(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 1)
    })

    it('when everything is ok must be minted token 2', async () => {
      await truffleAssert.passes(
        contract.mint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 2)
    })

    it('when everything is ok must be minted token 3', async () => {
      await truffleAssert.passes(
        contract.mint(3, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.018'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 3)
    })

    it('when everything is ok must be minted token 1+1', async () => {
      await truffleAssert.passes(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 2)
    })

    it('when everything is ok must be minted token 1+2', async () => {
      await truffleAssert.passes(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.mint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.018'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 3)
    })

    it('when everything is ok must be minted token 2+1', async () => {
      await truffleAssert.passes(
        contract.mint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      await truffleAssert.passes(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 3)
    })

    it('when disallowPublic must be fails', async () => {
      await contract.disallowPublic()
      await truffleAssert.fails(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )
    })

    it('when token owners count > 3 must be fails', async () => {
      await truffleAssert.passes(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.mint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.018'),
        })
      )

      await truffleAssert.fails(
        contract.mint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        }),
        truffleAssert.ErrorType.REVERT,
        'Can only mint 3 tokens at address'
      )
    })

    it('when price is not corrent must be fails', async () => {
      await truffleAssert.fails(
        contract.mint(4, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.005'),
        })
      )
    })

    it('when bad sign must be fails', async () => {
      await truffleAssert.fails(
        contract.mint(1, unvalidSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )
    })
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

    it('when valid sign must be minted', async () => {
      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 1)
    })

    it('when valid sign must be minted 2', async () => {
      await truffleAssert.passes(
        contract.presaleMint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 2)
    })

    it('when valid sign must be minted 3', async () => {
      await truffleAssert.passes(
        contract.presaleMint(3, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 3)
    })

    it('when valid sign must be minted 4', async () => {
      await truffleAssert.passes(
        contract.presaleMint(4, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.018'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 4)
    })

    it('when valid sign must be minted 1+1', async () => {
      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 2)
    })

    it('when valid sign must be minted 1+2', async () => {
      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.presaleMint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 3)
    })

    it('when valid sign must be minted 1+3', async () => {
      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.presaleMint(3, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.018'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 4)
    })

    it('when valid sign must be minted 2+1', async () => {
      await truffleAssert.passes(
        contract.presaleMint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 3)
    })

    it('when valid sign must be minted 2+2', async () => {
      await truffleAssert.passes(
        contract.presaleMint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.presaleMint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.018'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 4)
    })

    it('when valid sign must be minted 3+1', async () => {
      await truffleAssert.passes(
        contract.presaleMint(3, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      assert.equal(await contract.balanceOf(holderOne.address), 4)
    })

    it('when bad sign must be fails', async () => {
      await truffleAssert.fails(
        contract.presaleMint(1, unvalidSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )
    })

    it('when token owners count > 4 must be fails', async () => {
      await truffleAssert.passes(
        contract.presaleMint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0'),
        })
      )

      await truffleAssert.passes(
        contract.presaleMint(1, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.009'),
        })
      )

      await truffleAssert.fails(
        contract.presaleMint(2, validSign, {
          from: holderOne.address,
          value: web3.utils.toWei('0.018'),
        }),
        truffleAssert.ErrorType.REVERT,
        'Can only mint 4 tokens at address'
      )
    })
  })
})
