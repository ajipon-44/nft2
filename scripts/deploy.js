const main = async () => {
  MemberNFT = await ethers.getContractFactory("MemberNFT"); // MemberNFTコントラクトの抽象化
  memberNFT = await MemberNFT.deploy(); // 抽象化されたMemberNFTをデプロイしてオブジェクト化
  await memberNFT.deployed(); // デプロイ完了を待つ

  console.log(`Contract deployed to: ${memberNFT.address}`);
};

const deploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

deploy();
