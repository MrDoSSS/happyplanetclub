const HappyPlanetClub = artifacts.require('HappyPlanetClub')

module.exports = function (deployer) {
  deployer.deploy(
    HappyPlanetClub,
    'ipfs://QmYQoBe5prrdzVQUdxrAkhG2LaogwRsGVUmFMbNfzYDrPt/'
  )
}
