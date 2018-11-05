// const Wrestling = artifacts.require("./Wrestling.sol")
const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const Token = artifacts.require("./ERCToken.sol")

module.exports = function(deployer) {
  // deployer.deploy(Wrestling);
  deployer.deploy(SimpleStorage);
  deployer.deploy(Token);
};