const HappyPlanetClub = artifacts.require('HappyPlanetClub')

module.exports = function (deployer) {
  deployer.deploy(
    HappyPlanetClub,
    'ipfs://QmNsrJTrRrzfcMrRanR2R4LYRK8yZLhHcKWDnhcfSj5Lce/'
  )
}
