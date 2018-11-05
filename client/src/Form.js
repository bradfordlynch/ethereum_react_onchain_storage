import React, { Component } from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      contract_value: '',
      contract: this.props.contract,
      accounts: this.props.accounts
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    // Get the value from the contract to prove it worked.
    const response = await this.state.contract.get();

    // Update state with the result.
    this.setState({ contract_value: response.toNumber() });
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit = async (event) => {
    // Store the submitted value.
    await this.props.setter(this.state.value)
    this.setState({contract_value: this.state.value})
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label>Current Value:</label>
          <input class="form-control" readonly type="text" value={this.state.contract_value} />
        </div>
        <div class="form-group">
          <label>Account</label>
          <input class="form-control" readonly type="text" value={this.state.accounts[0]} />
        </div>
        <div class="form-group">
          <label>Set Value:</label>
          <input class="form-control" type="text" onChange={this.handleChange} />
          </div>
        <input type="button" class="btn btn-primary" type="submit" value="Submit" />
      </form>
    )
  }
}

export default Form;