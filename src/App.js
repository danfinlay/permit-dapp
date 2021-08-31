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

function App() {
  return (

    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Off-chain Allowance Sharer</h1>
          <p>Must have MetaMask installed and connected to mainnet.</p>
          <nav>
              <Link to="/">Grant</Link>
              <Link to="/redeem">Redeem</Link>
              <Link to="/revoke">Revoke</Link>
          </nav>


        </header>

        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
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

export default App;
