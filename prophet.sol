// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Prophet is ERC721{
    
    enum DealStatus { Active, Closed, Sold, Complete }

    struct Score {
        uint score;
        uint reviewNum;
    }

    struct Bid {
        address payable bidder;
        uint bid;
        string pk;
    }

    struct Deal {
        address payable seller;
        uint256 highestBid;
        address payable highestBidder;
        string highestBiddersPK;
        DealStatus status;
        string hash;
        string dscHash;
        string cid;
        uint256 endBlock;
        uint payWindow;
        Bid[] pendingBids;
        uint startPrice;
        uint dealIndex;
    }

    mapping(uint => Deal) public deals;
    mapping(address => Score) public scores;
    mapping(string => uint) public dealIdByHash;
    uint public dealIndex;
    address payable public owner;
    uint balance;

    constructor() ERC721("Information", "INFO"){
        owner = payable(msg.sender);
        dealIndex = 0;
        balance = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    modifier dealIsActive(uint dealId) {
        require(deals[dealId].status == DealStatus.Active, "Deal is not active");
        _;
    }
    modifier dealIsClosed(uint dealId) {
        require(deals[dealId].status == DealStatus.Closed, "Deal is not closed yet");
        _;
    }
    modifier dealIsSold(uint dealId) {
        require(deals[dealId].status == DealStatus.Sold, "Deal is not sold yet");
        _;
    }
    modifier bidderIsHighest(uint dealId) {
        require(msg.sender == deals[dealId].highestBidder, "Only the highest bidder can perform this action");
        _;
    }

    function createDeal(string memory _hash, string memory _dscHash, uint _startPrice) public returns(uint) {
        deals[dealIndex].seller = payable(msg.sender);
        deals[dealIndex].hash = _hash;
        deals[dealIndex].dscHash = _dscHash;
        deals[dealIndex].highestBidder = payable(msg.sender);
        deals[dealIndex].highestBid = _startPrice;
        deals[dealIndex].status = DealStatus.Active;
        //deals[dealIndex].endBlock = block.number + 5760; // About 24 hours in blocks
        //deals[dealIndex].payWindow = 10;
        deals[dealIndex].dealIndex = dealIndex;
        dealIdByHash[_hash] = dealIndex;
        _mint(msg.sender, dealIndex);
        _transfer(msg.sender, address(this), dealIndex);
        dealIndex++;
        return dealIndex-1;
    }

    function bid(uint dealId, uint bidAmount, string memory _pk) public payable dealIsActive(dealId) {
        require(bidAmount > deals[dealId].highestBid, "There already is a higher bid");
        require(msg.value >= 0.0015 ether, "Must send at least 0.0015 ether as deposit");

        balance += msg.value;

        // Store the old highest bid in pendingBids
        // if (deals[dealId].highestBid != 0) {
        //     deals[dealId].pendingBids.push(Bid(deals[dealId].highestBidder, deals[dealId].highestBid, deals[dealId].highestBiddersPK));
        // }

        // Set the new highest bid
        deals[dealId].highestBid = bidAmount;
        deals[dealId].highestBiddersPK = _pk;
        deals[dealId].highestBidder = payable(msg.sender);
    }

    function closeBidding(uint dealId) public dealIsActive(dealId) {
        //require(block.number > deals[dealId].endBlock, "Bidding time has not ended yet");
        require(msg.sender == deals[dealId].seller, "Only the seller can close deal");
        deals[dealId].status = DealStatus.Closed;
    }

    function confirmPayment(uint dealId) public payable dealIsClosed(dealId) bidderIsHighest(dealId) {
        require(msg.value >= deals[dealId].highestBid, "Must pay the full bid amount");
        deals[dealId].status = DealStatus.Sold;
    }

    function submitCID(uint dealId, string memory cid) public dealIsSold(dealId) {
        require(msg.sender == deals[dealId].seller, "Only the seller can submit the CID");

        deals[dealId].cid = cid;
        _transfer(address(this), msg.sender, dealId);
        deals[dealId].status = DealStatus.Complete;
        deals[dealId].seller.transfer(deals[dealId].highestBid);
    }

    function defaultOnPayment(uint dealId) public dealIsClosed(dealId) bidderIsHighest(dealId) {
        require(block.number > deals[dealId].endBlock + deals[dealId].payWindow, "Pay Window still open");
        deals[dealId].payWindow += 10;
        Bid memory newBestBid = deals[dealId].pendingBids[deals[dealId].pendingBids.length-1];

        deals[dealId].highestBid = newBestBid.bid;
        deals[dealId].highestBidder = newBestBid.bidder;
        deals[dealId].highestBiddersPK = newBestBid.pk;
        deals[dealId].pendingBids.pop();
    }

    function unlockInformation(uint256 dealId) public {
        require(deals[dealId].seller == msg.sender, "Only the owner can unlock info");

        super._burn(dealId);
    }

    function addReview(address _addr, uint _score) public payable {
        require(msg.value >= 0.0015 ether, "Must send at least 0.0015 ether as deposit");
        balance += msg.value;

        if(scores[_addr].reviewNum == 0)
            scores[_addr] = Score(0, 0);
        Score memory user = scores[_addr];
        user.score = (user.score * user.reviewNum + _score) / (user.reviewNum+1);
        user.reviewNum++;
        scores[_addr] = user;
    }

    function getPendingBid(uint dealId, uint bidIndex) public view returns (address, uint, string memory) {
        return (deals[dealId].pendingBids[bidIndex].bidder, deals[dealId].pendingBids[bidIndex].bid, deals[dealId].pendingBids[bidIndex].pk);
    }

    function getDealsLenght() public view returns (uint){
        uint length = 0;
        for (uint i = 0; i < dealIndex; i++) {
            if (deals[i].seller != address(0)) {
                length++;
            }
        }
        return length;
    }

    function collectFunds() public onlyOwner {
        require(balance > 0, "No funds to collect");
        owner.transfer(balance);
        balance = 0;
    }
}

