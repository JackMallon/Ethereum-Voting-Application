pragma solidity >=0.4.21;

contract EthereumVoting {
    //Election Model
    struct Election {
        uint256 id;
        string title;
        uint256 closingDate;
    }

    struct Candidate {
        uint256 id;
        uint256 electionId;
        string name;
        uint256 voteCount;
    }

    struct ElectionVote {
        uint256 id;
        uint256 candidateId;
        string electionTitle;
        string candidateName;
        string userHash;
        uint256 timestamp;
    }

    mapping(uint256 => Election) public elections;
    mapping(uint256 => Candidate) public candidates;
    mapping(string => ElectionVote) public electionVotesByHash;
    mapping(uint256 => ElectionVote) public electionVotesById;

    uint256 public electionsCount;
    uint256 public candidatesCount;
    uint256 public electionVotesCount;

    string public sender;
    bool private started;

    //Constructor
    constructor() public {
        started = false;

        addElection(
            "Student Union Vice Presidential Election 2019",
            1557466200
        );
        addCandidate(1, "Eamon De Valera");
        addCandidate(1, "Michael Collins");

        addElection("Student Union Presidential Election 2020", 1589131800);
        addCandidate(2, "Leo Varadkar");
        addCandidate(2, "Simon Coveney");
        addCandidate(2, "Bernard Durkan");

        addElection(
            "Student Union Vice Presidential Election 2020",
            1589131800
        );
        addCandidate(3, "Veo Laradkar");
        addCandidate(3, "Cimon Soveney");
        addCandidate(3, "Dernard Burkan");

        addElectionVote(3, "b8016cdd843d5ea1d718ada245458cbb");
        addElectionVote(4, "5e7a7bde190ac1a8c7ecdf15c789729c");
        addElectionVote(4, "f778ee8caee3e0bece97d7337a6e8b9e");
        addElectionVote(3, "796cbc6e9a17144581b62d3cdf562445");
        addElectionVote(3, "263492e840ac678e662da270debf07d2");

        started = true;
    }

    function initSender() public {
        if (bytes(sender).length != 0) {
            return;
        }

        sender = toString(msg.sender);
    }

    function toString(address x) private pure returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint256 i = 0; i < 20; i++)
            b[i] = bytes1(uint8(uint256(x) / (2**(8 * (19 - i)))));
        return string(b);
    }

    function addElection(string memory title, uint256 closing) public {
        if (verifySender(msg.sender) && started) {
            return;
        }
        electionsCount++;
        elections[electionsCount] = Election(electionsCount, title, closing);
    }

    function addCandidate(uint256 electID, string memory _name) public {
        if (verifySender(msg.sender) && started) {
            return;
        }
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            electID,
            _name,
            0
        );
    }

    function addElectionVote(uint256 candidateId, string memory userHash)
        public
    {
        if (verifySender(msg.sender) && started) {
            return;
        }
        if (bytes(electionVotesByHash[userHash].userHash).length != 0) {
            return;
        }
        uint256 electionTime = elections[candidates[candidateId].electionId]
            .closingDate;
        if (now > electionTime && started) {
            return;
        }
        electionVotesCount++;
        candidates[candidateId].voteCount++;
        string memory candidateName = candidates[candidateId].name;
        string memory electionTitle = elections[candidates[candidateId]
            .electionId]
            .title;
        electionVotesById[electionVotesCount] = ElectionVote(
            electionVotesCount,
            candidateId,
            electionTitle,
            candidateName,
            userHash,
            now
        );
        electionVotesByHash[userHash] = electionVotesById[electionVotesCount];
    }

    function verifySender(address x) private view returns (bool) {
        if (equal(toString(x), sender)) {
            return false;
        }
        return true;
    }

    function equal(string memory _a, string memory _b)
        private
        pure
        returns (bool)
    {
        return compare(_a, _b) == 0;
    }

    function compare(string memory _a, string memory _b)
        private
        pure
        returns (int256)
    {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint256 minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint256 i = 0; i < minLength; i++)
            if (a[i] < b[i]) return -1;
            else if (a[i] > b[i]) return 1;
        if (a.length < b.length) return -1;
        else if (a.length > b.length) return 1;
        else return 0;
    }
}
