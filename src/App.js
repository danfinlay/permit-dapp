import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Grant from './Grant';
import Redeem from './Redeem';
import Revoke from './Revoke';
import React, { useContext } from 'react'
import { Web3Context } from 'web3-hooks'

function App() {

  return (

    <div className="App">

      <Router>

        <header className="App-header">
          <h1>Off-chain Allowance Sharer</h1>
          <p>Must have MetaMask installed and connected to mainnet.</p>

          <Login></Login>

          <nav>
            <Link to="/grant">Grant</Link>
            <Link to="/redeem">Redeem</Link>
            <Link to="/revoke">Revoke</Link>
          </nav>

        </header>

        <div>
          <Switch>
            <Route path="/grant">
              <Grant/>
            </Route>
            <Route path="/redeem">
              <Redeem/>
            </Route>
            <Route path="/revoke">
              <Revoke/>
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

const Login = () => {
  const [web3State, login] = useContext(Web3Context)
  return (
    <>
      <p>Web3: {web3State.isWeb3 ? 'injected' : 'no-injected'}</p>
      <p>Network id: {web3State.chainId}</p>
      <p>Network name: {web3State.networkName}</p>
      <p>MetaMask installed: {web3State.isMetaMask ? 'yes' : 'no'}</p>
      <p>logged: {web3State.isLogged ? 'yes' : 'no'}</p>
      <p>account: {web3State.account}</p>
      <p>Balance: {web3State.balance}</p>
      {!web3State.isLogged && (
        <>
          <button onClick={login}>login</button>
        </>
      )}
    </>
  )
}

export default App;
