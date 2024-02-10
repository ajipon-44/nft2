"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { memberNFTAddress, tokenBankAddress } from "../../../contract";
import MemberNFT from "../../contracts/MemberNFT.json";
import TokenBank from "../../contracts/TokenBank.json";

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
      }
    } catch (e) {
      console.log(e);
    }
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
