import './App.css';
import Main from './Main';
import SetupWeb3 from './SetupWeb3';
import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [provider, setProvider] = useState(undefined);

  return (

    <div className="App">

      {accounts.length > 0?
        <Main accounts={accounts} provider={provider}></Main>:
        <SetupWeb3 accounts={accounts} setAccounts={setAccounts} setProvider={setProvider}></SetupWeb3>
      }
 
    </div>
  );
}

export default App;
