var EthereumVoting = artifacts.require("./EthereumVoting.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumVoting);
};