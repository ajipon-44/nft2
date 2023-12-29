const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MemberNFTコントラクト", function () {
  let MemberNFT;
  let memberNFT;
  const name = "MemberNFT";
  const symbol = "MEM";
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners(); // ethersのアカウント群から最初のアカウントを取得
    MemberNFT = await ethers.getContractFactory("MemberNFT"); // MemberNFTコントラクトの抽象化
    memberNFT = await MemberNFT.deploy(); // 抽象化されたMemberNFTをデプロイしてオブジェクト化
    await memberNFT.deployed(); // デプロイ完了を待つ
  });

  it("トークンの名前とシンボルがセットされるべき", async function () {
    expect(await memberNFT.name()).to.equal(name);
    expect(await memberNFT.symbol()).to.equal(symbol);
  });
  it("デプロイアドレスがownerに設定されるべき", async function () {
    expect(await memberNFT.owner()).to.equal(owner.address); // owner.addressでSignerWithAddressオブジェクトからアドレスを取得
  });
});
