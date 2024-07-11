// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract eGovDAO {
    enum ProposalStatus { UnderReview, OpenForBidding, Completed }
    
    struct Proposal {
        uint id;
        string title;
        string description;
        string imageId;
        uint voteCount;
        uint bidCount;
        uint maxBids;
        ProposalStatus status;
        address proposer;
        uint remainingPayment; 
        bool paymentMade; 
    }

    struct Bid {
        uint id;
        uint proposalId;
        address bidder;
        uint amount;
        string details;
        bool accepted;
    }

    struct User {
        bool registered;
        bool isGovernment;
    }

    mapping(uint => Proposal) public proposals;
    mapping(uint => Bid[]) public bids;
    mapping(address => mapping(uint => bool)) public votes; 
    mapping(address => User) public users; 

    uint public proposalCount;
    uint public bidCount;

    address public owner;

    event ProposalCreated(uint proposalId, string title, string description, string imageId, uint maxBids);
    event ProposalVoted(uint proposalId, address voter);
    event BidSubmitted(uint proposalId, uint bidId, address bidder, uint amount, string details);
    event BidAccepted(uint proposalId, uint bidId, address bidder, uint amount, uint initialPayment);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].registered, "Only registered users can call this function");
        _;
    }

    modifier proposalExists(uint _proposalId) {
        require(proposals[_proposalId].id == _proposalId, "Proposal does not exist");
        _;
    }

    modifier onlyActiveProposal(uint _proposalId) {
        require(proposals[_proposalId].status == ProposalStatus.OpenForBidding, "Proposal is not open for bidding");
        _;
    }

    constructor() {
        owner = msg.sender;
            users[msg.sender] = User(true, true);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }

    function registerUser(address _user, bool _isGovernment) public onlyOwner {
        users[_user] = User(true, _isGovernment);
    }


    function createProposal(string memory _title, string memory _description, string memory _imageId, uint _maxBids) public onlyOwner {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _title, _description, _imageId, 0, 0, _maxBids, ProposalStatus.UnderReview, msg.sender, 0, false);
        emit ProposalCreated(proposalCount, _title, _description, _imageId, _maxBids);
    }

    function openProposalForBidding(uint _proposalId) public onlyOwner proposalExists(_proposalId) {
        proposals[_proposalId].status = ProposalStatus.OpenForBidding;
    }

    function voteOnProposal(uint _proposalId) public onlyRegisteredUser proposalExists(_proposalId) {
        require(!votes[msg.sender][_proposalId], "You have already voted on this proposal");

        proposals[_proposalId].voteCount++;
        votes[msg.sender][_proposalId] = true;
        emit ProposalVoted(_proposalId, msg.sender);
    }

    function submitBid(uint _proposalId, uint _amount, string memory _details) public onlyRegisteredUser proposalExists(_proposalId) onlyActiveProposal(_proposalId) {
        require(proposals[_proposalId].bidCount < proposals[_proposalId].maxBids, "Maximum number of bids reached for this proposal");

        bidCount++;
        bids[_proposalId].push(Bid(bidCount, _proposalId, msg.sender, _amount, _details, false));
        proposals[_proposalId].bidCount++;
        emit BidSubmitted(_proposalId, bidCount, msg.sender, _amount, _details);
    }

    function acceptBid(uint _proposalId, uint _bidId) public onlyOwner proposalExists(_proposalId) {
        Bid[] storage proposalBids = bids[_proposalId];
        for (uint i = 0; i < proposalBids.length; i++) {
            if (proposalBids[i].id == _bidId && !proposalBids[i].accepted) {
                proposalBids[i].accepted = true;
                emit BidAccepted(_proposalId, _bidId, proposalBids[i].bidder, proposalBids[i].amount, 0);

                uint initialPayment = proposalBids[i].amount / 2;
                payable(proposalBids[i].bidder).transfer(initialPayment);
                proposals[_proposalId].remainingPayment = proposalBids[i].amount - initialPayment;
                proposals[_proposalId].paymentMade = true;

                break;
            }
        }
    }
    
    function helloWorld() public pure returns (string memory) {
        return "hello, world";
    }
    
    function requestSecondPayment(uint _proposalId) public onlyOwner proposalExists(_proposalId) {
        require(proposals[_proposalId].paymentMade, "Initial payment has not been made");

        uint remainingPayment = proposals[_proposalId].remainingPayment;
        payable(proposals[_proposalId].proposer).transfer(remainingPayment);
        proposals[_proposalId].remainingPayment = 0;
        proposals[_proposalId].paymentMade = false;
    }

    function closeProposal(uint _proposalId) public onlyOwner proposalExists(_proposalId) {
        proposals[_proposalId].status = ProposalStatus.Completed;
    }

    function getProposal(uint _proposalId) public view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        Proposal[] memory allProposals = new Proposal[](proposalCount);
        for (uint i = 1; i <= proposalCount; i++) {
            allProposals[i - 1] = proposals[i];
        }
        return allProposals;
    }

    function getBids(uint _proposalId) public view returns (Bid[] memory) {
        return bids[_proposalId];
    }
}
