"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { memberNFTAddress, tokenBankAddress } from "../../../contract";
import MemberNFT from "../../contracts/MemberNFT.json";
import TokenBank from "../../contracts/TokenBank.json";
import type { ExternalProvider } from "@ethersproject/providers";

export default function Home() {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState(false);
  const [tokenBalance, setTokenBalance] = useState("");
  const [bankBalance, setBankBalance] = useState("");
  const [bankTotalDeposit, setBankTotalDeposit] = useState("");
  const [nftOwner, setNftOwner] = useState(false);
  const [inputData, setInputData] = useState({
    transferAddress: "",
    transferAmount: "",
    depositAmount: "",
    withdrawAmount: "",
  });
  const [items, setItems] = useState([]);
  // const goerliId = "0x5";
  const sepoliaId = "0xaa36a7";
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const checkMetaMaskInstalled = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install MetaMask!");
    }
  };

  const checkChainId = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const chain = await ethereum.request({ method: "eth_chainId" });
      console.log(`chain: ${chain}`);

      if (chain != sepoliaId) {
        alert("Please connect Sepolia Network");
        setChainId(false);
        return;
      } else {
        setChainId(true);
      }
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = (await ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];
        console.log(`account: ${accounts[0]}`);
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(
          ethereum as unknown as ExternalProvider
        );
        const signer = provider.getSigner();
        const tokenBankContract = new ethers.Contract(
          tokenBankAddress,
          TokenBank.abi,
          signer
        );
        const tBalance = await tokenBankContract.balanceOf(accounts[0]);
        console.log(`tBalance: ${tBalance}`);
        setTokenBalance(tBalance.toNumber());

        const bBalance = await tokenBankContract.bankBalanceOf(accounts[0]);
        console.log(`tBalance: ${bBalance}`);
        setBankBalance(bBalance.toNumber());

        const totalDeposit = await tokenBankContract.bankTotalDeposit();
        console.log(`totalDeposit: ${totalDeposit}`);
        setBankTotalDeposit(totalDeposit.toNumber());

        ethereum.on("accountsChanged", checkAccountChanged);
        ethereum.on("chainChanged", checkChainId);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkAccountChanged = () => {
    setAccount("");
    setNftOwner(false);
    setItems([]);
    setTokenBalance("");
    setBankBalance("");
    setBankTotalDeposit("");
    setInputData({
      transferAddress: "",
      transferAmount: "",
      depositAmount: "",
      withdrawAmount: "",
    });
  };

  useEffect(() => {
    checkMetaMaskInstalled();
    checkChainId();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-slate-100 text-blue-900 min-h-screen">
        <title>Token Dapp</title>
        <h2 className="text-6xl font-bold my-12 mt-8">
          Welcome to Token Community
        </h2>
        <div className="mt-8 mb-16 hover:rotate-180 hover:scale-105 transition duration-700 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            height="160"
            viewBox="0 0 350 350"
          >
            <polygon
              points="0 0, 175 0, 175 175, 0 175"
              stroke="black"
              fill="#0000ff"
            />
            <polygon
              points="0 175, 175 175, 175 350, 0 350"
              stroke="black"
              fill="#ffc0cb"
            />
            <polygon
              points="175 0, 350 0, 350 175, 175 175"
              stroke="black"
              fill="#90EE90"
            />
            <polygon
              points="175 175, 350 175, 350 350, 175 350"
              stroke="black"
              fill="#ffff00"
            />
          </svg>
        </div>
        <div className="flex mt-1">
          {account === "" ? (
            <button
              className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded hover:border-transparent hover:text-white hover:bg-blue-500 hover:cursor-pointer"
              onClick={connectWallet}
            >
              Connect to MetaMask
            </button>
          ) : chainId ? (
            <div>
              <div className="px-2 py-2 bg-transparent">
                <span className="flex flex-col items-left font-semibold">
                  総預かり残高：{bankTotalDeposit}
                </span>
              </div>
              <div className="px-2 py-2 mb-2 bg-white border border-gray-400">
                <span className="flex flex-col items-left font-semibold">
                  アドレス：{account}
                </span>
                <span className="flex flex-col items-left font-semibold">
                  所持残高：{tokenBalance}
                </span>
                <span className="flex flex-col items-left font-semibold">
                  預入残高：{bankBalance}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
              <div>Please connect Sepolia Network</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
