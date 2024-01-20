const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenBankコントラクト", function () {
  let TokenBank;
  let tokenBank;
  const name = "Token";
  const symbol = "TBK";
  let owner;
  let addr1;
  let addr2;
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners(); // ethersのアカウント群から最初のアカウントを取得
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

  describe("アドレス間トランザクション", function () {
    beforeEach(async function () {
      await tokenBank.transfer(addr1.address, 500);
    });

    it("Token移転がされるべき", async function () {
      const startAddr1Balance = await tokenBank.balanceOf(addr1.address);
      const startAddr2Balance = await tokenBank.balanceOf(addr2.address);

      // 任意のアドレスを指定してコントラクトを実行したい場合はconnectして，アカウント情報を引数に渡す
      await tokenBank.connect(addr1).transfer(addr2.address, 100);

      const endAddr1Balance = await tokenBank.balanceOf(addr1.address);
      const endAddr2Balance = await tokenBank.balanceOf(addr2.address);

      // .subで引き算する, addで足し算する
      expect(endAddr1Balance).to.equal(startAddr1Balance.sub(100));
      expect(endAddr2Balance).to.equal(startAddr2Balance.add(100));
    });
    // エラーはPromiseオブジェクトから取得する
    it("ゼロアドレス宛の移転は失敗すべき", async function () {
      await expect(tokenBank.transfer(zeroAddress, 100)).to.be.revertedWith(
        "Zero address cannot be specified for 'to'!"
      );
    });
    it("残高不足の場合は移転に失敗すべき", async function () {
      await expect(
        tokenBank.connect(addr1).transfer(addr2.address, 510)
      ).to.be.revertedWith("Insufficient balance!");
    });
    // イベントはPromiseオブジェクトから取得する
    it("移転後には'TokenTransfer'イベントが発行されるべき", async function () {
      await expect(tokenBank.connect(addr1).transfer(addr2.address, 100))
        .to.emit(tokenBank, "TokenTransfer")
        .withArgs(addr1.address, addr2.address, 100);
    });
  });
});
