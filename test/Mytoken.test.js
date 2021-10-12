const Token = artifacts.require("MyToken");

const chai = require("chai");
// web3 automatically injected
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN); 
chai.use(chaiBN);

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
	
	const [deployerAccount, recipient, anotherAccount] = accounts;

	// Hook qui run avant chaque test
	beforeEach(async () => {
		this.myToken = await Token.new(1000000);
	})

	it("all tokens should be in my account", async () => {
		let instance = this.myToken;
		let totalSupply = await instance.totalSupply();
		// let balance = await instance.balanceOf(accounts[0]);
		// assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
		expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);
	
		// en version chai-as-promised, donc asynchrone
		expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
	});

	it("is possible to send tokens between accounts", async () => {
		const sendTokens = 1;
		let instance = this.myToken;
		let totalSupply = await instance.totalSupply();

		expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
		expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
		expect(instance.balanceOf(deployerAccount)).to.be.eventually.a.bignumber.equal(totalSupply - sendTokens);
		expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
	});
});