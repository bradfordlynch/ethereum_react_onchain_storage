pragma solidity ^0.4.11;

contract ERCToken {
    /*
     *  Data structures
     */
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 value);
    event Approval(address indexed _owner, address indexed _spender, uint256 value);

    // Constructor
    constructor() public {
        totalSupply = 10000;
        balances[msg.sender] = totalSupply;
    }

    /*
     *  Read and write storage functions
     */
    /// @dev Transfers sender's tokens to a given address. Returns success.
    /// @param _to Address of token receiver.
    /// @param _value Number of tokens to transfer.
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value, "Balance too low");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /// @dev Allows allowed third party to transfer tokens from one address to another. Returns success.
    /// @param _from Address from where tokens are withdrawn.
    /// @param _to Address to where tokens are sent.
    /// @param _value Number of tokens to transfer.
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(allowed[_from][_to] <= _value, "Value exceeds the allowance");
        require(balances[_from] >= _value, "Balance too low");
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;

    }

    /// @dev Returns number of tokens owned by given address.
    /// @param _owner Address of token owner.
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    /// @dev Sets approved amount of tokens for spender. Returns success.
    /// @param _spender Address of allowed account.
    /// @param _value Number of approved tokens.
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /// @dev Returns number of allowed tokens for given address.
    /// @param _owner Address of token owner.
    /// @param _spender Address of token spender.
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

}
