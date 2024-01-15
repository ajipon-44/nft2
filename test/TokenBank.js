const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenBankコントラクト", function () {
  let TokenBank;
  let tokenBank;
  const name = "Token";
  const symbol = "TBK";
  let owner;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners(); // ethersのアカウント群から最初のアカウントを取得
    TokenBank = await ethers.getContractFactory("TokenBank"); // MemberNFTコントラクトの抽象化
    tokenBank = await TokenBank.deploy(name, symbol); // 抽象化されたMemberNFTをデプロイしてオブジェクト化
    await tokenBank.deployed(); // デプロイ完了を待つ
  });

  describe("デプロイ", function () {
    it("トークンの名前とシンボルがセットされるべき", async function () {
      expect(await tokenBank.name()).to.equal(name);
      expect(await tokenBank.symbol()).to.equal(symbol);
    });
    it("デプロイアドレスがownerに設定されるべき", async function () {
      expect(await tokenBank.owner()).to.equal(owner.address);
    });
    it("ownerに総額が割り当てられるべき", async function () {
      const ownerBalance = await tokenBank.balanceOf(owner.address);
      expect(await tokenBank.totalSupply()).to.equal(ownerBalance);
    });
  });
});
