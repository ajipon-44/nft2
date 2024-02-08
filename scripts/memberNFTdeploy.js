const fs = require("fs");

const main = async () => {
  const addr1 = "0x29361f35BCC1D15e51c10fd2250fBcD3B56c79D9";
  const addr2 = "0xc08A9487FF2C207aF7A45F0C68Dd87D6191Ab6F3";
  const addr3 = "0x0e66600b15981E27134D99e9b42119b9394dA919";

  const tokenURI1 =
    "ipfs://QmYjL1KJozAXQebydEmovja6LRXCDwjSwf81k3wLL1HDQi?filename=metadata1.json";
  const tokenURI2 =
    "ipfs://QmUJughzwfQJTHBLjznwmBkKKKYPbfb3ujKRfdeE7hCrdN?filename=metadata2.json";
  const tokenURI3 =
    "ipfs://QmPaPUzb4TRRS4sJ2WL64knDbMT7fUHe1LhUA4amFtt91g?filename=metadata3.json";
  const tokenURI4 =
    "ipfs://QmamfLvEmyX5rbvUiN5CPDsAjSDQu37pW1D6dQkDngAM7E?filename=metadata4.json";
  const tokenURI5 =
    "ipfs://QmbfwhVKpaT8Y1LCG3SrP7KRWQBywQkzQyj3NHySauN6PN?filename=metadata5.json";

  // デプロイ
  const MemberNFT = await ethers.getContractFactory("MemberNFT"); // MemberNFTコントラクトの抽象化
  const memberNFT = await MemberNFT.deploy(); // 抽象化されたMemberNFTをデプロイしてオブジェクト化
  await memberNFT.deployed(); // デプロイ完了を待つ

  console.log(
    `Contract deployed to: https://sepolia.etherscan.io/address/${memberNFT.address}`
  );

  // NFTをmintする
  let tx = await memberNFT.nftMint(addr1, tokenURI1);
  await tx.wait(); // トランザクション完了を待つ
  console.log("NFT#1 minted...");

  tx = await memberNFT.nftMint(addr1, tokenURI2);
  await tx.wait(); // トランザクション完了を待つ
  console.log("NFT#2 minted...");

  tx = await memberNFT.nftMint(addr2, tokenURI3);
  await tx.wait(); // トランザクション完了を待つ
  console.log("NFT#3 minted...");

  tx = await memberNFT.nftMint(addr2, tokenURI4);
  await tx.wait(); // トランザクション完了を待つ
  console.log("NFT#4 minted...");

  // コントラクトアドレスの書き出し
  fs.writeFileSync(
    "./memberNFTContract.js",
    `module.exports = "${memberNFT.address}"`
  );
};

const memberNFTDeploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

memberNFTDeploy();
