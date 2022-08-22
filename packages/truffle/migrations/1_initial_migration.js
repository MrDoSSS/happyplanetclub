const HappyPlanetClub = artifacts.require('HappyPlanetClub')

module.exports = function (deployer) {
  deployer.deploy(
    HappyPlanetClub,
    'ipfs://QmPFEdWsqYoW9UnufV61RNMnXD9fSY8vv6HgAndGt4WyFf/'
  )
}
