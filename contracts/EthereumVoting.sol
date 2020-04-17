pragma solidity >=0.4.21;

contract EthereumVoting {
    //Election Model
    struct Election {
        uint id;
        string title;
    }

    struct Candidate {
        uint id;
        uint electionId;
        string name;
        uint voteCount;
    }

    struct Referendum {
        uint id;
        string title;
    }

    struct ReferendumOption {
        uint id;
        uint referendumId;
        string name;
        uint voteCount;
    }

    mapping(uint => Election) public elections;
    mapping(uint => Candidate) public candidates;
    mapping(uint => Referendum) public referendums;
    mapping(uint => ReferendumOption) public referendumOptions;

    uint public electionsCount;
    uint public candidatesCount;
    uint public referendumsCount;
    uint public refOptionsCount;

    //Constructor
    constructor() public{
        addElection("Student Union Presidential Election 2020");
        addCandidate("Leo Varadkar");
        addCandidate("Simon Coveney");
        addCandidate("Bernard Durkan");
    }

    function addElection (string memory _title) private {
        electionsCount++;
        elections[electionsCount] = Election(electionsCount, _title);
    }

    function addCandidate (string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, electionsCount, _name, 0);
    }
}