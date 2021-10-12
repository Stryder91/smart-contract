var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");

module.exports = function(deployer) {

  let addr = await web3.eth.getAccounts();

  deployer.deploy(MyToken, 1000000);
  // rate (1 wei = 1 token), address of owner, address of contract
  deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);

  let instance = await MyToken.deployed();
  instance.transfer(MyTokenSale.address, 1000000);
};
