import './App.css';
import Main from './Main';
import SetupWeb3 from './SetupWeb3';
import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [provider, setProvider] = useState(undefined);
  checkAccounts(accounts, setAccounts);

  return (

    <div className="App">

      {accounts.length > 0?
        <Main accounts={accounts} provider={provider}></Main>:
        <SetupWeb3 accounts={accounts} setAccounts={setAccounts} setProvider={setProvider}></SetupWeb3>
      }
 
    </div>
  );
}

async function checkAccounts (_oldAccounts, setAccounts) {
  const provider = await detectEthereumProvider();
  const accounts = await provider.request({ method: 'eth_accounts' });
  setAccounts(accounts);
}

export default App;
