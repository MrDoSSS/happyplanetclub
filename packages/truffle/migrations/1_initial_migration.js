const HappyPlanetClub = artifacts.require('HappyPlanetClub')

module.exports = function (deployer) {
  deployer.deploy(HappyPlanetClub, '')
}