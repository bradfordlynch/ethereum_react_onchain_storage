import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ERCToken from "./contracts/ERCToken.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import Form from './Form';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  runExample = async (value) => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.set(value, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ storageValue: response.toNumber() });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { accounts, contract } = this.state;
    return (
      <body>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="container">

          <div class="starter-template">
            <div class="col-6">
              <h1>Good to Go!</h1>
              <p></p>
              <h2>Super Small Storage!</h2>
              <p>This app is an example of on-chain storage. Try changing the value using the form below.</p>
              <div>
                <Form contract={contract} accounts={accounts} setter={this.runExample} />
              </div>
            </div>
          </div>

        </main>
        <script src="../../dist/js/bootstrap.min.js"></script>
      </body>
    );
  }
}

export default App;
