pragma solidity >=0.4.21;

contract Election {
    //Candidate Model
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;

    uint public candidatesCount;

    //Constructor
    constructor() public{
        addCandidate("Leo Varadkar");
        addCandidate("Michael Collins");
    }

    function addCandidate (string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}