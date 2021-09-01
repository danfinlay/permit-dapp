import Grant from './Grant';
import Redeem from './Redeem';
import Revoke from './Revoke';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function Main (props) {
  const { accounts, provider } = props;
  return (
    <Router>

    <header className="App-header">
      <h1>Off-chain Allowance Sharer</h1>
      <p>Must have MetaMask installed and connected to mainnet.</p>

      <nav>
        <Link to="/grant">Grant</Link>
        <Link to="/redeem">Redeem</Link>
        <Link to="/revoke">Revoke</Link>
      </nav>

      {accounts.forEach(address => <p>address</p>)}

    </header>

    <div>
      <Switch>
        <Route path="/grant">
          <Grant provider={provider} accounts={accounts}/>
        </Route>
        <Route path="/redeem/:approval">
          <Redeem provider={provider}/>
        </Route>
        <Route path="/revoke">
          <Revoke provider={provider}/>
        </Route>
      </Switch>
    </div>
    </Router>
  )
}