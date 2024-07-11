const eGovDAO = artifacts.require("eGovDAO");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(eGovDAO);
  await eGovDAO.deployed();
};
