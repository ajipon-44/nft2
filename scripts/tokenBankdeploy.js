const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async () => {
  const addr1 = "0x29361f35BCC1D15e51c10fd2250fBcD3B56c79D9";
  const addr2 = "0xc08A9487FF2C207aF7A45F0C68Dd87D6191Ab6F3";
  const addr3 = "0x0e66600b15981E27134D99e9b42119b9394dA919";
  const addr4 = "0x228eCcb9b9e3c838a5De7cA6A1F92AE1E7aE27bf";

  // デプロイ
  const TokenBank = await ethers.getContractFactory("TokenBank");
  const tokenBank = await TokenBank.deploy(
    "TokenBank",
    "TBK",
    memberNFTAddress
  );
  await tokenBank.deployed();
  console.log(
    `Contract deployed to: https://sepolia.etherscan.io/address/${tokenBank.address}`
  );

  // トークンを移転する
  let tx = await tokenBank.transfer(addr2, 300);
  await tx.wait();
  console.log("transferred to addr2");
  tx = await tokenBank.transfer(addr3, 200);
  await tx.wait();
  console.log("transferred to addr3");
  tx = await tokenBank.transfer(addr4, 100);
  await tx.wait();
  console.log("transferred to addr4");

  // Verifyで読み込むargument.jsを生成
  fs.writeFileSync(
    "./argument.js",
    `module.exports = ["TokenBank", "TBK", "${memberNFTAddress}"]`
  );

  // フロントエンドアプリが読みこむcontract.jsを生成
  fs.writeFileSync(
    "./contract.js",
    `export const memberNFTAddress = "${memberNFTAddress}
		 export const tokenBankAddress = "${tokenBank.Address}`
  );
};

const tokenBankDeploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

tokenBankDeploy();
