import React, { createContext, useContext, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const EthereumContext = createContext<any>(null);

const contractAddress = "0xb3CFE8EAa2AE4Edd848f2Fa57318141906a5b9b9";

const ContractABi = [
  "constructor()",
  "function transferOwnership(address newOwner)",
  "function registerUser(address _user, bool _isGovernment)",
  "function createProposal(string _title, string _description, string _imageId, uint _maxBids)",
  "function openProposalForBidding(uint _proposalId)",
  "function voteOnProposal(uint _proposalId)",
  "function submitBid(uint _proposalId, uint _amount, string _details)",
  "function acceptBid(uint _proposalId, uint _bidId)",
  "function requestSecondPayment(uint _proposalId)",
  "function closeProposal(uint _proposalId)",
  "function getProposal(uint _proposalId) view returns (uint, string, string, string, uint, uint, uint, uint, address, uint, bool)",
  "function helloWorld() public pure returns (string memory)",
  "function getAllProposals() view returns ((uint, string, string, string, uint, uint, uint, uint, address, uint, bool)[])",
  "function getBids(uint _proposalId) view returns ((uint, uint, address, uint, string, bool)[])",
];

export const EthereumProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [address, setAddress] = useState<string>();
  const [contractInstance, setContractInstance] = useState<any>();
  console.log(address);
  const addressInit = async () => {
    try {
      const web3Modal = new Web3Modal();
      const ethProvider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(ethProvider);
      setProvider(ethProvider);

      const signer = ethersProvider.getSigner();
      setSigner(signer);

      const accounts = await ethersProvider.listAccounts();
      setAddress(accounts[0]);

      const contract = new ethers.Contract(
        contractAddress,
        ContractABi,
        signer
      );
      console.log(contract);
      setContractInstance(contract);

      ethProvider.on("accountsChanged", async (newAccounts: string[]) => {
        setAddress(newAccounts[0]);
      });
    } catch (error) {
      console.error("Failed to initialize Ethereum provider:", error);
    }
  };

  const createProposal = async (
    title: string,
    description: string,
    imageId: string,
    maxBids: number
  ) => {
    try {
      if (!signer) throw new Error("Signer not initialized");
      console.log(signer);
      const tx = await contractInstance.createProposal(
        title,
        description,
        imageId,
        maxBids
      );
      await tx?.wait();
    } catch (err) {
      console.error(err);
    }
  };

  const voteOnProposal = async (proposalId: number) => {
    try {
      if (!signer) throw new Error("Signer not initialized");
      const tx = await contractInstance
        ?.connect(signer)
        .voteOnProposal(proposalId);
      await tx?.wait();
    } catch (err) {
      console.error(err);
    }
  };

  const submitBid = async (
    proposalId: number,
    amount: number,
    details: string
  ) => {
    try {
      if (!signer) throw new Error("Signer not initialized");
      const tx = await contractInstance
        ?.connect(signer)
        .submitBid(proposalId, amount, details);
      await tx?.wait();
    } catch (err) {
      console.error(err);
    }
  };

  const acceptBid = async (proposalId: number, bidId: number) => {
    try {
      if (!signer) throw new Error("Signer not initialized");
      const tx = await contractInstance
        ?.connect(signer)
        .acceptBid(proposalId, bidId);
      await tx?.wait();
    } catch (err) {
      console.error(err);
    }
  };

  const requestSecondPayment = async (proposalId: number) => {
    try {
      if (!signer) throw new Error("Signer not initialized");
      const tx = await contractInstance
        ?.connect(signer)
        .requestSecondPayment(proposalId);
      await tx?.wait();
    } catch (err) {
      console.error(err);
    }
  };

  const closeProposal = async (proposalId: number) => {
    try {
      if (!signer) throw new Error("Signer not initialized");
      const tx = await contractInstance
        ?.connect(signer)
        .closeProposal(proposalId);
      await tx?.wait();
    } catch (err) {
      console.error(err);
    }
  };

  const getProposal = async (proposalId: number) => {
    try {
      if (!contractInstance) throw new Error("Contract instance not found");
      const proposal = await contractInstance?.getProposal(proposalId);
      return proposal;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const getAllProposals = async () => {
    try {
      if (!contractInstance)
        throw new Error("Contract instance not initialized");

      const allProposals = await contractInstance.getAllProposals();
      console.log(allProposals);
    } catch (err) {
      console.error("Error fetching proposals:", err);
    }
  };

  return (
    <EthereumContext.Provider
      value={{
        provider,
        signer,
        submitBid,
        acceptBid,
        requestSecondPayment,
        getAllProposals,
        closeProposal,
        address,
        contractInstance,
        addressInit,
        createProposal,
        voteOnProposal,
        getProposal,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => useContext(EthereumContext);
