const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MemberNFTコントラクト", function () {
  it("トークンの名前とシンボルがセットされるべき", async function () {
    const name = "MemberNFT";
    const symbol = "MEM";
    const MemberNFT = await ethers.getContractFactory("MemberNFT"); // MemberNFTコントラクトの抽象化
    const memberNFT = await MemberNFT.deploy(); // 抽象化されたMemberNFTをデプロイしてオブジェクト化
    await memberNFT.deployed(); // デプロイ完了を待つ

    expect(await memberNFT.name()).to.equal(name);
    expect(await memberNFT.symbol()).to.equal(symbol);
  });
  it("デプロイアドレスがownerに設定されるべき", async function () {
    const [owner] = await ethers.getSigners(); // ethersのアカウント群から最初のアカウントを取得
    const MemberNFT = await ethers.getContractFactory("MemberNFT"); // MemberNFTコントラクトの抽象化
    const memberNFT = await MemberNFT.deploy(); // 抽象化されたMemberNFTをデプロイしてオブジェクト化
    await memberNFT.deployed(); // デプロイ完了を待つ

    expect(await memberNFT.owner()).to.equal(owner.address); // owner.addressでSignerWithAddressオブジェクトからアドレスを取得
  });
});
