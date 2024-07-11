const { ethers } = require("ethers");

const network = {
  name: "ganache",
  chainId: 1337,
};

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545", network);

const abi = ["function helloWorld() public pure returns (string memory)"];

const contract = new ethers.Contract(
  "0xabf4aE6159D6AF92B0eA1046be714128b2447777",
  abi,
  provider
);
let balance;
(async function () {
  balance = await contract.symbol();
  console.log(balance);
})();
