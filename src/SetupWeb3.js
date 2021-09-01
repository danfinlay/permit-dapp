import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider';
import React, { useState } from 'react';

/**
 * States:
 * -0 No provider
 * -1 Being directed to get wallet
 * -2 Provider, no accounts
 * -3 Requesting accounts
 * -4 Accounts provided
 */

export default function SetupWeb3 (props) {
  const [currentState, setState] = useState(0);
  const { accounts, setAccounts, setProvider } = props;
  const [isConnecting, setConnecting] = useState(false);
  checkAccounts(accounts, setAccounts, setState);

  if (!window['ethereum']) {
    switch (currentState) {
      case 0: // No wallet
        return (<div>
          <p>To use this application or redeem an allowance link, you need to install MetaMask:</p>
          <button onClick={() => {
            const onboarding = new MetaMaskOnboarding();
            onboarding.startOnboarding(); 
            setState(1);
          }
          }>Install MetaMask to Get Started</button>
        </div>)

      case 1: // Redirected to get wallet
        return (<div>
          <p>Finish installing MetaMask and come back here to resume.</p>
        </div>)

    }
  }

  // We have a provider
  if (isConnecting) {
    return (<div><p>Requesting account connection.</p></div>)
  }

  return (<button onClick={async () => {
      const provider = await detectEthereumProvider();
      setConnecting(true);
      const accounts = await provider.request({ method: 'eth_requestAccounts' })
      setConnecting(false);
      setProvider(provider);
      setAccounts(accounts);
      setConnecting(false);
    }}>Connect MetaMask</button>
  );

}


async function checkAccounts (_oldAccounts, setAccounts, setState) {
  const provider = await detectEthereumProvider();
  const accounts = await provider.request({ method: 'eth_accounts' });
  console.dir(setState);
  setState(4);
  setAccounts(accounts);
}